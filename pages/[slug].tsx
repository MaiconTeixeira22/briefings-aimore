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
      <main style={{ padding: '40px' }}>
        <h1>{data.nome_projeto}</h1>
        <h2>{data.cliente}</h2>
        <p><strong>Mensagem Principal:</strong> {data.mensagem_principal}</p>
        <p><strong>Objetivo:</strong> {data.objetivo}</p>
        <p><strong>CTA:</strong> {data.cta}</p>

        {data.webContentLink && (
          <a 
            href={data.webContentLink} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-block', 
              marginTop: '20px', 
              padding: '10px 20px', 
              backgroundColor: '#000', 
              color: '#fff', 
              textDecoration: 'none',
              borderRadius: '5px'
            }}
          >
            Download PDF
          </a>
        )}
      </main>
    </>
  );
}