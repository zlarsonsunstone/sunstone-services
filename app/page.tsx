
import Dashboard from '@/components/dashboard';
import servicesData from '@/data/services.json';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Dashboard data={servicesData} />
    </main>
  );
}
