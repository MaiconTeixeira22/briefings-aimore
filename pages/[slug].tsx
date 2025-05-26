import * as fs from 'fs';
import * as path from 'path';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';

type RoteiroItem = { tempo: string; texto: string; visual: string };
type DirecaoArteItem = { etapa: string; composicao: string; ponto_focal: string; tipografia: string; paleta: string[] };
type ReferenciaVisual = { nome: string; descricao: string; url: string };

interface Briefing {
  nome_projeto: string;
  cliente: string;
  segmento?: string;
  tipo_de_peca?: string;
  formato_da_peca?: string;
  objetivo?: string;
  mensagem_principal?: string;
  tom_de_voz?: string;
  insight_publico?: string;
  diferenciais?: string;
  itens_a_evitar?: string[];
  estilo_narrativo?: string;
  estrutura_recomendada?: {
    hook?: string;
    contexto?: string;
    desenvolvimento?: string;
    quebra_de_expectativa?: string;
    fechamento?: string;
  };
  roteiro?: RoteiroItem[];
  cta?: string;
  justificativa?: string;
  hashtags?: string[];
  direcao_arte_video?: DirecaoArteItem[];
  referencias_visuais?: ReferenciaVisual[];
  link_pdf?: string;
}

interface SlugPageProps {
  briefing: Briefing;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'public/json'));

  const paths = files
    .filter((file) => file.endsWith('.json'))
    .map((file) => {
      const slug = file.replace('.json', '');
      return { params: { slug } };
    });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) return { notFound: true };

  const filePath = path.join(process.cwd(), 'public/json', `${params.slug}.json`);
  if (!fs.existsSync(filePath)) return { notFound: true };

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const briefing = JSON.parse(fileContent);

  return {
    props: { briefing },
  };
};

