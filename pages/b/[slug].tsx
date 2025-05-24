import { GetServerSideProps } from 'next';
import Head from 'next/head';

export default function BriefingPage({ htmlContent }: { htmlContent: string }) {
  return (
    <>
      <Head>
        <title>Briefing | AiMore</title>
        <meta name="description" content="Visualização do briefing gerado pela AiMore" />
      </Head>

      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-10">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              📄 Briefing - AiMore
            </h1>
            <p className="text-neutral-400 mt-2">
              Detalhes completos do briefing gerado automaticamente.
            </p>
          </header>

          <article
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <footer className="pt-10 mt-10 border-t border-neutral-800">
            <p className="text-sm text-neutral-500 text-center">
              Powered by <span className="font-semibold text-white">AiMore</span> • {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  const res = await fetch(
    `https://raw.githubusercontent.com/MaiconTeixeira22/briefings-aimore/main/briefings/${slug}.html`
  );

  if (!res.ok) {
    return { notFound: true };
  }

  const htmlContent = await res.text();

  return {
    props: { htmlContent }
  };
};