'use client';

import React, { useContext } from 'react';
import {
    Table,
    TableBody,
    TableCell,
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

function SectionLiability() {
    const { assetItems } = useContext(DataContext);

    const homeMortage = assetItems.find(
        (item) => item.getType() === AssetType.HOME && item.getLoan() > 0
    );

    const carLoan = assetItems.find(
        (item) => item.getType() === AssetType.CAR && item.getLoan() > 0
    );

    const schoolLoan = assetItems.find(
        (item) => item.getType() === AssetType.JOB && item.getLoan() > 0
    );

    const creditCardLoan = assetItems.find(
        (item) => item.getType() === AssetType.CREDIT_CARD && item.getLoan() > 0
    );

    const realEstateMortages = assetItems.filter(
        (item) =>
            item.getType() === AssetType.REALESTATE && item.getMortgage() > 0
    );

    const businessMortages = assetItems.filter(
        (item) =>
            item.getType() === AssetType.BUSINESS && item.getMortgage() > 0
    );

    return (
        <div className="md:w-[48%]">
            <AccordionItem value="section-liability">
                <AccordionTrigger>4. Liabilities</AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-wrap border-2">
                        {/* Stocks */}
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Home Mortage</TableCell>
                                    <TableCell>
                                        {numberToDollar(
                                            homeMortage
                                                ? homeMortage.getLoan()
                                                : 0
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>School Loan</TableCell>
                                    <TableCell>
                                        {numberToDollar(
                                            schoolLoan
                                                ? schoolLoan.getLoan()
                                                : 0
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Car Loan</TableCell>
                                    <TableCell>
                                        {numberToDollar(
                                            carLoan ? carLoan.getLoan() : 0
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Credit Cards</TableCell>
                                    <TableCell>
                                        {numberToDollar(
                                            creditCardLoan
                                                ? creditCardLoan.getLoan()
                                                : 0
                                        )}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        {/* Real Estates */}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-left break-all">
                                        Real Estate:
                                    </TableHead>
                                    <TableHead className="text-left">
                                        Mortgage:
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {realEstateMortages.map((item) => (
                                    <TableRow key={item.getId()}>
                                        <TableCell>{item.getTitle()}</TableCell>

                                        <TableCell>
                                            {numberToDollar(item.getMortgage())}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Businesses */}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-left break-all">
                                        Business:
                                    </TableHead>
                                    <TableHead className="text-left">
                                        Mortgage:
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {businessMortages.map((item) => (
                                    <TableRow key={item.getId()}>
                                        <TableCell>{item.getTitle()}</TableCell>

                                        <TableCell>
                                            {numberToDollar(item.getMortgage())}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </div>
    );
}

export default SectionLiability;
