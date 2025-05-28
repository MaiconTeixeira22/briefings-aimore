import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AiMore Briefings',
  description: 'Briefing inteligente, visual e premium, powered by AiMore.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} style={{ backgroundColor: '#FAFAFA', color: '#121212' }}>
        <header style={{
          width: '100%',
          padding: '24px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #EDEDED',
          backgroundColor: '#FFFFFF'
        }}>
          <h1 style={{ fontSize: '20px', fontWeight: '600' }}>AiMore Briefings</h1>
          <Link href="/" style={{
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: '#121212',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontSize: '14px'
          }}>Home</Link>
        </header>
        <main style={{ padding: '48px', maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </main>
        <footer style={{
          width: '100%',
          padding: '24px 48px',
          borderTop: '1px solid #EDEDED',
          textAlign: 'center',
          fontSize: '14px',
          color: '#888888',
          backgroundColor: '#FFFFFF'
        }}>
          © {new Date().getFullYear()} AiMore — Todos os direitos reservados.
        </footer>
      </body>
    </html>
  );
}
