import useFinance from '@/hooks/useFinance';
import { useContext, useEffect } from 'react';
import { DataContext } from './ContextProvider';

function DataSetupLayer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    calculateIncomeAndExpense,
    handleMockData,
    retrieveFinanceDataFromLocalStorage,
  } = useFinance();

  const { assetItems, transactionBlocks } = useContext(DataContext);

  useEffect(() => {
    // handleMockData();
    retrieveFinanceDataFromLocalStorage();
  }, []);

  useEffect(() => {
    calculateIncomeAndExpense();
  }, [assetItems, transactionBlocks]);

  return <>{children}</>;
}

export default DataSetupLayer;
