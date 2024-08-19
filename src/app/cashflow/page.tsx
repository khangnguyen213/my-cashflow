'use client';

import { useContext } from 'react';
import { DataContext } from '../ContextProvider';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { TransactionFlowType } from '@/common/TransactionBlock';
import numberToDollar from '@/utils/NumberToDollar';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import CashflowSummary from './components/CashflowSummary';
import PageSkeleton from '@/components/page-skeleton';

function Cashflow() {
  const { transactionBlocks, isLoading } = useContext(DataContext);
  let cash = 0;
  return (
    <main className="flex min-h-screen flex-col items-center gap-2 px-6">
      {isLoading && <PageSkeleton />}
      {!isLoading && (
        <div className="w-full mb-8">
          <CashflowSummary transactionBlocks={transactionBlocks} />
          <p className="text-center p-2 pb-4">HISORY</p>
          <div className="border-2 rounded-md overflow-hidden">
            <Table>
              <TableBody>
                {transactionBlocks
                  .sort(
                    (a, b) =>
                      a.getTimestamp().getTime() - b.getTimestamp().getTime()
                  )
                  .map((block) => {
                    return (
                      <TableRow key={block.getId()}>
                        <TableCell className="text-left flex flex-col justify-center">
                          <p
                            className="text-[0.6rem] opacity-80"
                            suppressHydrationWarning
                          >
                            {block.getTimestamp().toLocaleDateString('vi-VN', {
                              day: 'numeric',
                              month: 'numeric',
                              year: 'numeric',
                              second: '2-digit',
                              minute: '2-digit',
                              hour: '2-digit',
                            })}
                          </p>
                          <p className="font-bold">{block.getTitle()}</p>
                          <AlertDialog>
                            <AlertDialogTrigger className="text-left line-clamp-2 opacity-90 text-xs text-pretty">
                              {block.getNote()}
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[94%]">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="flex justify-between">
                                  <div>{block.getTitle()}</div>
                                  <div
                                    className={`${
                                      block.getFlowType() ==
                                      TransactionFlowType.INCOME
                                        ? 'text-emerald-500'
                                        : 'text-rose-500'
                                    }`}
                                  >
                                    {numberToDollar(block.getAmount())}
                                  </div>
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-left text-pretty">
                                  {block.getNote()}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogAction>Okay</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-col gap-1">
                            <div className="text-[0.7rem] opacity-50">
                              {cash}
                            </div>
                            <div
                              className={`${
                                block.getFlowType() ==
                                TransactionFlowType.INCOME
                                  ? 'text-emerald-500'
                                  : 'text-rose-500'
                              }`}
                            >
                              {numberToDollar(block.getAmount())}
                            </div>
                            <div className="text-[0.7rem] opacity-50">
                              = {(cash += block.getAmount())}
                            </div>
                          </div>
                          {/* {numberToDollar(
                                                    block.getAmount()
                                                )} */}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </main>
  );
}

export default Cashflow;
