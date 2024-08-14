import {
  TransactionBlock,
  TransactionFlowType,
} from '@/common/TransactionBlock';

export function calculateCashflow(transactionBlocks: TransactionBlock[]) {
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
  return {
    income,
    expense,
    cashflow,
  };
}
