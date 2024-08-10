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
import { AssetItem, AssetType } from '@/common/AssetItem';

function SectionAsset() {
    const { assetItems, incomeStatementSummary, setIncomeStatementSummary } =
        useContext(DataContext);

    const jobs: AssetItem[] = [];
    const stockIncomes: AssetItem[] = [];
    const realestateIncomes: AssetItem[] = [];
    const businesseIncomes: AssetItem[] = [];

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

    const calculateIncome = () => {
        const jobSalary = jobs.reduce(
            (acc, item) => acc + item.getCashflow(),
            0
        );

        const passiveIncome = stockIncomes
            .concat(realestateIncomes)
            .concat(businesseIncomes)
            .reduce((acc, item) => acc + item.getCashflow(), 0);

        setIncomeStatementSummary((prev) => {
            return {
                ...prev,
                total_income: jobSalary + passiveIncome,
                passive_income: passiveIncome,
            };
        });
    };

    useEffect(() => {
        calculateIncome();
    }, []);

    return (
        <div className="md:w-[48%]">
            <AccordionItem value="section-asset">
                <AccordionTrigger>3. Assets</AccordionTrigger>
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
                                {jobs.length > 0 && (
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            {jobs[0].getTitle()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {numberToDollar(
                                                jobs[0].getCashflow()
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )}
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
                                {stockIncomes.map((item) => (
                                    <TableRow key={item.getId()}>
                                        <TableCell className="font-medium">
                                            {item.getTitle()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {numberToDollar(item.getCashflow())}
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
                                {realestateIncomes.map((item) => (
                                    <TableRow key={item.getId()}>
                                        <TableCell className="font-medium">
                                            {item.getTitle()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {numberToDollar(item.getCashflow())}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {businesseIncomes.map((item) => (
                                    <TableRow key={item.getId()}>
                                        <TableCell className="font-medium">
                                            {item.getTitle()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {numberToDollar(item.getCashflow())}
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
                                {jobs.length > 0
                                    ? numberToDollar(jobs[0].getCashflow())
                                    : 0}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-right font-medium">
                                + Passive Income
                            </TableCell>
                            <TableCell className="text-right">
                                {incomeStatementSummary &&
                                    numberToDollar(
                                        incomeStatementSummary.passive_income
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

export default SectionAsset;
