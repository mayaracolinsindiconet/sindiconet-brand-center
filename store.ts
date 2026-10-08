/**
 * Banco de dados do Hub: cada coleção é um arquivo JSON privado no Vercel Blob
 * (store "hub-marketing-dados", acesso privado). Escritas usam controle de
 * concorrência por ETag (ifMatch): se duas pessoas salvam ao mesmo tempo,
 * ninguém sobrescreve a alteração do outro; a segunda escrita é refeita.
 */
import { get, put, head, BlobPreconditionFailedError } from "@vercel/blob";

export type Doc = Record<string, unknown>;
export type Col = Record<string, Doc>;

/** Coleções permitidas por ferramenta. Qualquer outra é recusada. */
export const APPS: Record<string, { cols: string[]; max: Record<string, number> }> = {
  "banco-ideias-boletins": { cols: ["ideias", "historico", "config"], max: { ideias: 3000, historico: 600, config: 20 } },
};

/** Dados iniciais (migrados do Claude) usados só se a coleção ainda não existir. */
async function seedFor(app: string, col: string): Promise<Col | null> {
  if (app !== "banco-ideias-boletins") return null;
  try {
    const mod = await import("@/content/ferramentas/banco-ideias-boletins.seed.json");
    const all = (mod.default || mod) as Record<string, Col>;
    return all[col] || null;
  } catch {
    return null;
  }
}

const pathOf = (app: string, col: string) => `dados/${app}/${col}.json`;

/* A leitura pelo CDN devolve o ETag entre aspas ("abc"); a gravação condicional espera o ETag da API (abc). */
const limpaEtag = (e: string | null | undefined) => (e ? String(e).replace(/^W\//, "").replace(/^"|"$/g, "") : null);

async function readRaw(p: string): Promise<{ data: Col; etag: string | null }> {
  const r = await get(p, { access: "private", useCache: false });
  if (!r || r.statusCode !== 200) return { data: {}, etag: null };
  const txt = await new Response(r.stream).text();
  let data: Col = {};
  try { data = JSON.parse(txt) || {}; } catch { data = {}; }
  return { data, etag: limpaEtag(r.blob.etag) };
}

/** ETag atual segundo a API do Blob (o mesmo formato que a gravação condicional usa). */
async function etagApi(p: string): Promise<string | null> {
  try { return limpaEtag((await head(p)).etag); } catch { return null; }
}

export async function readCol(app: string, col: string): Promise<Col> {
  const p = pathOf(app, col);
  const { data, etag } = await readRaw(p);
  if (etag) return data;
  const seed = await seedFor(app, col);
  return seed || {};
}

export class ConflitoError extends Error { constructor() { super("conflito"); this.name = "ConflitoError"; } }

/**
 * Aplica uma alteração na coleção. Em caso de conflito (outra gravação no mesmo instante),
 * relê e refaz, com espera crescente, por até ~8 segundos. Se nada mudou, não grava.
 */
export async function mutate(app: string, col: string, fn: (c: Col) => void): Promise<Col> {
  const p = pathOf(app, col);
  for (let i = 0; i < 10; i++) {
    let { data, etag } = await readRaw(p);
    if (!etag) data = (await seedFor(app, col)) || {};
    else {
      /* confere se o conteúdo lido é a versão mais recente; se não for, lê de novo */
      const atual = await etagApi(p);
      if (atual && atual !== etag) {
        if (i < 3) { await new Promise((r) => setTimeout(r, 250 * (i + 1))); continue; }
        etag = atual;
      }
    }
    const antes = JSON.stringify(data);
    fn(data);
    trim(data, APPS[app]?.max[col] || 1000);
    if (etag && JSON.stringify(data) === antes) return data;
    try {
      await put(p, JSON.stringify(data), {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
        cacheControlMaxAge: 60,
        ...(etag ? { allowOverwrite: true, ifMatch: etag } : { allowOverwrite: false }),
      });
      return data;
    } catch (e) {
      const conflict = e instanceof BlobPreconditionFailedError || /already exists|precondition/i.test(String((e as Error)?.message));
      if (!conflict) throw e;
      await new Promise((r) => setTimeout(r, Math.min(1500, 120 * 2 ** i) + Math.random() * 250));
    }
  }
  throw new ConflitoError();
}

/** Limita o tamanho da coleção (histórico guarda só os mais recentes). */
function trim(c: Col, max: number) {
  const ks = Object.keys(c);
  if (ks.length <= max) return;
  ks.sort((a, b) => Number(c[a]?.em || c[a]?.atualizadoEm || 0) - Number(c[b]?.em || c[b]?.atualizadoEm || 0));
  for (const k of ks.slice(0, ks.length - max)) delete c[k];
}

/* ---------- documentos únicos (integrações, perfis) ---------- */
export async function readJson<T>(p: string): Promise<T | null> {
  const r = await get(p, { access: "private", useCache: false });
  if (!r || r.statusCode !== 200) return null;
  try { return JSON.parse(await new Response(r.stream).text()) as T; } catch { return null; }
}
export async function writeJson(p: string, v: unknown) {
  await put(p, JSON.stringify(v), { access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true, cacheControlMaxAge: 60 });
}
