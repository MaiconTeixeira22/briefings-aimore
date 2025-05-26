import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Link from 'next/link';

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'public/json/index.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const briefings = JSON.parse(fileContent);

  const paths = briefings.map((item: { slug: string }) => ({
    params: { slug: item.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), `public/json/${params.slug}.json`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const briefing = JSON.parse(fileContent);

  return {
    props: {
      briefing,
    },
  };
}

export default function BriefingPage({ briefing }: { briefing: any }) {
  return (
    <>
      <Head>
        <title>{briefing.titulo || 'Briefing'} | AiMore Briefings</title>
      </Head>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
        {/* Header */}
        <header className="border-b border-neutral-800 sticky top-0 bg-neutral-950 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚀</span>
              <h1 className="text-xl sm:text-2xl font-extrabold">{briefing.titulo}</h1>
            </div>
            {briefing.link_pdf && (
              <Link
                href={briefing.link_pdf}
                target="_blank"
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-md text-sm font-medium hover:opacity-80"
                rel="noopener noreferrer"
              >
                Abrir no Drive
              </Link>
            )}
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 max-w-7xl mx-auto px-6 py-12">
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">📑 Identificação</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border border-neutral-800 rounded-xl p-4 bg-neutral-900">
                <p className="text-sm text-neutral-400">Cliente</p>
                <p className="font-bold">{briefing.cliente}</p>
              </div>
              <div className="border border-neutral-800 rounded-xl p-4 bg-neutral-900">
                <p className="text-sm text-neutral-400">Segmento</p>
                <p className="font-bold">{briefing.segmento}</p>
              </div>
              <div className="border border-neutral-800 rounded-xl p-4 bg-neutral-900">
                <p className="text-sm text-neutral-400">Tipo de Peça</p>
                <p className="font-bold">{briefing.tipo_peca}</p>
              </div>
              <div className="border border-neutral-800 rounded-xl p-4 bg-neutral-900">
                <p className="text-sm text-neutral-400">Formato</p>
                <p className="font-bold">{briefing.formato}</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">📝 Narrativa &amp; Direcionamento</h2>
            <div className="space-y-4">
              <p><span className="text-neutral-400">Tema:</span> {briefing.tema_ou_assunto}</p>
              <p><span className="text-neutral-400">Objetivo:</span> {briefing.objetivo_conteudo}</p>
              <p><span className="text-neutral-400">Mensagem Principal:</span> {briefing.mensagem_principal}</p>
              <p><span className="text-neutral-400">Insight Público:</span> {briefing.insight_publico}</p>
              <p><span className="text-neutral-400">Tom de Voz:</span> {briefing.tom}</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">🎬 Roteiro Visual</h2>
            {briefing.roteiro ? (
              <div className="space-y-4">
                {briefing.roteiro.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="border border-neutral-800 rounded-xl p-4 bg-neutral-900"
                  >
                    <p><span className="text-neutral-400">Tempo:</span> {item.tempo}</p>
                    <p><span className="text-neutral-400">Visual:</span> {item.visual}</p>
                    <p><span className="text-neutral-400">Texto:</span> {item.texto}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500">Nenhum roteiro definido.</p>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-neutral-800 py-6 text-center text-neutral-500 text-sm">
          Desenvolvido por AiMore 🚀 | Todos os direitos reservados
        </footer>
      </div>
    </>
  );
}