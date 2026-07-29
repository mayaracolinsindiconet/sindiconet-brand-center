import { SectionHero } from '@/components/layout/SectionHero'
import { SectionWrapper } from '@/components/layout/SectionWrapper'

const alinhado = [
  { titulo: 'Movimentos suaves', desc: 'Easing do tipo ease-in-out / cubic-bezier suave, sem oscilação. Início e fim desacelerados, nunca abruptos. Transmite precisão e serenidade.' },
  { titulo: 'Formas retangulares', desc: 'Cards, blocos e molduras com cantos levemente arredondados (raio pequeno, nunca circular). Grid ortogonal, alinhamento reto.' },
  { titulo: 'Transição de cores', desc: 'Fade / cross-fade entre tons da paleta institucional (#3E77DB, #1F3C6E, #9FBBED, #CFDDF6). Sem saltos bruscos de matiz.' },
  { titulo: 'Entrada e saída direcional', desc: 'Slide/fade a partir da grade (esquerda→direita, baixo→cima), reforçando hierarquia editorial. Deslocamentos curtos.' },
  { titulo: 'Escala sutil', desc: 'Zoom leve (98–102%) para dar destaque, nunca exagerado ou elástico.' },
  { titulo: 'Ritmo pausado e elegante', desc: 'Timing entre 300–600ms para microinterações e 0,8–1,5s para transições de tela. Sem pressa, sem urgência artificial.' },
]

const naoAlinhado = [
  { titulo: 'Movimentos divertidos / bounce', desc: 'Easing elástico, overshoot, squash & stretch, física de cartoon. Contradiz o posicionamento consultivo e institucional da marca.' },
  { titulo: 'Formas redondas / orgânicas', desc: 'Círculos, blobs, formas fluidas como elemento estrutural. Foge da geometria retangular do Brand Center.' },
  { titulo: 'Cores fora da paleta', desc: 'Gradientes multicoloridos, neon, cores saturadas aleatórias. Gradiente é recurso exclusivo do produto PRO.' },
  { titulo: 'Excesso de efeitos', desc: 'Partículas, glitch, sombras pesadas, 3D, bisel. Não fazem parte do repertório visual da marca.' },
  { titulo: 'Ritmo acelerado / caótico', desc: 'Cortes rápidos demais, múltiplos elementos animando ao mesmo tempo sem hierarquia. Gera ruído visual.' },
]

const diretrizesTecnicas = [
  {
    titulo: 'Curvas de easing',
    itens: [
      'ease-in-out (padrão para a maioria das transições)',
      'cubic-bezier(0.4, 0.0, 0.2, 1) — suave e institucional',
      'Evitar: bounce, elastic, back (overshoot)',
    ],
  },
  {
    titulo: 'Timing',
    itens: [
      'Microinterações (hover, clique, ícone): 200–400ms',
      'Transições de card / bloco: 300–600ms',
      'Transições de tela / seção: 800ms–1,5s',
      'Nunca ultrapassar 2s para uma única transição',
    ],
  },
  {
    titulo: 'Shapes e cards em movimento',
    itens: [
      'Cantos levemente arredondados, nunca círculos ou formas orgânicas',
      'Preenchimento sólido (flat fill); gradiente é exclusivo da linha PRO',
      'Sem sombras pesadas, bisel ou efeito 3D',
    ],
  },
  {
    titulo: 'Transição de cor',
    itens: [
      'Cross-fade entre tons da paleta institucional',
      'Sombra (#1F3C6E) como ponto de maior contraste',
      'Luz (#9FBBED) como ponto intermediário',
    ],
  },
]

const paletaTransicao = [
  { cor: 'Principal', hex: '#3E77DB', uso: 'Cor de destaque em transições e estados ativos' },
  { cor: 'Sombra',    hex: '#1F3C6E', uso: 'Ponto de chegada de fades escuros, textos em movimento' },
  { cor: 'Luz',       hex: '#9FBBED', uso: 'Ponto intermediário de transição, hover suave' },
  { cor: 'Tint / fundo', hex: '#CFDDF6 / #F4F6F8', uso: 'Fundos de entrada/saída, camadas de profundidade' },
]

const aplicacoes = [
  { titulo: 'Ícones', desc: 'Streamline, set Regular: fade + leve escala, nunca rotação exagerada ou "pulo".' },
  { titulo: 'Logotipo', desc: 'Aparição por fade; nunca distorcer, girar ou aplicar squash & stretch.' },
  { titulo: 'Cards de conteúdo', desc: 'Entrada por slide curto + fade a partir da grade.' },
  { titulo: 'Textos/títulos', desc: 'Fade in com leve deslocamento vertical (8–16px), nunca com letras "pulando" ou girando.' },
  { titulo: 'Transições entre cenas de vídeo', desc: 'Cross-fade de cor ou corte seco no tempo da música/narração — sem wipes decorativos ou formas geométricas girando.' },
]

