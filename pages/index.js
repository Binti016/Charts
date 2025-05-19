import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold">Assignment - Task 1</h1>
      <div className="flex gap-6">
        <Link href="/charts/bar" className="text-blue-500 underline">Bar Chart</Link>
        <Link href="/charts/gauge" className="text-green-600 underline">Gauge Chart</Link>
      </div>
    </main>
  );
}
