'use client';

import React, { useContext, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import numberToDollar from '@/utils/NumberToDollar';
import { DataContext } from '../ContextProvider';
import { AssetType } from '@/common/AssetItem';

function SectionIncome() {
    const {
        assetItems,
        jobCard,
        incomeStatementSummary,
        setIncomeStatementSummary,
    } = useContext(DataContext);
    console.log(assetItems);
    const incomeItems = [
        {
            title: 'AAPL',
            amount: 250,
            type: AssetType.STOCK,
        },
        {
            title: 'AAPL',
            amount: 150,
            type: AssetType.STOCK,
        },
        {
            title: 'House 3Br/2Ba',
            amount: 350,
            type: AssetType.REALESTATE,
        },
        {
            title: 'Part-time Business',
            amount: 450,
            type: AssetType.BUSINESS,
        },
    ];

    const calculateTotalIncome = () => {
        const totalIncome =
            incomeItems.reduce((acc, item) => acc + item.amount, 0) +
            (jobCard?.salary || 0);

        setIncomeStatementSummary((prev) => ({
            ...prev,
            total_income: totalIncome,
            monthly_cashflow: totalIncome - prev.total_expenses,
        }));

        return totalIncome;
    };

    useEffect(() => {
        calculateTotalIncome();
    }, []);

    return (
        <div className="md:w-[48%]">
            <AccordionItem value="section-income">
                <AccordionTrigger>1. Income</AccordionTrigger>
                <AccordionContent>
                    <div className="w-full flex flex-wrap border-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">
                                        Description
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Cashflow
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                        </Table>

                        {/* Salary */}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead colSpan={2}>Salary</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        {jobCard?.title}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {numberToDollar(jobCard?.salary || 0)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        {/* Interest/Dividends */}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead colSpan={2}>
                                        Interest/Dividends
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {incomeItems
                                    .filter(
                                        (item) => item.type == AssetType.STOCK
                                    )
                                    .map((item) => (
                                        <TableRow key={item.title}>
                                            <TableCell className="font-medium">
                                                {item.title}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {numberToDollar(item.amount)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>

                        {/* Real Estate/Business */}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead colSpan={2}>
                                        Real Estate/Business
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {incomeItems
                                    .filter(
                                        (item) =>
                                            item.type == AssetType.REALESTATE ||
                                            item.type == AssetType.BUSINESS
                                    )
                                    .map((item) => (
                                        <TableRow key={item.title}>
                                            <TableCell className="font-medium">
                                                {item.title}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {numberToDollar(item.amount)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                    <h1 className="pt-4 text-center">Income Summary</h1>
                </AccordionContent>
            </AccordionItem>
            <div className="w-full border-2">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-right font-medium">
                                Salary
                            </TableCell>
                            <TableCell className="text-right">
                                {numberToDollar(jobCard?.salary || 0)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-right font-medium">
                                + Passive Income
                            </TableCell>
                            <TableCell className="text-right">
                                {incomeStatementSummary &&
                                    jobCard &&
                                    numberToDollar(
                                        incomeStatementSummary.total_income -
                                            jobCard.salary
                                    )}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell className="text-right font-medium">
                                = Total Income
                            </TableCell>
                            <TableCell className="text-right">
                                {incomeStatementSummary &&
                                    numberToDollar(
                                        incomeStatementSummary.total_income
                                    )}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
}

export default SectionIncome;
