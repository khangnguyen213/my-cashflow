import { TransactionBlock } from '@/common/TransactionBlock';
import { calculateCashflow } from '@/utils/CalculateCashflow';
import numberToDollar from '@/utils/NumberToDollar';

interface CashflowSummaryProps {
  transactionBlocks: TransactionBlock[];
}
function CashflowSummary({ transactionBlocks }: CashflowSummaryProps) {
  const { cashflow, income, expense } = calculateCashflow(transactionBlocks);
  return (
    <>
      <div
        className={`rounded-md p-3 flex flex-col gap-1 justify-center items-center text-white ${
          cashflow > 0 ? 'bg-emerald-500' : 'bg-rose-500'
        }`}
      >
        <p className="text-xs md:text-sm font-medium opacity-80">NET BALANCE</p>
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
    </>
  );
}

export default CashflowSummary;
