// Perfis fotograficos do Banco de Imagens: "SíndicoNet" (padrao geral da marca)
// e "SíndicoNet PRO" (camada de tecnologia/IA, paleta roxa e mesh gradient).
// Fonte das regras PRO: skill identidade-fotografica-pro. Ao mudar a skill,
// atualizar PRO_PROMPT_ADDENDUM e as tags abaixo.

export type PhotoProfile = 'sindiconet' | 'pro'

export const DEFAULT_PROFILE: PhotoProfile = 'sindiconet'

export function normalizeProfile(value: unknown): PhotoProfile {
  return value === 'pro' ? 'pro' : 'sindiconet'
}

export const PROFILE_OPTIONS: { id: PhotoProfile; label: string; hint: string }[] = [
  { id: 'sindiconet', label: 'SíndicoNet', hint: 'Padrão geral da marca' },
  { id: 'pro', label: 'SíndicoNet PRO', hint: 'Tecnologia, IA e automação' },
]

export type Chip = { id: string; label: string }

// Tags em comum aos dois perfis (continuam existindo no banco ja aprovado).
const COMMON_STYLE_CHIPS: Chip[] = [
  { id: 'premium', label: 'Premium' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'humano', label: 'Humano' },
  { id: 'arquitetural', label: 'Arquitetura' },
  { id: 'corporativo', label: 'Corporativo' },
  { id: 'brasileiro', label: 'Contexto Brasileiro' },
  { id: 'obras', label: 'Obra' },
  { id: 'escritorio', label: 'Escritório' },
  { id: 'condominio', label: 'Condomínio' },
]

// So fazem sentido no padrao SíndicoNet (luz natural, paleta neutra).
const SINDICONET_ONLY_STYLE_CHIPS: Chip[] = [
  { id: 'luz-natural', label: 'Luz Natural' },
  { id: 'tons-neutros', label: 'Tons Neutros' },
]

// So fazem sentido no PRO (camada de tecnologia).
const PRO_ONLY_STYLE_CHIPS: Chip[] = [
  { id: 'pro-tecnologia-discreta', label: 'Tecnologia discreta' },
  { id: 'pro-interface-dados', label: 'Interface / Dados' },
  { id: 'pro-ia-abstrata', label: 'IA abstrata' },
  { id: 'pro-mesh-roxo', label: 'Mesh gradient roxo' },
  { id: 'pro-luz-roxa', label: 'Luz roxa / lilás' },
  { id: 'pro-3d-premium', label: '3D premium' },
]

export function getStyleChips(profile: PhotoProfile): Chip[] {
  return profile === 'pro'
    ? [...COMMON_STYLE_CHIPS, ...PRO_ONLY_STYLE_CHIPS]
    : [...COMMON_STYLE_CHIPS, ...SINDICONET_ONLY_STYLE_CHIPS]
}

// Tags de perfil guardadas em cada imagem do banco (campo styles). Imagens
// antigas sem nenhuma das duas contam como SíndicoNet.
export const TAG_SINDICONET = 'sindiconet'
export const TAG_PRO = 'sindiconet-pro'

export const PROFILE_TAGS: Chip[] = [
  { id: TAG_SINDICONET, label: 'SíndicoNet' },
  { id: TAG_PRO, label: 'SíndicoNet PRO' },
]

export function profileTag(profile: PhotoProfile): string {
  return profile === 'pro' ? TAG_PRO : TAG_SINDICONET
}

// Todas as tags editaveis de uma imagem ja no banco (perfil + temas + PRO).
export function getAllEntryTagChips(): Chip[] {
  const seen = new Set<string>()
  return [...PROFILE_TAGS, ...getStyleChips('sindiconet'), ...getStyleChips('pro')].filter((c) => {
    if (seen.has(c.id)) return false
    seen.add(c.id)
    return true
  })
}

