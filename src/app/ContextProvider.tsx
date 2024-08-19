'use client';

import { AssetItem } from '@/common/AssetItem';
import { TransactionBlock } from '@/common/TransactionBlock';
import React, { createContext, useState } from 'react';
import DataSetupLayer from './DataSetupLayer';
import { IncomeStatementSummary } from '@/common/interfaces';

export const SideNavBarContext = createContext<{
  isSideNavBarOpen: boolean;
  setIsSideNavBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isSideNavBarOpen: false,
  setIsSideNavBarOpen: () => {},
});

export const DataContext = createContext<{
  incomeStatementSummary: IncomeStatementSummary | null;
  setIncomeStatementSummary: React.Dispatch<
    React.SetStateAction<IncomeStatementSummary>
  >;
  assetItems: AssetItem[];
  setAssetItems: React.Dispatch<React.SetStateAction<AssetItem[]>>;
  transactionBlocks: TransactionBlock[];
  setTransactionBlocks: React.Dispatch<
    React.SetStateAction<TransactionBlock[]>
  >;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  incomeStatementSummary: null,
  setIncomeStatementSummary: () => {},
  assetItems: [],
  setAssetItems: () => {},
  transactionBlocks: [],
  setTransactionBlocks: () => {},
  isLoading: true,
  setIsLoading: () => {},
});

function ContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSideNavBarOpen, setIsSideNavBarOpen] = useState<boolean>(false);
  const [incomeStatementSummary, setIncomeStatementSummary] =
    useState<IncomeStatementSummary>({
      salary: 0,
      passive_income: 0,
      total_expenses: 0,
    });
  const [assetItems, setAssetItems] = useState<AssetItem[]>([]);
  const [transactionBlocks, setTransactionBlocks] = useState<
    TransactionBlock[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const value = {
    incomeStatementSummary,
    setIncomeStatementSummary,
    assetItems,
    setAssetItems,
    transactionBlocks,
    setTransactionBlocks,
    isLoading,
    setIsLoading,
  };

  return (
    <DataContext.Provider value={value}>
      <SideNavBarContext.Provider
        value={{ isSideNavBarOpen, setIsSideNavBarOpen }}
      >
        <DataSetupLayer>{children}</DataSetupLayer>
      </SideNavBarContext.Provider>
    </DataContext.Provider>
  );
}

export default ContextProvider;
