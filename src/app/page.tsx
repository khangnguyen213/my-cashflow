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

export default function Home() {
  const { incomeStatementSummary, transactionBlocks } = useContext(DataContext);
  return (
    <main className="flex min-h-screen flex-col items-center gap-2 px-6">
      <div className="w-full">
        <CashflowSummary transactionBlocks={transactionBlocks} />
      </div>
      {incomeStatementSummary && (
        <div className="w-full border-2">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-right font-medium">Salary</TableCell>
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
    </main>
  );
}
