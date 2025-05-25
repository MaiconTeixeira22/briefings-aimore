import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';

export default function BriefingPage({ data }: any) {
  if (!data) {
    return <div style={{ textAlign: 'center', padding: '80px' }}>🚫 Briefing não encontrado.</div>;
  }

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '48px' }}>
      <h1 style={{ color: '#FF5B9F' }}>{data.nome_projeto}</h1>
      <p><strong>Cliente:</strong> {data.cliente}</p>
      <p><strong>Segmento:</strong> {data.segmento}</p>
      <p><strong>Tipo de Peça:</strong> {data.tipo_de_peca}</p>
      <p><strong>Formato:</strong> {data.formato_da_peca}</p>
      <p><strong>Objetivo:</strong> {data.objetivo}</p>
      <p><strong>Mensagem Principal:</strong> {data.mensagem_principal}</p>

      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <a 
          href={data.webViewLink} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            backgroundColor: '#FF5B9F', 
            color: '#fff', 
            padding: '12px 24px', 
            borderRadius: '8px', 
            textDecoration: 'none', 
            display: 'inline-block' 
          }}
        >
          📄 Baixar PDF
        </a>
      </div>
    </div>
  );
}

// 🚀 Função que carrega os dados com base no slug da URL
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  const filePath = path.join(process.cwd(), 'public', 'json', `${slug}.json`);
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    return {
      props: { data },
    };
  } catch (error) {
    return {
      props: { data: null },
    };
  }
};