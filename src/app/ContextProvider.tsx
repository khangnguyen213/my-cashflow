'use client';

import { AssetItem, AssetType } from '@/common/AssetItem';
import React, { createContext, useState } from 'react';

export const DataContext = createContext<{
    jobCard: JobCard | null;
    setJobCard: React.Dispatch<React.SetStateAction<JobCard>>;
    incomeStatementSummary: IncomeStatementSummary | null;
    setIncomeStatementSummary: React.Dispatch<
        React.SetStateAction<IncomeStatementSummary>
    >;
    assetItems: AssetItem[];
    setAssetItems: React.Dispatch<React.SetStateAction<AssetItem[]>>;
}>({
    jobCard: null,
    setJobCard: () => {},
    incomeStatementSummary: null,
    setIncomeStatementSummary: () => {},
    assetItems: [],
    setAssetItems: () => {},
});

function ContextProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [jobCard, setJobCard] = useState<JobCard>({
        title: 'Engineer',
        salary: 2500,
        tax: 250,
        home_mortgage: {
            principal: 40000,
            interest: 1000,
        },
        school_loan: {
            principal: 20000,
            interest: 500,
        },
        car_loan: {
            principal: 10000,
            interest: 300,
        },
        credit_card: {
            principal: 5000,
            interest: 200,
        },
        other_expenses: 1000,
        child_expenses: {
            number_of_children: 0,
            per_child_expense: 200,
        },
        loan_payment: {
            principal: 1000,
            interest: 100,
        },
        savings: 500,
    });
    const [incomeStatementSummary, setIncomeStatementSummary] =
        useState<IncomeStatementSummary>({
            total_income: 0,
            total_expenses: 0,
            monthly_cashflow: 0,
        });

    const sampleAssetItems: AssetItem[] = [
        new AssetItem('AAPL', 250, 0, 0, 2, 0, AssetType.STOCK, ''),
        new AssetItem('MYT4U', 1200, 0, 0, 1, 20, AssetType.STOCK, ''),
        new AssetItem(
            'House 3Be/2Ba',
            30000,
            10000,
            20000,
            1,
            200,
            AssetType.REALESTATE,
            'Buy together with Kan at rate 50:50'
        ),
        new AssetItem(
            'Part-time Business',
            5000,
            5000,
            0,
            -120,
            0,
            AssetType.BUSINESS,
            ''
        ),
    ];

    const [assetItems, setAssetItems] = useState<AssetItem[]>(sampleAssetItems);

    const value = {
        jobCard,
        setJobCard,
        incomeStatementSummary,
        setIncomeStatementSummary,
        assetItems,
        setAssetItems,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
}

export default ContextProvider;
