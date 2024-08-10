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

function SectionExpense() {
    const { jobCard, incomeStatementSummary, setIncomeStatementSummary } =
        useContext(DataContext);
    useEffect(() => {
        if (!jobCard) return;
        const totalExpenses =
            jobCard?.tax +
            jobCard?.home_mortgage.interest +
            jobCard?.school_loan.interest +
            jobCard?.car_loan.interest +
            jobCard?.credit_card.interest +
            jobCard?.other_expenses +
            jobCard?.child_expenses.number_of_children *
                jobCard?.child_expenses.per_child_expense +
            jobCard?.loan_payment.interest;
        setIncomeStatementSummary((prev) => ({
            ...prev,
            total_expenses: totalExpenses,
            monthly_cashflow: prev.total_income - totalExpenses,
        }));
    }, [jobCard]);
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
                            {jobCard && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Taxes
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {numberToDollar(jobCard.tax)}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Home Mortgage
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {numberToDollar(
                                                jobCard.home_mortgage.interest
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            School Loan
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {numberToDollar(
                                                jobCard.school_loan.interest
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Car Loan
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {numberToDollar(
                                                jobCard.car_loan.interest
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Credit Card
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {numberToDollar(
                                                jobCard.credit_card.interest
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Other Expenses
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {numberToDollar(
                                                jobCard.other_expenses
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Child Expenses
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {numberToDollar(
                                                jobCard.child_expenses
                                                    .per_child_expense
                                            )}{' '}
                                            x{' '}
                                            {
                                                jobCard.child_expenses
                                                    .number_of_children
                                            }
                                            {' (childrens) '}={' '}
                                            {numberToDollar(
                                                jobCard.child_expenses
                                                    .number_of_children *
                                                    jobCard.child_expenses
                                                        .per_child_expense
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Loan Payment
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {numberToDollar(
                                                jobCard.loan_payment.interest
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
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
