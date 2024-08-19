import { DataContext } from '@/app/ContextProvider';
import { AssetItem, AssetType } from '@/common/AssetItem';
import { TransactionBlockInterface } from '@/common/interfaces';
import {
  TransactionBlock,
  TransactionFlowType,
  TransactionType,
} from '@/common/TransactionBlock';
import { SAMPLE_ASSET_ITEMS, SAMPLE_TRANSACTION_BLOCKS } from '@/mock';
import { useCallback, useContext } from 'react';

function useFinance() {
  const {
    assetItems,
    incomeStatementSummary,
    transactionBlocks,
    setTransactionBlocks,
    setIncomeStatementSummary,
    setAssetItems,
    setIsLoading,
  } = useContext(DataContext);

  const handleLoadingStart = useCallback(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  const handleLoadingEnd = useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const mapObjectToAssetItem = useCallback((object: any) => {
    return new AssetItem(object);
  }, []);

  const mapObjectToTransactionBlock = useCallback(
    (object: TransactionBlockInterface) => {
      return new TransactionBlock(
        TransactionFlowType.INCOME,
        0,
        TransactionType.OTHER,
        '',
        object
      );
    },
    []
  );

  const setTransactionBlocksInLocalStorage = useCallback(
    (transactionBlocks: TransactionBlock[]) => {
      localStorage.setItem(
        'transactionBlocks',
        JSON.stringify(transactionBlocks)
      );
    },
    []
  );

  const setAssetItemsInLocalStorage = useCallback((assetItems: AssetItem[]) => {
    localStorage.setItem('assetItems', JSON.stringify(assetItems));
  }, []);

  const getTransactionBlocksFromLocalStorage =
    useCallback((): TransactionBlock[] => {
      const transactionBlocksFromLocalStorage =
        localStorage.getItem('transactionBlocks');
      if (transactionBlocksFromLocalStorage) {
        return JSON.parse(transactionBlocksFromLocalStorage).map(
          mapObjectToTransactionBlock
        );
      }
      return [];
    }, [mapObjectToTransactionBlock]);

  const getAssetItemsFromLocalStorage = useCallback((): AssetItem[] => {
    const assetItemsFromLocalStorage = localStorage.getItem('assetItems');
    if (assetItemsFromLocalStorage) {
      return JSON.parse(assetItemsFromLocalStorage).map(mapObjectToAssetItem);
    }
    return [];
  }, [mapObjectToAssetItem]);

  const handleMockData = useCallback(() => {
    setAssetItemsInLocalStorage(SAMPLE_ASSET_ITEMS);
    setTransactionBlocksInLocalStorage(SAMPLE_TRANSACTION_BLOCKS);
  }, [setAssetItemsInLocalStorage, setTransactionBlocksInLocalStorage]);

  function retrieveFinanceDataFromLocalStorage() {
    const assetItemsFromLocalStorage = getAssetItemsFromLocalStorage();
    const transactionBlocksFromLocalStorage =
      getTransactionBlocksFromLocalStorage();

    if (assetItemsFromLocalStorage.length > 0) {
      setAssetItems(assetItemsFromLocalStorage);
    }

    if (transactionBlocksFromLocalStorage.length > 0) {
      setTransactionBlocks(transactionBlocksFromLocalStorage);
    }
  }

  const calculateIncomeAndExpense = useCallback(() => {
    const jobs: AssetItem[] = [];
    const stockIncomes: AssetItem[] = [];
    const realestateIncomes: AssetItem[] = [];
    const businesseIncomes: AssetItem[] = [];

    const expenses: AssetItem[] = [];

    const childcareExpenses = assetItems.filter(
      (item) => item.getType() === AssetType.CHILDCARE
    );

    assetItems.forEach((item) => {
      if (
        (item.getCashflow() < 0 || item.getLoanInterest() > 0) &&
        item.getType() !== AssetType.CHILDCARE
      )
        expenses.push(item);
    });

    const totalExpense =
      expenses.reduce((acc, item) => {
        if (item.getLoanInterest() > 0) {
          return acc + item.getLoanInterest();
        }
        return acc - item.getCashflow();
      }, 0) + childcareExpenses[0]?.getCashflow();

    setIncomeStatementSummary((prev) => {
      return {
        ...prev,
        total_expenses: totalExpense,
      };
    });

    assetItems.forEach((item) => {
      switch (item.getType()) {
        case AssetType.JOB:
          jobs.push(item);
          break;
        case AssetType.STOCK:
          if (item.getCashflow() > 0) stockIncomes.push(item);
          break;
        case AssetType.REALESTATE:
          if (item.getCashflow() > 0) realestateIncomes.push(item);
          break;
        case AssetType.BUSINESS:
          if (item.getCashflow() > 0) businesseIncomes.push(item);
          break;
      }
    });

    const jobSalary = jobs.reduce((acc, item) => acc + item.getCashflow(), 0);

    const passiveIncome = stockIncomes
      .concat(realestateIncomes)
      .concat(businesseIncomes)
      .reduce((acc, item) => acc + item.getCashflow(), 0);

    setIncomeStatementSummary((prev) => {
      return {
        ...prev,
        salary: jobSalary,
        passive_income: passiveIncome,
      };
    });
  }, [assetItems, setIncomeStatementSummary]);

  function receivePaycheck() {
    if (!incomeStatementSummary) return;
    const paycheckTransactionBlock = new TransactionBlock(
      TransactionFlowType.INCOME,
      incomeStatementSummary.salary +
        incomeStatementSummary.passive_income -
        incomeStatementSummary.total_expenses,
      TransactionType.PAYCHECK
    );
    setTransactionBlocks((prev) => {
      const newTransactionBlocks = [...prev, paycheckTransactionBlock];
      setTransactionBlocksInLocalStorage(newTransactionBlocks);
      return newTransactionBlocks;
    });
  }

  return {
    receivePaycheck,
    calculateIncomeAndExpense,
    handleMockData,
    retrieveFinanceDataFromLocalStorage,
    handleLoadingStart,
    handleLoadingEnd,
  };
}

export default useFinance;
