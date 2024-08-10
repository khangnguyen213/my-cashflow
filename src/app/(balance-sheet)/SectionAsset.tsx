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

    const stocks = assetItems.filter(
        (item) => item.getType() === AssetType.STOCK
    );

    return (
        <div className="md:w-[48%]">
            <AccordionItem value="section-asset">
                <AccordionTrigger>3. Assets</AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-wrap border-2">
                        {/* Stocks */}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-left break-all">
                                        Stocks/Funds/CDs:
                                    </TableHead>
                                    <TableHead className="text-left">
                                        # of Shares:
                                    </TableHead>
                                    <TableHead className="text-left">
                                        Cost/Share:
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stocks.map((stock) => (
                                    <TableRow key={stock.getId()}>
                                        <TableCell>
                                            {stock.getTitle()}
                                        </TableCell>
                                        <TableCell>{stock.getQty()}</TableCell>
                                        <TableCell>
                                            {numberToDollar(
                                                stock.getBuyPrice()
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <h1 className="pt-4 text-center">Income Summary</h1>
                </AccordionContent>
            </AccordionItem>
        </div>
    );
}

export default SectionAsset;