export default function SlugPage({ briefing }: SlugPageProps) {
  return (
    <>
      <Head>
        <title>{`${briefing.nome_projeto} | AiMore Briefing`}</title>
        <meta
          name="description"
          content={`Briefing do projeto ${briefing.nome_projeto} para ${briefing.cliente}`}
        />
      </Head>

      {/* Header fixo */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-extrabold text-indigo-600 select-none">AiMore</div>
          <h1 className="text-xl font-semibold text-gray-900 truncate max-w-xs">{briefing.nome_projeto}</h1>
        </div>
        {briefing.link_pdf && (
          <a
            href={briefing.link_pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition-colors text-sm font-medium"
            aria-label="Abrir no Drive"
          >
            Abrir no Drive
          </a>
        )}
      </header>

      {/* Container centralizado */}
      <main className="pt-20 max-w-5xl mx-auto px-6 pb-16">
        {/* Identificação */}
        <section className="mb-12 border-b border-gray-300 pb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Identificação</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Cliente</h3>
              <p className="text-gray-800">{briefing.cliente}</p>
            </div>
            {briefing.segmento && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Segmento</h3>
                <p className="text-gray-800">{briefing.segmento}</p>
              </div>
            )}
            {briefing.tipo_de_peca && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Tipo de Peça</h3>
                <p className="text-gray-800">{briefing.tipo_de_peca}</p>
              </div>
            )}
            {briefing.formato_da_peca && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Formato</h3>
                <p className="text-gray-800">{briefing.formato_da_peca}</p>
              </div>
            )}
          </div>
        </section>

        {/* Narrativa e Direcionamento */}
        <section className="mb-12 border-b border-gray-300 pb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Narrativa e Direcionamento</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {briefing.objetivo && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Objetivo</h3>
                <p className="text-gray-800">{briefing.objetivo}</p>
              </div>
            )}
            {briefing.mensagem_principal && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Mensagem Principal</h3>
                <p className="text-gray-800">{briefing.mensagem_principal}</p>
              </div>
            )}
            {briefing.tom_de_voz && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Tom de Voz</h3>
                <p className="text-gray-800">{briefing.tom_de_voz}</p>
              </div>
            )}
            {briefing.insight_publico && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Insight do Público</h3>
                <p className="text-gray-800">{briefing.insight_publico}</p>
              </div>
            )}
            {briefing.diferenciais && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Diferenciais</h3>
                <p className="text-gray-800">{briefing.diferenciais}</p>
              </div>
            )}
            {Array.isArray(briefing.itens_a_evitar) && briefing.itens_a_evitar.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Itens a Evitar</h3>
                <ul className="list-disc list-inside space-y-1 max-h-40 overflow-auto border border-gray-200 rounded-md p-3 bg-gray-50">
                  {briefing.itens_a_evitar.map((item: string, i: number) => (
                    <li key={i} className="text-gray-800">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {briefing.estilo_narrativo && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Estilo Narrativo</h3>
                <p className="text-gray-800">{briefing.estilo_narrativo}</p>
              </div>
            )}
            {briefing.estrutura_recomendada && (
              <div className="md:col-span-3">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Estrutura Recomendada</h3>
                <ul className="space-y-2 text-gray-800 bg-gray-50 border border-gray-200 rounded-md p-4 max-w-xl">
                  {briefing.estrutura_recomendada.hook && (
                    <li><span className="font-semibold">Hook:</span> {briefing.estrutura_recomendada.hook}</li>
                  )}
                  {briefing.estrutura_recomendada.contexto && (
                    <li><span className="font-semibold">Contexto:</span> {briefing.estrutura_recomendada.contexto}</li>
                  )}
                  {briefing.estrutura_recomendada.desenvolvimento && (
                    <li><span className="font-semibold">Desenvolvimento:</span> {briefing.estrutura_recomendada.desenvolvimento}</li>
                  )}
                  {briefing.estrutura_recomendada.quebra_de_expectativa && (
                    <li><span className="font-semibold">Quebra de Expectativa:</span> {briefing.estrutura_recomendada.quebra_de_expectativa}</li>
                  )}
                  {briefing.estrutura_recomendada.fechamento && (
                    <li><span className="font-semibold">Fechamento:</span> {briefing.estrutura_recomendada.fechamento}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Roteiro */}
        {Array.isArray(briefing.roteiro) && briefing.roteiro.length > 0 && (
          <section className="mb-12 border-b border-gray-300 pb-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Roteiro</h2>
            <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-indigo-600">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
                    >
                      Tempo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
                    >
                      Texto
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
                    >
                      Visual
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {briefing.roteiro.map((r: RoteiroItem, idx: number) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white hover:bg-indigo-50 transition-colors'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">{r.tempo}</td>
                      <td className="px-6 py-4 whitespace-normal text-gray-800 text-sm">{r.texto}</td>
                      <td className="px-6 py-4 whitespace-normal text-gray-800 text-sm">{r.visual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* CTA e Distribuição */}
        {(briefing.cta || briefing.justificativa || (Array.isArray(briefing.hashtags) && briefing.hashtags.length > 0)) && (
          <section className="mb-12 border-b border-gray-300 pb-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">CTA e Distribuição</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {briefing.cta && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Call to Action</h3>
                  <p className="text-gray-800">{briefing.cta}</p>
                </div>
              )}
              {briefing.justificativa && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Justificativa</h3>
                  <p className="text-gray-800">{briefing.justificativa}</p>
                </div>
              )}
              {Array.isArray(briefing.hashtags) && briefing.hashtags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Hashtags</h3>
                  <div className="flex flex-wrap gap-2">
                    {briefing.hashtags.map((h: string, idx: number) => (
                      <span
                        key={idx}
                        className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full px-3 py-1 select-none"
                      >
                        #{h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Direção de Arte */}
        {Array.isArray(briefing.direcao_arte_video) && briefing.direcao_arte_video.length > 0 && (
          <section className="mb-12 border-b border-gray-300 pb-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Direção de Arte para Vídeo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {briefing.direcao_arte_video.map((d: DirecaoArteItem, idx: number) => (
                <div
                  key={idx}
                  className="p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
                >
                  <p className="mb-2"><span className="font-semibold text-gray-700">Etapa:</span> <span className="text-gray-800">{d.etapa}</span></p>
                  <p className="mb-2"><span className="font-semibold text-gray-700">Composição:</span> <span className="text-gray-800">{d.composicao}</span></p>
                  <p className="mb-2"><span className="font-semibold text-gray-700">Ponto Focal:</span> <span className="text-gray-800">{d.ponto_focal}</span></p>
                  <p className="mb-4"><span className="font-semibold text-gray-700">Tipografia:</span> <span className="text-gray-800">{d.tipografia}</span></p>
                  <div>
                    <span className="font-semibold text-gray-700">Paleta:</span>{" "}
                    <div className="inline-flex space-x-2 mt-1">
                      {d.paleta.map((cor: string, i: number) => (
                        <span
                          key={i}
                          className="w-7 h-7 rounded-md border border-gray-300 shadow-sm"
                          style={{ backgroundColor: cor }}
                          title={cor}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Referências Visuais */}
        {Array.isArray(briefing.referencias_visuais) && briefing.referencias_visuais.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Referências Visuais</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {briefing.referencias_visuais.map((ref: ReferenciaVisual, idx: number) => (
                <a
                  key={idx}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <p className="text-lg font-semibold text-indigo-700 truncate">{ref.nome}</p>
                  <p className="mt-1 text-gray-700 text-sm line-clamp-3">{ref.descricao}</p>
                  <span className="mt-3 inline-block text-indigo-600 text-sm underline truncate">{ref.url}</span>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}