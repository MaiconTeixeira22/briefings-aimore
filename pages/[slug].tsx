import fs from 'fs';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

interface BriefingData {
  nome_projeto: string;
  cliente: string;
  mensagem_principal: string;
  objetivo: string;
  slug: string;
  cta: string;
  webContentLink?: string;
  estrutura_recomendada?: any;
  roteiro?: any[];
  hashtags?: string[];
  copy_kv?: string;
  copy_carrossel?: string[];
  diferenciales?: string;
  direcao_arte_video?: any[];
  referencias_visuais?: any[];
  justificativa_visual?: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'public/json'));

  const paths = files.map((file) => ({
    params: { slug: file.replace('.json', '') },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(process.cwd(), 'public/json', `${slug}.json`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data: BriefingData = JSON.parse(fileContent);

  return {
    props: { data },
  };
};

export default function BriefingPage({ data }: { data: BriefingData }) {
  return (
    <>
      <Head>
        <title>{data.nome_projeto} - {data.cliente}</title>
      </Head>
      <main style={{ backgroundColor: '#121212', color: '#fff', padding: '60px', minHeight: '100vh' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{data.nome_projeto}</h1>
        <h2 style={{ fontSize: '1.8rem', color: '#ccc', marginBottom: '40px' }}>{data.cliente}</h2>

        <section style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#A36BF2' }}>Mensagem Principal</h3>
          <p>{data.mensagem_principal}</p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#A36BF2' }}>Objetivo</h3>
          <p>{data.objetivo}</p>
        </section>

        {data.estrutura_recomendada && (
          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#A36BF2' }}>Estrutura Recomendada</h3>
            <pre>{JSON.stringify(data.estrutura_recomendada, null, 2)}</pre>
          </section>
        )}

        {data.roteiro && (
          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#A36BF2' }}>Roteiro</h3>
            <ul>
              {data.roteiro.map((item, index) => (
                <li key={index}>{item.tempo} - {item.visual} - {item.texto}</li>
              ))}
            </ul>
          </section>
        )}

        <section style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#A36BF2' }}>CTA</h3>
          <p>{data.cta}</p>
        </section>

        {data.hashtags && (
          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#A36BF2' }}>Hashtags</h3>
            <p>{data.hashtags.join(' ')}</p>
          </section>
        )}

        {data.direcao_arte_video && (
          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#A36BF2' }}>Direção de Arte (Vídeo)</h3>
            <pre>{JSON.stringify(data.direcao_arte_video, null, 2)}</pre>
          </section>
        )}

        {data.referencias_visuais && (
          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#A36BF2' }}>Referências Visuais</h3>
            <ul>
              {data.referencias_visuais.map((ref, index) => (
                <li key={index}>
                  <a href={ref.url} target="_blank" style={{ color: '#A36BF2' }}>{ref.nome}</a> - {ref.descricao}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h3 style={{ color: '#A36BF2' }}>Justificativa Visual</h3>
          <p>{data.justificativa_visual}</p>
        </section>

      </main>
    </>
  );
}