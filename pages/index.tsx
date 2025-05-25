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
    const filePath = path.join(process.cwd(), 'public/json', filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    return {
      nome_projeto: data.nome_projeto,
      cliente: data.cliente,
      slug: filename.replace('.json', ''),
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
      <main style={{ padding: '40px' }}>
        <h1>📑 Briefings Gerados</h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '40px'
        }}>
          {briefings.map((brief) => (
            <div key={brief.slug} style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              backgroundColor: '#fff'
            }}>
              <h2>{brief.nome_projeto}</h2>
              <p><strong>Cliente:</strong> {brief.cliente}</p>
              <Link href={`/${brief.slug}`} style={{
                marginTop: '10px',
                display: 'inline-block',
                backgroundColor: '#000',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '5px',
                textDecoration: 'none'
              }}>
                Ver Briefing →
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}