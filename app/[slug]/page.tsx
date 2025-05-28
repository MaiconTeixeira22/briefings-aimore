import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Briefing | AiMore Briefings',
};

export async function generateStaticParams() {
  const res = await fetch('http://localhost:3000/json/index.json');
  const briefings = await res.json();

  return briefings.map((item: { slug: string }) => ({
    slug: item.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const res = await fetch(`http://localhost:3000/json/${params.slug}.json`);
  const briefing = await res.json();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <header className="border-b border-neutral-800 sticky top-0 bg-neutral-950 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚀</span>
            <h1 className="text-xl sm:text-2xl font-extrabold">{briefing.titulo}</h1>
          </div>
          {briefing.link_pdf && (
            <a
              href={briefing.link_pdf}
              target="_blank"
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-md text-sm font-medium hover:opacity-80"
              rel="noopener noreferrer"
            >
              📥 Baixar PDF
            </a>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12">
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6">📑 Identificação</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoBox label="Cliente" value={briefing.cliente} />
            <InfoBox label="Segmento" value={briefing.segmento} />
            <InfoBox label="Tipo de Peça" value={briefing.tipo_peca} />
            <InfoBox label="Formato" value={briefing.formato} />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6">📝 Narrativa & Direcionamento</h2>
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

      <footer className="border-t border-neutral-800 py-6 text-center text-neutral-500 text-sm">
        Desenvolvido por AiMore 🚀 | Todos os direitos reservados
      </footer>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-neutral-800 rounded-xl p-4 bg-neutral-900">
      <p className="text-sm text-neutral-400">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}