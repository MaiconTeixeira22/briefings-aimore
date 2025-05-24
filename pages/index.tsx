import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl mb-8 font-bold">🚀 Briefings AiMore</h1>
      <ul className="space-y-4">
        <li>
          <Link
            className="text-pink-400 hover:underline"
            href="/briefing/cafe-com-fe"
          >
            cafe-com-fe
          </Link>
        </li>
      </ul>
    </main>
  );
}