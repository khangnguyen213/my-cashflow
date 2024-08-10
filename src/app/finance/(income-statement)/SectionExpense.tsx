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
import { DataContext } from '../../ContextProvider';
import { AssetItem, AssetType } from '@/common/AssetItem';

function SectionExpense() {
    const { assetItems, incomeStatementSummary, setIncomeStatementSummary } =
        useContext(DataContext);

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

    const calculateExpense = () => {
        const totalExpense =
            expenses.reduce((acc, item) => {
                if (item.getLoanInterest() > 0) {
                    return acc + item.getLoanInterest();
                }
                return acc - item.getCashflow();
            }, 0) + childcareExpenses[0].getCashflow();

        setIncomeStatementSummary((prev) => {
            return {
                ...prev,
                total_expenses: totalExpense,
                monthly_cashflow: prev.total_income - totalExpense,
            };
        });
    };

    useEffect(() => {
        calculateExpense();
    }, []);
    return (
        <div className="md:w-[48%]">
            <AccordionItem value="section-expense">
                <AccordionTrigger>2. Expenses</AccordionTrigger>
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
                            <TableBody>
                                {expenses.map((item) => {
                                    let title = '';
                                    let amount = '';
                                    if (item.getLoanInterest() > 0) {
                                        title =
                                            item.getType() === AssetType.JOB
                                                ? 'Education loan interest'
                                                : 'Loan interest: ' +
                                                  item.getTitle();
                                        amount = numberToDollar(
                                            -item.getLoanInterest()
                                        );
                                    } else {
                                        title = item.getTitle() + ' expense';
                                        amount = numberToDollar(
                                            item.getCashflow()
                                        );
                                    }
                                    return (
                                        <TableRow key={item.getId()}>
                                            <TableCell className="font-medium">
                                                {title}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {amount}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}

                                {childcareExpenses.length > 0 && (
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Childcare
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {numberToDollar(
                                                childcareExpenses[0].getExpensePerChild()
                                            )}{' '}
                                            x {childcareExpenses[0].getQty()} ={' '}
                                            {numberToDollar(
                                                childcareExpenses[0].getCashflow()
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <h1 className="pt-4 text-center">Expenses Summary</h1>
                </AccordionContent>
            </AccordionItem>
            <div className="w-full border-2">
                <Table>
                    <TableFooter>
                        <TableRow>
                            <TableCell className="text-right font-medium">
                                - Total Expenses
                            </TableCell>
                            <TableCell className="text-right">
                                {incomeStatementSummary &&
                                    numberToDollar(
                                        incomeStatementSummary.total_expenses
                                    )}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
            <div className="w-full border-2 mt-4">
                <Table>
                    <TableFooter>
                        <TableRow>
                            <TableCell className="text-center font-bold text-base">
                                = Monthly Cashflow
                            </TableCell>
                            <TableCell className="text-right text-base font-medium">
                                {incomeStatementSummary &&
                                    numberToDollar(
                                        incomeStatementSummary.monthly_cashflow
                                    )}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
}

export default SectionExpense;
