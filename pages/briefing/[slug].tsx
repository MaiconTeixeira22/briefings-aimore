import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';

const BriefingPage = ({
  htmlContent,
  nome_projeto
}: {
  htmlContent: string;
  nome_projeto: string;
}) => {
  return (
    <>
      <Head>
        <title>{`${nome_projeto} | AiMore`}</title>
      </Head>
      <main
        className="min-h-screen bg-black text-white p-8"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </>
  );
};

export default BriefingPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context.params?.slug as string;

  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/MaiconTeixeira22/briefings-aimore/main/briefings/${slug}.html`
    );

    if (!res.ok) {
      return {
        notFound: true
      };
    }

    const htmlContent = await res.text();

    return {
      props: {
        htmlContent,
        nome_projeto: slug.replace(/-/g, ' ').toUpperCase()
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};