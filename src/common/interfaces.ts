import { AssetStatus, AssetType } from './AssetItem';
import { TransactionFlowType, TransactionType } from './TransactionBlock';

interface JobCard {
  title: string;
  salary: number;
  tax: number;
  home_mortgage: {
    principal: number;
    interest: number;
  };
  school_loan: {
    principal: number;
    interest: number;
  };
  car_loan: {
    principal: number;
    interest: number;
  };
  credit_card: {
    principal: number;
    interest: number;
  };
  other_expenses: number;
  child_expenses: {
    number_of_children: number;
    per_child_expense: number;
  };
  loan_payment: {
    principal: number;
    interest: number;
  };
  savings: number;
}

export interface IncomeStatementSummary {
  salary: number;
  passive_income: number;
  total_expenses: number;
}

export interface AssetItemInterface {
  id: string;
  type: AssetType;
  title: string;
  buy_price: number;
  sell_price: number;
  downpayment: number;
  mortgage: number;
  qty: number;
  cashflow: number;
  loan: number;
  loan_interest: number;
  expense_per_child: number;
  status: AssetStatus;
  is_sellable: boolean;
  note: string;
}

export interface TransactionBlockInterface {
  id: string;
  flow_type: TransactionFlowType;
  amount: number;
  title: TransactionType;
  note: string;
  timestamp: Date;
}
