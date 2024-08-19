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
import { DataContext } from '../../ContextProvider';
import { AssetItem, AssetType } from '@/common/AssetItem';

function SectionAsset() {
  const { assetItems } = useContext(DataContext);

  const stocks: AssetItem[] = [];
  const realEstates: AssetItem[] = [];
  const businesses: AssetItem[] = [];

  assetItems.forEach((item) => {
    if (item.getType() === AssetType.STOCK) stocks.push(item);
    if (item.getType() === AssetType.REALESTATE) realEstates.push(item);
    if (item.getType() === AssetType.BUSINESS) businesses.push(item);
  });

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
                  <TableHead className="text-left break-all w-1/3">
                    Stocks/Funds/CDs:
                  </TableHead>
                  <TableHead className="text-left w-1/3">
                    # of Shares:
                  </TableHead>
                  <TableHead className="text-right w-1/3">
                    Cost/Share:
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stocks.map((stock) => (
                  <TableRow key={stock.getId()}>
                    <TableCell>{stock.getTitle()}</TableCell>
                    <TableCell>{stock.getQty()}</TableCell>
                    <TableCell className="text-right">
                      {numberToDollar(stock.getBuyPrice())}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Real Estates */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left break-all w-1/3">
                    Real Estate:
                  </TableHead>
                  <TableHead className="text-left w-1/3">Down Pay:</TableHead>
                  <TableHead className="text-right w-1/3">Cost:</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {realEstates.map((item) => (
                  <TableRow key={item.getId()}>
                    <TableCell>{item.getTitle()}</TableCell>
                    <TableCell>
                      {numberToDollar(item.getDownpayment())}
                    </TableCell>
                    <TableCell className="text-right">
                      {numberToDollar(item.getBuyPrice())}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Businesses */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left break-all w-1/3">
                    Business:
                  </TableHead>
                  <TableHead className="text-left w-1/3">Down Pay:</TableHead>
                  <TableHead className="text-right w-1/3">Cost:</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businesses.map((item) => (
                  <TableRow key={item.getId()}>
                    <TableCell>{item.getTitle()}</TableCell>
                    <TableCell>
                      {numberToDollar(item.getDownpayment())}
                    </TableCell>
                    <TableCell className="text-right">
                      {numberToDollar(item.getBuyPrice())}
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

export default SectionAsset;
