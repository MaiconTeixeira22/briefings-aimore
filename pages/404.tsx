import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '120px 24px' }}>
      <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', marginBottom: '24px' }}>404</h1>
      <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Página não encontrada</h2>
      <p style={{ color: '#A0A0A0', marginBottom: '32px' }}>
        O briefing que você procura não existe ou foi removido.
      </p>
      <Link href="/">
        <a className="download-btn">⬅️ Voltar para a Página Inicial</a>
      </Link>
    </div>
  );
}