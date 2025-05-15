import Head from 'next/head'
import { supabase } from '../../lib/supabaseClient.js'

export default function BriefingPage({ htmlContent, nome_projeto }) {
  return (
    <>
      <Head>
        <title>{nome_projeto} | AiMore</title>
      </Head>
      <main dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  )
}

export async function getServerSideProps(context) {
  const slug = context.params.slug

  const { data, error } = await supabase
    .from('briefings_web')
    .select('html, nome_projeto')
    .eq('slug', slug)
    .eq('publicado', true)
    .single()

  if (error || !data) {
    return { notFound: true }
  }

  return {
    props: {
      htmlContent: data.html,
      nome_projeto: data.nome_projeto,
    },
  }
}