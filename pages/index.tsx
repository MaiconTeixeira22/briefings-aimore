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
  const dirPath = path.join(process.cwd(), 'public/json');
  const briefings: Briefing[] = [];

  try {
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.json'));

    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      if (content) {
        try {
          const data = JSON.parse(content);

          if (data.nome_projeto && data.cliente && data.slug) {
            briefings.push({
              nome_projeto: data.nome_projeto,
              cliente: data.cliente,
              slug: data.slug,
            });
          } else {
            console.warn(`⚠️ Dados incompletos no arquivo ${file}`);
          }
        } catch (error) {
          console.error(`❌ Erro ao ler o JSON ${file}:`, error);
        }
      } else {
        console.warn(`⚠️ Arquivo vazio: ${file}`);
      }
    });
  } catch (error) {
    console.error('❌ Erro ao acessar a pasta public/json:', error);
  }

  return {
    props: { briefings },
  };
}

export default function Home({ briefings }: { briefings: Briefing[] }) {
  return (
    <>
      <Head>
        <title>{`Briefings - AiMore`}</title>
        <meta name="description" content="Acompanhe e visualize todos os briefings gerados na plataforma AiMore." />
      </Head>
      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center' }}>📑 Briefings Gerados</h1>

        {briefings.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Nenhum briefing encontrado.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginTop: '40px'
          }}>
            {briefings.map((brief) => (
              <div key={brief.slug} style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h2>{brief.nome_projeto}</h2>
                  <p><strong>Cliente:</strong> {brief.cliente}</p>
                </div>
                <Link href={`/${brief.slug}`} aria-label={`Ver briefing ${brief.nome_projeto}`} style={{
                  marginTop: '16px',
                  backgroundColor: '#111',
                  color: '#fff',
                  padding: '10px 16px',
                  borderRadius: '5px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'block'
                }}>
                  Ver Briefing →
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}