// "Quem aparece" e igual nos dois perfis; no PRO a regra de nao citar cargo
// no prompt e aplicada pelo prompt de sistema (ver PRO_PROMPT_ADDENDUM).
export const SUBJECT_CHIPS: Chip[] = [
  { id: 'mulher', label: 'Mulher' },
  { id: 'homem', label: 'Homem' },
  { id: 'sindico', label: 'Sindico(a)' },
  { id: 'trabalhador', label: 'Trabalhador' },
  { id: 'empresario', label: 'Empresario(a)' },
  { id: 'idoso', label: 'Idoso(a)' },
  { id: 'crianca', label: 'Crianca' },
  { id: 'casal', label: 'Casal' },
  { id: 'familia', label: 'Familia' },
  { id: 'grupo', label: 'Grupo / Reuniao' },
  { id: 'seguranca', label: 'Seguranca' },
  { id: 'zelador', label: 'Zelador(a)' },
  { id: 'sem-pessoas', label: 'Sem pessoas' },
]

// Descricoes em ingles das tags novas, usadas nos prompts.
export const COMMON_STYLE_GUIDE: Record<string, string> = {
  escritorio: 'modern professional office environment, workstations, meeting room or reception of a property management / condominium administration company',
  condominio: 'Brazilian residential condominium context: common areas, lobby, courtyard, pool, garden or building entrance',
}

// Descricoes em ingles das tags exclusivas do PRO, usadas nos prompts.
export const PRO_STYLE_GUIDE: Record<string, string> = {
  'pro-tecnologia-discreta': 'technology level 1 (discreet): realistic photography with PRO purple lighting and only small, purposeful digital elements',
  'pro-interface-dados': 'technology level 2 (integrated): photography combined with functional interfaces, dashboards, charts and data that serve the narrative',
  'pro-ia-abstrata': 'abstract artificial intelligence expressed through data, networks, connection lines, nodes and analysis -- never a generic humanoid robot',
  'pro-mesh-roxo': 'signature deep purple mesh gradient (#2A0C49 to #BE9ED9) with depth and atmosphere, not a generic wallpaper, not cyberpunk, not gamer',
  'pro-luz-roxa': 'diffuse purple and lilac lighting integrated into the scene (cinematic, controlled glow, subtle rim light, deep shadow areas), never a purple filter over the whole image',
  'pro-3d-premium': 'premium 3D elements (metal, glass, acrylic, translucent surfaces, controlled reflections, cinematic lighting) -- not plastic, not toy-like, not CGI generic',
}

export const PRO_PILLAR_LABELS: Record<string, string> = {
  'premium-silencioso': 'PILAR 01 - Premium Silencioso (versao PRO)',
  'editorial-humano': 'PILAR 02 - Editorial Corporativo Humano (versao PRO)',
  'arquitetura-simbolo': 'PILAR 03 - Arquitetura como Simbolo (versao PRO)',
}

