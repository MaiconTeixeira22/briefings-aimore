import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Link from 'next/link';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public/json/index.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const briefings = JSON.parse(fileContent);

  return {
    props: {
      briefings,
    },
  };
}

export default function Home({ briefings }: { briefings: { slug: string; title: string }[] }) {
  return (
    <>
      <Head>
        <title>AiMore Briefings Premium</title>
      </Head>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
        {/* Header */}
        <header className="border-b border-neutral-800 sticky top-0 bg-neutral-950 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🚀</span>
              <h1 className="text-xl sm:text-2xl font-extrabold">
                AiMore <span className="text-purple-400">Briefings Premium</span>
              </h1>
            </div>
            <Link
              href="https://drive.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-md text-sm font-medium hover:opacity-80"
            >
              Abrir Pasta no Drive
            </Link>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold mb-8">📂 Briefings Disponíveis</h2>

          {briefings.length === 0 ? (
            <p className="text-neutral-500">Nenhum briefing encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {briefings.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="group border border-neutral-800 rounded-xl p-6 hover:border-pink-500 hover:scale-[1.02] transition-all bg-neutral-900 hover:bg-neutral-800"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold group-hover:text-pink-500">{item.title}</h3>
                    <p className="text-xs text-neutral-500">{item.slug}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-neutral-800 py-6 text-center text-neutral-500 text-sm">
          Desenvolvido por AiMore 🚀 | Todos os direitos reservados
        </footer>
      </div>
    </>
  );
}