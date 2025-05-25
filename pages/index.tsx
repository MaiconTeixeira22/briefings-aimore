import { GetServerSideProps } from 'next';
import Link from 'next/link';

type Briefing = {
  slug: string;
  title: string;
};

type Props = {
  briefings: Briefing[];
};

export default function Home({ briefings }: Props) {
  return (
    <div className="min-h-screen bg-[#121212] text-white px-6 py-10">
      <header className="flex justify-between items-center mb-10 sticky top-0 bg-[#121212] z-50 shadow-md p-4 rounded-xl">
        <h1 className="text-3xl md:text-5xl font-extrabold gradient-title">
          🚀 AiMore Briefings Premium
        </h1>
        <a
          href="https://drive.google.com/drive/folders/SEU_ID_AQUI"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-[#A36BF2] to-[#FF5B9F] text-sm px-4 py-2 rounded-md hover:opacity-90 transition"
        >
          Abrir Pasta no Drive
        </a>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {briefings.length > 0 ? (
          briefings.map((briefing) => (
            <div
              key={briefing.slug}
              className="bg-[#1e1e1e] border border-[#292929] rounded-2xl p-8 shadow-lg hover:scale-[1.02] hover:shadow-xl transition"
            >
              <h2 className="text-lg font-semibold">{briefing.title}</h2>
              <Link
                href={`/${briefing.slug}`}
                className="mt-4 inline-flex items-center text-[#A36BF2] hover:underline"
              >
                Ver Briefing →
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Nenhum briefing encontrado.</p>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://briefings-aimore.vercel.app/json/index.json');
  
  if (!res.ok) {
    return {
      props: {
        briefings: [],
      },
    };
  }

  const briefings = await res.json();

  return {
    props: {
      briefings,
    },
  };
};