// Substitui a paleta/luz/restricoes do padrao SíndicoNet quando o perfil e PRO.
export const PRO_PROMPT_ADDENDUM = `PERFIL ATIVO: SINDICONET PRO (este perfil SUBSTITUI a paleta, a iluminacao e as restricoes visuais do padrao SindicoNet descritos acima sempre que houver conflito; o fotorrealismo continua obrigatorio quando a imagem for fotografica).

PRINCIPIO CENTRAL PRO: "tecnologia sofisticada, nao tecnologia que impressiona por si so". SindicoNet PRO = Premium Silencioso + Editorial Humano + Arquitetura como Simbolo + Tecnologia + Inteligencia. A estetica deve parecer avancada, mas nunca complicada; a tecnologia complementa a narrativa e nunca domina a imagem sem necessidade.

PALETA PRO (referencia principal): #030124 azul-marinho quase preto, #2A0C49 roxo profundo, #5D2E85 roxo intermediario, #9664C1 roxo luminoso, #BE9ED9 lilas claro. Gradiente principal #2A0C49 -> #BE9ED9. Priorizar fundos escuros, roxo profundo, transicoes suaves e pontos de luz lilas (aprox. 70% tons escuros, 20% intermediarios, 10% highlights). Nao usar cores vibrantes aleatorias.

MESH GRADIENT e assinatura visual do PRO: transmitir profundidade, sofisticacao e atmosfera; nunca wallpaper generico, cyberpunk, gamer, neon exagerado ou fundo de videogame.

ILUMINACAO PRO: luz roxa/lilas difusa integrada a cena, iluminacao cinematografica, glow discreto, bloom controlado, rim light sutil, reflexos suaves e areas profundas de sombra. O roxo nunca e um filtro aplicado sobre a imagem inteira. (Ignore "luz natural difusa", "tons frios e neutros" e "espaco negativo azul #101e37" do padrao SindicoNet quando conflitarem.)

LINGUAGEM TECNOLOGICA permitida (sempre com funcao narrativa): linhas de conexao, nos, redes, grids, graficos, dashboards, interfaces, fluxos, checklists, automacoes, particulas discretas, pontos luminosos. Escolha o MENOR nivel de tecnologia necessario: 1 discreta (foto + luz PRO + pequenos elementos digitais), 2 integrada (foto + interfaces/dados), 3 conceitual (IA, redes, dados), 4 hero tecnologico (so para capas/campanhas/lancamentos, nunca automatico).

IA: nao usar robos como representacao automatica de inteligencia artificial. Preferir IA abstrata, dados, redes, conexoes, analise, automacao, interfaces e interacao entre humano e tecnologia. Evitar robos humanoides genericos.

DIVERSIDADE HUMANA (obrigatoria): a protagonista individual deve ser majoritariamente MULHER (salvo se o usuario pedir explicitamente um protagonista homem), variando entre prompts raca, etnia, idade adulta e biotipo (incluindo corpos alem do padrao magro/branco/jovem da publicidade), sempre dentro do contexto brasileiro real, sem estereotipos e com o mesmo nivel de profissionalismo e dignidade. Homens aparecem em cenas com varias pessoas ou como coadjuvantes quando o contexto exigir.

CARGOS E MARCAS: o prompt de imagem NUNCA pode conter palavras de cargo/funcao (sindico, sindica, zelador, porteiro, administradora etc.) nem nomes de marca (como "SindicoNet PRO"). Descreva a pessoa de forma generica ("uma mulher brasileira, [raca], por volta de [idade] anos") e descreva apps/sistemas de forma generica ("um aplicativo de gestao", "uma interface de tela"). Se o usuario escolher uma tag de cargo (ex: Sindico(a), Zelador(a)), traduza-a para a aparencia/contexto visual, sem escrever o cargo.

EVITAR NO PRO: cyberpunk, gamer, videogame, metaverso, criptomoeda, ficcao cientifica exagerada, neon excessivo, hologramas, particulas ou circuitos em excesso, interfaces sem funcao, robos genericos, 3D plastico, CGI generico, excesso de glow, HDR exagerado, saturacao extrema, composicao poluida, estetica tecnologica generica de banco de imagens. MENOS ELEMENTOS + MELHOR COMPOSICAO; em caso de duvida, remover.

COMPOSICAO: um protagonista + uma narrativa visual clara; tres planos (primeiro: elemento principal, segundo: apoio, terceiro: ambiente/mesh/tecnologia); considerar espaco negativo para headline/CTA quando fizer sentido.`

export const REALISM_SUFFIX_PRO_EN = `Photorealistic editorial photography with cinematic purple and lilac lighting integrated into the scene (controlled glow, subtle rim light, deep shadows), shot on a professional full-frame camera with a prime lens, natural skin texture with visible pores and realistic imperfections, authentic materials, shallow depth of field, subtle film grain -- absolutely NOT cyberpunk, NOT gamer, NOT neon, NOT a generic AI look, NOT plastic CGI.`

export const REALISM_SUFFIX_PRO_PT = ` Fotografia editorial hiper-realista com iluminacao cinematografica roxa e lilas integrada a cena (glow controlado, rim light sutil, sombras profundas), textura de pele natural e materiais autenticos -- sem estetica cyberpunk, gamer, neon ou aparencia generica de IA.`