export default function MotionPage() {
  return (
    <main>
      <SectionHero
        title="Motion"
        description="O movimento é uma extensão da identidade visual, não um elemento à parte — deve reforçar a postura consultiva e confiável da marca."
        breadcrumb={[
          { label: 'Identidade', href: '/identidade/logo' },
          { label: 'Motion', href: '/identidade/motion' },
        ]}
      />

      <SectionWrapper
        id="principio"
        title="Princípio geral"
        description={
          'O movimento deve parecer que "pertence" ao mesmo sistema de cards retangulares, tipografia ' +
          'Stack Sans / Open Sans e paleta institucional já usados em peças estáticas — nunca introduzir ' +
          'uma linguagem visual nova.'
        }
        background="white"
      >
        <div />
      </SectionWrapper>

      <SectionWrapper
        id="alinhado"
        title="O que está alinhado"
        description="Direções de movimento que reforçam o posicionamento consultivo e institucional da marca."
        background="default"
      >
        <div className="rounded-2xl border border-black/8 overflow-hidden bg-white">
          <div className="px-5 py-3 bg-[#e5f2ec] border-b border-black/8">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#318367] font-body">✓ Alinhado à marca</p>
          </div>
          {alinhado.map((row, i) => (
            <div key={row.titulo} className={`px-5 py-4 border-b border-black/5 last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F4F6F8]/40'}`}>
              <p className="font-headline font-bold text-sm text-[#101e37] mb-1">{row.titulo}</p>
              <p className="font-body text-sm text-[#3D3D3D]/65 leading-relaxed">{row.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="nao-alinhado"
        title="O que não está alinhado"
        description="Direções de movimento a evitar por contradizerem o posicionamento da marca."
        background="white"
      >
        <div className="rounded-2xl border border-black/8 overflow-hidden bg-white">
          <div className="px-5 py-3 bg-[#fbe9e6] border-b border-black/8">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#D13D2A] font-body">✕ Não alinhado à marca</p>
          </div>
          {naoAlinhado.map((row, i) => (
            <div key={row.titulo} className={`px-5 py-4 border-b border-black/5 last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F4F6F8]/40'}`}>
              <p className="font-headline font-bold text-sm text-[#101e37] mb-1">{row.titulo}</p>
              <p className="font-body text-sm text-[#3D3D3D]/65 leading-relaxed">{row.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="diretrizes-tecnicas"
        title="Diretrizes técnicas de movimento"
        description="Curvas de easing, timing, shapes e transições de cor recomendados para qualquer peça animada."
        background="default"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {diretrizesTecnicas.map((d) => (
            <div key={d.titulo} className="rounded-2xl border border-black/8 bg-white p-6">
              <p className="font-headline font-bold text-base text-[#101e37] mb-3">{d.titulo}</p>
              <ul className="space-y-2">
                {d.itens.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-body text-[#3D3D3D]/65 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#3e77db] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="paleta-transicao"
        title="Paleta de referência para transições"
        description="Uso de cada tom institucional dentro de uma animação."
        background="white"
      >
        <div className="rounded-2xl border border-black/8 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F4F6F8] border-b border-black/8">
                {['Cor', 'Hex', 'Uso em movimento'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paletaTransicao.map((row, i) => (
                <tr key={row.cor} className={`border-b border-black/5 last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F4F6F8]/40'}`}>
                  <td className="px-5 py-4 text-sm font-body text-[#101e37] font-medium whitespace-nowrap">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: row.hex.split(' ')[0] }} />
                      {row.cor}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-[#3D3D3D]/60 whitespace-nowrap">{row.hex}</td>
                  <td className="px-5 py-4 text-xs font-body text-[#3D3D3D]/65">{row.uso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="aplicacoes"
        title="Aplicações típicas"
        description="Como o movimento deve se comportar em cada tipo de elemento da marca."
        background="default"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {aplicacoes.map((a) => (
            <div key={a.titulo} className="flex items-start gap-4 bg-white rounded-xl border border-black/8 px-5 py-4">
              <div>
                <p className="font-headline font-bold text-base text-[#101e37]">{a.titulo}</p>
                <p className="font-body text-xs text-[#3D3D3D]/55 mt-0.5 leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="resumo" title="Resumo rápido" background="white">
        <div className="rounded-2xl border border-black/8 bg-[#101e37] p-8">
          <p className="font-body text-white text-base leading-relaxed mb-2">
            <span className="text-[#6ee7b7] font-semibold">Alinhado:</span> suave, retangular, institucional, pausado.
          </p>
          <p className="font-body text-white/70 text-base leading-relaxed">
            <span className="text-[#f4a09a] font-semibold">Não alinhado:</span> divertido, redondo, colorido fora da paleta, acelerado.
          </p>
        </div>
      </SectionWrapper>
    </main>
  )
}
