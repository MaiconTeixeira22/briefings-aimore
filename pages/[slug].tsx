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

      <header className="page-header">
        <h1 className="title">{briefing.nome_projeto}</h1>
        {briefing.link_pdf && (
          <a
            href={briefing.link_pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn sticky-download"
            aria-label="Baixar PDF do briefing"
          >
            ⬇️ Baixar PDF
          </a>
        )}
      </header>

      <main className="page-container">
        <div className="container">

          {/* Identificação */}
          <section className="section">
            <h2 className="subtitle">Identificação</h2>
            <div className="grid">
              <div className="block">
                <h3>Cliente</h3>
                <p>{briefing.cliente}</p>
              </div>
              {briefing.segmento && (
                <div className="block">
                  <h3>Segmento</h3>
                  <p>{briefing.segmento}</p>
                </div>
              )}
              {briefing.tipo_de_peca && (
                <div className="block">
                  <h3>Tipo de Peça</h3>
                  <p>{briefing.tipo_de_peca}</p>
                </div>
              )}
              {briefing.formato_da_peca && (
                <div className="block">
                  <h3>Formato</h3>
                  <p>{briefing.formato_da_peca}</p>
                </div>
              )}
            </div>
          </section>

          {/* Narrativa */}
          <section className="section">
            <h2 className="subtitle">Narrativa e Direcionamento</h2>
            <div className="grid">
              {briefing.objetivo && (
                <div className="block">
                  <h3>Objetivo</h3>
                  <p>{briefing.objetivo}</p>
                </div>
              )}
              {briefing.mensagem_principal && (
                <div className="block">
                  <h3>Mensagem Principal</h3>
                  <p>{briefing.mensagem_principal}</p>
                </div>
              )}
              {briefing.tom_de_voz && (
                <div className="block">
                  <h3>Tom de Voz</h3>
                  <p>{briefing.tom_de_voz}</p>
                </div>
              )}
              {briefing.insight_publico && (
                <div className="block">
                  <h3>Insight do Público</h3>
                  <p>{briefing.insight_publico}</p>
                </div>
              )}
              {briefing.diferenciais && (
                <div className="block">
                  <h3>Diferenciais</h3>
                  <p>{briefing.diferenciais}</p>
                </div>
              )}
              {Array.isArray(briefing.itens_a_evitar) && briefing.itens_a_evitar.length > 0 && (
                <div className="block">
                  <h3>Itens a Evitar</h3>
                  <ul>
                    {briefing.itens_a_evitar.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {briefing.estilo_narrativo && (
                <div className="block">
                  <h3>Estilo Narrativo</h3>
                  <p>{briefing.estilo_narrativo}</p>
                </div>
              )}
              {briefing.estrutura_recomendada && (
                <div className="block">
                  <h3>Estrutura Recomendada</h3>
                  <ul>
                    {briefing.estrutura_recomendada.hook && (
                      <li><b>Hook:</b> {briefing.estrutura_recomendada.hook}</li>
                    )}
                    {briefing.estrutura_recomendada.contexto && (
                      <li><b>Contexto:</b> {briefing.estrutura_recomendada.contexto}</li>
                    )}
                    {briefing.estrutura_recomendada.desenvolvimento && (
                      <li><b>Desenvolvimento:</b> {briefing.estrutura_recomendada.desenvolvimento}</li>
                    )}
                    {briefing.estrutura_recomendada.quebra_de_expectativa && (
                      <li><b>Quebra de Expectativa:</b> {briefing.estrutura_recomendada.quebra_de_expectativa}</li>
                    )}
                    {briefing.estrutura_recomendada.fechamento && (
                      <li><b>Fechamento:</b> {briefing.estrutura_recomendada.fechamento}</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Roteiro */}
          {Array.isArray(briefing.roteiro) && briefing.roteiro.length > 0 && (
            <section className="section">
              <h2 className="subtitle">Roteiro</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Tempo</th>
                      <th>Texto</th>
                      <th>Visual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {briefing.roteiro.map((r: RoteiroItem, idx: number) => (
                      <tr key={idx}>
                        <td>{r.tempo}</td>
                        <td>{r.texto}</td>
                        <td>{r.visual}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* CTA e Distribuição */}
          {(briefing.cta || briefing.justificativa || (Array.isArray(briefing.hashtags) && briefing.hashtags.length > 0)) && (
            <section className="section">
              <h2 className="subtitle">CTA e Distribuição</h2>
              <div className="grid">
                {briefing.cta && (
                  <div className="block">
                    <h3>Call to Action</h3>
                    <p>{briefing.cta}</p>
                  </div>
                )}
                {briefing.justificativa && (
                  <div className="block">
                    <h3>Justificativa</h3>
                    <p>{briefing.justificativa}</p>
                  </div>
                )}
                {Array.isArray(briefing.hashtags) && briefing.hashtags.length > 0 && (
                  <div className="block">
                    <h3>Hashtags</h3>
                    {briefing.hashtags.map((h: string, idx: number) => (
                      <span key={idx} className="tag">#{h}</span>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Direção de Arte */}
          {Array.isArray(briefing.direcao_arte_video) && briefing.direcao_arte_video.length > 0 && (
            <section className="section">
              <h2 className="subtitle">Direção de Arte para Vídeo</h2>
              <div className="grid">
                {briefing.direcao_arte_video.map((d: DirecaoArteItem, idx: number) => (
                  <div key={idx} className="block">
                    <p><b>Etapa:</b> {d.etapa}</p>
                    <p><b>Composição:</b> {d.composicao}</p>
                    <p><b>Ponto Focal:</b> {d.ponto_focal}</p>
                    <p><b>Tipografia:</b> {d.tipografia}</p>
                    <div>
                      <b>Paleta:</b>{" "}
                      {d.paleta.map((cor: string, i: number) => (
                        <span
                          key={i}
                          className="palette"
                          style={{ background: cor }}
                          title={cor}
                        ></span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Referências Visuais */}
          {Array.isArray(briefing.referencias_visuais) && briefing.referencias_visuais.length > 0 && (
            <section className="section">
              <h2 className="subtitle">Referências Visuais</h2>
              <div className="grid">
                {briefing.referencias_visuais.map((ref: ReferenciaVisual, idx: number) => (
                  <a
                    key={idx}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <p className="visual-ref-nome">{ref.nome}</p>
                    <p className="visual-ref-desc">{ref.descricao}</p>
                    <span className="visual-ref-link">{ref.url}</span>
                  </a>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </>
  );
}