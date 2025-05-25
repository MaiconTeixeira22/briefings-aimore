import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';

interface Briefing {
  nome_projeto: string;
  cliente: string;
  slug: string;
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
  roteiro?: { tempo: string; texto: string; visual: string }[];
  cta?: string;
  justificativa?: string;
  hashtags?: string[];
  direcao_arte_video?: {
    etapa: string;
    composicao: string;
    ponto_focal: string;
    tipografia: string;
    paleta: string[];
  }[];
  referencias_visuais?: {
    nome: string;
    descricao: string;
    url: string;
  }[];
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
  if (!params?.slug) {
    return { notFound: true };
  }
  const filePath = path.join(process.cwd(), 'public/json', `${params.slug}.json`);
  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContent);
  // Pass all fields (even undefined) as per Briefing interface
  const briefing: Briefing = {
    nome_projeto: data.nome_projeto,
    cliente: data.cliente,
    slug: data.slug,
    segmento: data.segmento,
    tipo_de_peca: data.tipo_de_peca,
    formato_da_peca: data.formato_da_peca,
    objetivo: data.objetivo,
    mensagem_principal: data.mensagem_principal,
    tom_de_voz: data.tom_de_voz,
    insight_publico: data.insight_publico,
    diferenciais: data.diferenciais,
    itens_a_evitar: data.itens_a_evitar,
    estilo_narrativo: data.estilo_narrativo,
    estrutura_recomendada: data.estrutura_recomendada,
    roteiro: data.roteiro,
    cta: data.cta,
    justificativa: data.justificativa,
    hashtags: data.hashtags,
    direcao_arte_video: data.direcao_arte_video,
    referencias_visuais: data.referencias_visuais,
  };
  return {
    props: { briefing },
  };
};

