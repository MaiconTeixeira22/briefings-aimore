import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';

interface Briefing {
  nome_projeto: string;
  cliente: string;
  slug: string;
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

  const briefing: Briefing = {
    nome_projeto: data.nome_projeto,
    cliente: data.cliente,
    slug: data.slug,
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
      <main style={{
        backgroundColor: '#121212',
        color: '#F2F2F2',
        minHeight: '100vh',
        padding: '80px 60px',
        fontFamily: 'Poppins, sans-serif'
      }}>
        <h1 style={{
          fontSize: '4rem',
          background: 'linear-gradient(90deg, #A36BF2, #FF5B9F)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '20px'
        }}>
          {briefing.nome_projeto}
        </h1>
        <div style={{
          backgroundColor: '#1E1E1E',
          padding: '20px 30px',
          borderRadius: '12px',
          boxShadow: '0 0 12px rgba(163,107,242,0.3)',
          marginBottom: '20px',
          transition: 'all 0.3s ease'
        }}>
          <h2 style={{ margin: 0, color: '#F4F4F5', fontSize: '1.8rem' }}>Cliente</h2>
          <p style={{ margin: '8px 0 0', color: '#CCC' }}>{briefing.cliente}</p>
        </div>
        <div style={{
          backgroundColor: '#1E1E1E',
          padding: '20px 30px',
          borderRadius: '12px',
          boxShadow: '0 0 12px rgba(163,107,242,0.3)',
          transition: 'all 0.3s ease'
        }}>
          <h2 style={{ margin: 0, color: '#F4F4F5', fontSize: '1.8rem' }}>Slug</h2>
          <p style={{ margin: '8px 0 0', color: '#999' }}>{briefing.slug}</p>
        </div>
      </main>
    </>
  );
}