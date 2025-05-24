import { GetServerSideProps } from 'next';
import Head from 'next/head';

export default function BriefingPage({ htmlContent }: { htmlContent: string }) {
  return (
    <>
      <Head>
        <title>Briefing | AiMore</title>
      </Head>
      <main
        className="min-h-screen bg-black text-white p-8"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
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