export default function SlugPage({ briefing }: SlugPageProps) {
  return (
    <>
      <Head>
        <title>{`${briefing.nome_projeto} | AiMore Briefing`}</title>
        <meta name="description" content={`Briefing completo do projeto ${briefing.nome_projeto} para ${briefing.cliente}`} />
      </Head>
      <main className="page-container">
        {/* Botão de download PDF */}
        <a
          href={`/pdfs/${briefing.slug}.pdf`}
          target="_blank"
          download
          className="download-btn"
        >⬇️ Baixar PDF</a>
        <h1 className="title">
          {briefing.nome_projeto}
        </h1>
        {/* Identificação: cliente, slug, segmento, tipo de peça, formato */}
        <div className="container">
          <div className="col">
            <h2>Cliente</h2>
            <p>{briefing.cliente}</p>
          </div>
          <div className="col">
            <h2>Slug</h2>
            <p>{briefing.slug}</p>
          </div>
          {briefing.segmento && (
            <div className="col">
              <h2>Segmento</h2>
              <p>{briefing.segmento}</p>
            </div>
          )}
          {briefing.tipo_de_peca && (
            <div className="col">
              <h2>Tipo de Peça</h2>
              <p>{briefing.tipo_de_peca}</p>
            </div>
          )}
          {briefing.formato_da_peca && (
            <div className="col">
              <h2>Formato da Peça</h2>
              <p>{briefing.formato_da_peca}</p>
            </div>
          )}
        </div>
        {/* Narrativa Estratégica */}
        <div className="block">
          {briefing.objetivo && (
            <div className="block">
              <h2>Objetivo</h2>
              <p>{briefing.objetivo}</p>
            </div>
          )}
          {briefing.mensagem_principal && (
            <div className="block">
              <h2>Mensagem Principal</h2>
              <p>{briefing.mensagem_principal}</p>
            </div>
          )}
          {briefing.tom_de_voz && (
            <div className="block">
              <h2>Tom de Voz</h2>
              <p>{briefing.tom_de_voz}</p>
            </div>
          )}
          {briefing.insight_publico && (
            <div className="block">
              <h2>Insight do Público</h2>
              <p>{briefing.insight_publico}</p>
            </div>
          )}
          {briefing.diferenciais && (
            <div className="block">
              <h2>Diferenciais</h2>
              <p>{briefing.diferenciais}</p>
            </div>
          )}
        </div>
        {/* Contexto e Direcionamento */}
        <div className="block">
          {briefing.itens_a_evitar && briefing.itens_a_evitar.length > 0 && (
            <div className="block">
              <h2>Itens a Evitar</h2>
              <ul>
                {briefing.itens_a_evitar.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {briefing.estilo_narrativo && (
            <div className="block">
              <h2>Estilo Narrativo</h2>
              <p>{briefing.estilo_narrativo}</p>
            </div>
          )}
          {briefing.estrutura_recomendada && (
            <div className="block">
              <h2>Estrutura Recomendada</h2>
              <ul>
                {briefing.estrutura_recomendada.hook && <li><b>Hook:</b> {briefing.estrutura_recomendada.hook}</li>}
                {briefing.estrutura_recomendada.contexto && <li><b>Contexto:</b> {briefing.estrutura_recomendada.contexto}</li>}
                {briefing.estrutura_recomendada.desenvolvimento && <li><b>Desenvolvimento:</b> {briefing.estrutura_recomendada.desenvolvimento}</li>}
                {briefing.estrutura_recomendada.quebra_de_expectativa && <li><b>Quebra de Expectativa:</b> {briefing.estrutura_recomendada.quebra_de_expectativa}</li>}
                {briefing.estrutura_recomendada.fechamento && <li><b>Fechamento:</b> {briefing.estrutura_recomendada.fechamento}</li>}
              </ul>
            </div>
          )}
        </div>
        {/* Roteiro */}
        {briefing.roteiro && briefing.roteiro.length > 0 && (
          <div className="block">
            <h2>Roteiro</h2>
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
                  {briefing.roteiro.map((r, idx) => (
                    <tr key={idx}>
                      <td>{r.tempo}</td>
                      <td>{r.texto}</td>
                      <td>{r.visual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Encerramento */}
        <div className="block">
          {briefing.cta && (
            <div className="block">
              <h2>Call to Action</h2>
              <p>{briefing.cta}</p>
            </div>
          )}
          {briefing.justificativa && (
            <div className="block">
              <h2>Justificativa</h2>
              <p>{briefing.justificativa}</p>
            </div>
          )}
          {briefing.hashtags && briefing.hashtags.length > 0 && (
            <div className="block">
              <h2>Hashtags</h2>
              <div>
                {briefing.hashtags.map((h, idx) => (
                  <span key={idx} className="tag">
                    #{h}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Direção de Arte para Vídeo */}
        {briefing.direcao_arte_video && briefing.direcao_arte_video.length > 0 && (
          <div className="col video-art">
            <h2>Direção de Arte para Vídeo</h2>
            <div className="container">
              {briefing.direcao_arte_video.map((d, idx) => (
                <div key={idx} className="col video-art-box">
                  <p className="video-art-etapa">{d.etapa}</p>
                  <div>
                    <b>Composição:</b> {d.composicao}<br />
                    <b>Ponto Focal:</b> {d.ponto_focal}<br />
                    <b>Tipografia:</b> {d.tipografia}<br />
                    <b>Paleta:</b> {d.paleta && d.paleta.map((cor, i) => (
                      <span key={i} className="palette" style={{ background: cor }} title={cor}></span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Referências Visuais */}
        {briefing.referencias_visuais && briefing.referencias_visuais.length > 0 && (
          <div className="col visual-ref">
            <h2>Referências Visuais</h2>
            <div className="container">
              {briefing.referencias_visuais.map((ref, idx) => (
                <div key={idx} className="col visual-ref-box">
                  <p className="visual-ref-nome">{ref.nome}</p>
                  <div className="visual-ref-desc">{ref.descricao}</div>
                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className="visual-ref-link">{ref.url}</a>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}