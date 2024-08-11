'use client';

import { AssetItem, AssetType } from '@/common/AssetItem';
import {
    TransactionBlock,
    TransactionFlowType,
    TransactionType,
} from '@/common/TransactionBlock';
import React, { createContext, useState } from 'react';

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
}>({
    incomeStatementSummary: null,
    setIncomeStatementSummary: () => {},
    assetItems: [],
    setAssetItems: () => {},
    transactionBlocks: [],
    setTransactionBlocks: () => {},
});

function ContextProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isSideNavBarOpen, setIsSideNavBarOpen] = useState<boolean>(false);

    const [incomeStatementSummary, setIncomeStatementSummary] =
        useState<IncomeStatementSummary>({
            total_income: 0,
            passive_income: 0,
            total_expenses: 0,
            monthly_cashflow: 0,
        });

    const sampleAssetItems: AssetItem[] = [];

    const sampleJob = new AssetItem();
    sampleJob.setUpJob('Engineer', 40000, 1000, 3500);

    const sampleStock1 = new AssetItem();
    sampleStock1.setUpStock('AAPL', 250, 1, 0, '');

    const sampleStock2 = new AssetItem();
    sampleStock2.setUpStock('MYT4U', 1200, 1, 10, '');

    const sampleRealEstate1 = new AssetItem();
    sampleRealEstate1.setUpRealEstate(
        'House 2Br/1Ba',
        20000,
        5000,
        15000,
        120,
        ''
    );

    const sampleRealEstate2 = new AssetItem();
    sampleRealEstate2.setUpRealEstate(
        'House 3Br/2Ba',
        15000,
        5000,
        10000,
        75,
        'Buy togther with Kan at rate 1:1 so the statis already calculated at 50%'
    );

    const sampleBusiness = new AssetItem();
    sampleBusiness.setUpBusiness(
        'Part-time Business',
        10000,
        0,
        10000,
        -180,
        ''
    );

    const sampleChildcare = new AssetItem();
    sampleChildcare.setUpChildCare(400);

    const sampleHome = new AssetItem();
    sampleHome.setUpHome(20000, 320);

    const sampleCar = new AssetItem();
    sampleCar.setUpCar(5000, 100);

    const sampleCreditCard = new AssetItem();
    sampleCreditCard.setUpCreditCard(1000, 100);

    sampleAssetItems.push(
        sampleJob,
        sampleStock1,
        sampleStock2,
        sampleRealEstate1,
        sampleRealEstate2,
        sampleBusiness,
        sampleChildcare,
        sampleHome,
        sampleCar,
        sampleCreditCard
    );

    const sampleTransactionBlock1 = new TransactionBlock(
        TransactionFlowType.INCOME,
        600,
        TransactionType.SAVING
    );
    sampleTransactionBlock1.setTimestamp(new Date('07-07-2024'));

    const sampleTransactionBlock2 = new TransactionBlock(
        TransactionFlowType.INCOME,
        2200,
        TransactionType.PAYCHECK
    );

    sampleTransactionBlock2.setTimestamp(new Date('07-08-2024'));

    const sampleTransactionBlocks: TransactionBlock[] = [
        sampleTransactionBlock1,
        sampleTransactionBlock2,
        new TransactionBlock(
            TransactionFlowType.EXPENSE,
            -100,
            TransactionType.DOODADS,
            "Broken a phone and need to buy a new one, argggg why it's so expensive, I should have bought the insurance"
        ),
        new TransactionBlock(
            TransactionFlowType.INCOME,
            2200,
            TransactionType.PAYCHECK
        ),
        new TransactionBlock(
            TransactionFlowType.INCOME,
            2200,
            TransactionType.PAYCHECK
        ),
        new TransactionBlock(
            TransactionFlowType.EXPENSE,
            -500,
            TransactionType.DOODADS,
            'Go to the beach with family'
        ),
    ];

    const [assetItems, setAssetItems] = useState<AssetItem[]>(sampleAssetItems);
    const [transactionBlocks, setTransactionBlocks] = useState<
        TransactionBlock[]
    >(sampleTransactionBlocks);

    const value = {
        incomeStatementSummary,
        setIncomeStatementSummary,
        assetItems,
        setAssetItems,
        transactionBlocks,
        setTransactionBlocks,
    };

    return (
        <DataContext.Provider value={value}>
            <SideNavBarContext.Provider
                value={{ isSideNavBarOpen, setIsSideNavBarOpen }}
            >
                {children}
            </SideNavBarContext.Provider>
        </DataContext.Provider>
    );
}

export default ContextProvider;
