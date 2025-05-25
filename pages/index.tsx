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
        <title>AiMore Briefings - Plataforma Premium</title>
        <meta name="description" content="Visualize todos os briefings gerados na plataforma AiMore." />
      </Head>
      <main className="bg-black min-h-screen py-20 px-8">
        <h1 className="text-center text-7xl font-extrabold bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent mb-20 tracking-tight">
          🚀 AiMore Briefings Premium
        </h1>

        {briefings.length === 0 ? (
          <p className="text-center text-neutral-400 text-xl">Nenhum briefing encontrado. 🚧</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {briefings.map((brief) => (
              <div
                key={brief.slug}
                className="bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl p-8 hover:scale-[1.03] hover:border-pink-500 hover:shadow-pink-500/20 transition-all duration-300"
              >
                <div>
                  <h2 className="text-xl font-bold mb-2 text-white">
                    {brief.nome_projeto}
                  </h2>
                  <p className="text-neutral-600">
                    <span className="font-semibold">Cliente:</span> {brief.cliente}
                  </p>
                </div>
                <Link
                  href={`/${brief.slug}`}
                  className="mt-6 block bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white py-3 px-6 rounded-xl text-center hover:opacity-90 shadow-lg"
                >
                  Ver Briefing →
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background-color: #000;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </>
  );
}