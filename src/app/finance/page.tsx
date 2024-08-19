'use client';

import { useContext } from 'react';
import { DataContext } from '../ContextProvider';
import BalanceSheet from './(balance-sheet)/BalanceSheet';
import IncomeStatement from './(income-statement)/IncomeStatement';
import PageSkeleton from '@/components/page-skeleton';

function Finace() {
  const { isLoading } = useContext(DataContext);
  return (
    <main className="flex min-h-screen flex-col items-center gap-2 px-6">
      {isLoading && <PageSkeleton />}
      {!isLoading && (
        <>
          <IncomeStatement />
          <BalanceSheet />
        </>
      )}
    </main>
  );
}

export default Finace;
