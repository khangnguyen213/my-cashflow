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
    handleLoadingEnd,
    handleLoadingStart,
  } = useFinance();

  const { assetItems, transactionBlocks } = useContext(DataContext);

  useEffect(() => {
    // handleMockData();
    handleLoadingStart();
    retrieveFinanceDataFromLocalStorage();
    handleLoadingEnd();
  }, []);

  useEffect(() => {
    handleLoadingStart();
    calculateIncomeAndExpense();
    handleLoadingEnd();
  }, [assetItems, transactionBlocks]);

  return <>{children}</>;
}

export default DataSetupLayer;
