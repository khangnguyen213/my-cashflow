'use client';

import { useContext } from 'react';
import { DataContext } from './ContextProvider';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from '@/components/ui/table';
import numberToDollar from '@/utils/NumberToDollar';
import CashflowSummary from './cashflow/components/CashflowSummary';
import { Button } from '@/components/ui/button';
import useFinance from '@/hooks/useFinance';
import PageSkeleton from '@/components/page-skeleton';

export default function Home() {
  const { incomeStatementSummary, transactionBlocks, isLoading } =
    useContext(DataContext);
  const { receivePaycheck } = useFinance();
  return (
    <main className="flex min-h-screen flex-col items-center gap-2 px-6">
      {isLoading && <PageSkeleton />}
      {!isLoading && (
        <>
          <div className="w-full">
            <CashflowSummary transactionBlocks={transactionBlocks} />
          </div>
          {incomeStatementSummary && (
            <div className="w-full border-2">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-right font-medium">
                      Salary
                    </TableCell>
                    <TableCell className="text-right">
                      {numberToDollar(incomeStatementSummary.salary)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-right font-medium">
                      + Passive Income
                    </TableCell>
                    <TableCell className="text-right">
                      {incomeStatementSummary &&
                        numberToDollar(incomeStatementSummary.passive_income)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-right font-medium">
                      - Total Expense
                    </TableCell>
                    <TableCell className="text-right">
                      {incomeStatementSummary &&
                        numberToDollar(incomeStatementSummary.total_expenses)}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="text-right font-medium">
                      = Monthly Cashflow
                    </TableCell>
                    <TableCell className="text-right">
                      {incomeStatementSummary &&
                        numberToDollar(
                          incomeStatementSummary.salary +
                            incomeStatementSummary.passive_income -
                            incomeStatementSummary.total_expenses
                        )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          )}
          <Button variant="outline" onClick={receivePaycheck}>
            Receive Paycheck
          </Button>
        </>
      )}
    </main>
  );
}
