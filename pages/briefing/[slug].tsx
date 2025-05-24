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
  } catch {
    return {
      notFound: true
    };
  }
};