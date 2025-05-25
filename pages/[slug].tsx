import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Head from 'next/head';

interface Briefing {
  nome_projeto: string;
  cliente: string;
  slug: string;
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join(process.cwd(), 'public/json'));

  const briefings = files.map((filename) => {
    const fileContent = fs.readFileSync(
      path.join(process.cwd(), 'public/json', filename),
      'utf-8'
    );
    const data = JSON.parse(fileContent);

    return {
      nome_projeto: data.nome_projeto,
      cliente: data.cliente,
      slug: data.slug,
    };
  });

  return {
    props: { briefings },
  };
}

export default function Home({ briefings }: { briefings: Briefing[] }) {
  return (
    <>
      <Head>
        <title>Briefings AiMore</title>
      </Head>
      <main style={{
        backgroundColor: '#121212',
        color: '#FFFFFF',
        minHeight: '100vh',
        padding: '60px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: '#A36BF2',
          marginBottom: '20px'
        }}>
          Briefings AiMore
        </h1>
        <p style={{
          color: '#CCC',
          marginBottom: '40px',
          fontSize: '1.2rem'
        }}>
          Escolha um briefing abaixo para visualizar os detalhes completos.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {briefings.map((briefing) => (
            <Link key={briefing.slug} href={`/${briefing.slug}`} style={{
              backgroundColor: '#1E1E1E',
              padding: '20px',
              borderRadius: '10px',
              textDecoration: 'none',
              border: '1px solid #333'
            }}>
              <div>
                <h2 style={{
                  color: '#FFF',
                  fontSize: '1.5rem',
                  marginBottom: '10px'
                }}>
                  {briefing.nome_projeto}
                </h2>
                <p style={{
                  color: '#A36BF2',
                  fontSize: '1rem'
                }}>
                  Cliente: {briefing.cliente}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}