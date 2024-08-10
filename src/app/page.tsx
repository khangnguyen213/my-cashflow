import { ModeToggle } from '@/components/togge-theme';
import IncomeStatement from './(income-statement)/IncomeStatement';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-2 p-6">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-lg">Financial Statement</h1>
        <ModeToggle />
      </div>
      <IncomeStatement />
      <div className="balance-sheet"></div>
    </main>
  );
}
