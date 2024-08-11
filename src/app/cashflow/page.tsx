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

function Cashflow() {
    const { transactionBlocks } = useContext(DataContext);
    let income = 0;
    let expense = 0;
    let cashflow = transactionBlocks.reduce((acc, block) => {
        if (block.getFlowType() === TransactionFlowType.INCOME) {
            income += block.getAmount();
        } else {
            expense += block.getAmount();
        }
        return acc + block.getAmount();
    }, 0);
    return (
        <main className="flex min-h-screen flex-col items-center gap-2 px-6">
            <div className="w-full mb-8">
                <div
                    className={`rounded-md p-3 flex flex-col gap-1 justify-center items-center text-white ${
                        cashflow > 0 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                >
                    <p className="text-xs md:text-sm font-medium opacity-80">
                        NET BALANCE
                    </p>
                    <h2 className="text-3xl md:text-4xl font-medium">
                        {numberToDollar(cashflow)}
                    </h2>
                </div>
                <div className="flex justify-between py-3">
                    <div className="w-[48%] rounded-md border-2 py-3 bg-white text-black">
                        <h1 className="text-center text-lg md:text-xl font-medium bg-white text-emerald-500">
                            {numberToDollar(income)}
                        </h1>
                        <h2 className="text-center text-xs md:text-sm font-medium opacity-75">
                            INCOME
                        </h2>
                    </div>
                    <div className="w-[48%] rounded-md border-2 py-3 bg-white text-black">
                        <h1 className="text-center text-lg md:text-xl font-medium bg-white text-rose-500">
                            {numberToDollar(expense)}
                        </h1>
                        <h2 className="text-center text-xs md:text-sm font-medium opacity-75">
                            EXPENSE
                        </h2>
                    </div>
                </div>
                <p className="text-center p-2 pb-4">HISORY</p>
                <div className="border-2 rounded-md overflow-hidden">
                    <Table>
                        <TableBody>
                            {transactionBlocks
                                .sort(
                                    (a, b) =>
                                        a.getTimestamp().getTime() -
                                        b.getTimestamp().getTime()
                                )
                                .map((block) => {
                                    return (
                                        <TableRow key={block.getId()}>
                                            <TableCell className="text-left flex flex-col justify-center">
                                                <p
                                                    className="text-[0.6rem] opacity-80"
                                                    suppressHydrationWarning
                                                >
                                                    {block
                                                        .getTimestamp()
                                                        .toLocaleDateString(
                                                            'vi-VN',
                                                            {
                                                                day: 'numeric',
                                                                month: 'numeric',
                                                                year: 'numeric',
                                                                second: '2-digit',
                                                                minute: '2-digit',
                                                                hour: '2-digit',
                                                            }
                                                        )}
                                                </p>
                                                <p className="font-bold">
                                                    {block.getTitle()}
                                                </p>
                                                <AlertDialog>
                                                    <AlertDialogTrigger className="text-left line-clamp-2 opacity-90 text-xs">
                                                        {block.getNote()}
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className="w-[94%]">
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle className="flex justify-between">
                                                                <div>
                                                                    {block.getTitle()}
                                                                </div>
                                                                <div
                                                                    className={`${
                                                                        block.getFlowType() ==
                                                                        TransactionFlowType.INCOME
                                                                            ? 'text-emerald-500'
                                                                            : 'text-rose-500'
                                                                    }`}
                                                                >
                                                                    {numberToDollar(
                                                                        block.getAmount()
                                                                    )}
                                                                </div>
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription className="text-left text-pretty">
                                                                {block.getNote()}
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogAction>
                                                                Okay
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                            <TableCell
                                                className={`text-right ${
                                                    block.getFlowType() ==
                                                    TransactionFlowType.INCOME
                                                        ? 'text-emerald-500'
                                                        : 'text-rose-500'
                                                }`}
                                            >
                                                {numberToDollar(
                                                    block.getAmount()
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </main>
    );
}

export default Cashflow;
