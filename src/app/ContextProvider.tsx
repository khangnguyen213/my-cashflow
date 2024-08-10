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

    sampleAssetItems.push(
        sampleJob,
        sampleStock1,
        sampleStock2,
        sampleRealEstate1,
        sampleRealEstate2,
        sampleBusiness,
        sampleChildcare
    );

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
