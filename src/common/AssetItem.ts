import { ErrorMessage } from './ErrorMessage';

export enum AssetType {
    REALESTATE = 'REALESATE',
    BUSINESS = 'BUSINESS',
    STOCK = 'STOCK',
    JOB = 'JOB',
    CHILDCARE = 'CHILDCARE',
    HOME = 'HOME',
    CAR = 'CAR',
    CREDIT_CARD = 'CREDIT_CARD',
    NOT_DEFINED = 'NOT_DEFINED',
}

export enum AssetStatus {
    ACTIVE = 'ACTIVE',
    SOLD = 'SOLD',
    INACTIVE = 'INACTIVE',
}
export class AssetItem {
    private id: string;
    private type: AssetType;
    private title = '';
    private buy_price = 0;
    private sell_price = 0;
    private downpayment = 0;
    private mortgage = 0;
    private qty = 0;
    private cashflow = 0;
    private loan = 0;
    private loan_interest = 0;
    private expense_per_child = 0;
    private status = AssetStatus.ACTIVE;
    private is_sellable = true;
    private note = '';

    constructor() {
        this.id = '';
        this.type = AssetType.NOT_DEFINED;
    }

    setUpJob(
        title: string,
        loan: number,
        loan_interest: number,
        cashflow: number
    ) {
        if (this.type !== AssetType.NOT_DEFINED)
            throw new Error(ErrorMessage.ASSET_TYPE_ALREADY_SET);
        this.type = AssetType.JOB;
        this.id =
            AssetType.JOB +
            '_' +
            new Date().getTime() +
            Math.random().toString(12).substring(2);
        this.title = title;
        this.buy_price = loan;
        this.loan = loan;
        this.loan_interest = loan_interest;
        this.cashflow = cashflow;
    }

    setUpStock(
        title: string,
        buy_price: number,
        qty: number,
        cashflow: number,
        note: string
    ) {
        if (this.type !== AssetType.NOT_DEFINED)
            throw new Error(ErrorMessage.ASSET_TYPE_ALREADY_SET);
        this.type = AssetType.STOCK;
        this.id =
            AssetType.STOCK +
            '_' +
            new Date().getTime() +
            Math.random().toString(12).substring(2);
        this.title = title;
        this.buy_price = buy_price;
        this.qty = qty;
        this.cashflow = cashflow;
        this.note = note;
    }

    setUpRealEstate(
        title: string,
        buy_price: number,
        downpayment: number,
        mortgage: number,
        cashflow: number,
        note: string
    ) {
        if (this.type !== AssetType.NOT_DEFINED)
            throw new Error(ErrorMessage.ASSET_TYPE_ALREADY_SET);
        if (buy_price !== downpayment + mortgage)
            throw new Error(ErrorMessage.ASSET_SETUP_INVALID);
        this.type = AssetType.REALESTATE;
        this.id =
            AssetType.REALESTATE +
            '_' +
            new Date().getTime() +
            Math.random().toString(12).substring(2);
        this.title = title;
        this.buy_price = buy_price;
        this.downpayment = downpayment;
        this.mortgage = mortgage;
        this.loan = buy_price - downpayment;
        this.cashflow = cashflow;
        this.note = note;
    }

    setUpBusiness(
        title: string,
        buy_price: number,
        downpayment: number,
        mortgage: number,
        cashflow: number,
        note: string
    ) {
        if (this.type !== AssetType.NOT_DEFINED)
            throw new Error(ErrorMessage.ASSET_TYPE_ALREADY_SET);
        if (buy_price !== downpayment + mortgage)
            throw new Error(ErrorMessage.ASSET_SETUP_INVALID);
        this.type = AssetType.BUSINESS;
        this.id =
            AssetType.BUSINESS +
            '_' +
            new Date().getTime() +
            Math.random().toString(12).substring(2);
        this.title = title;
        this.buy_price = buy_price;
        this.downpayment = downpayment;
        this.mortgage = mortgage;
        this.loan = buy_price - downpayment;
        this.cashflow = cashflow;
        this.note = note;
    }

    setUpChildCare(expense_per_child: number) {
        if (this.type !== AssetType.NOT_DEFINED)
            throw new Error(ErrorMessage.ASSET_TYPE_ALREADY_SET);
        this.type = AssetType.CHILDCARE;
        this.id =
            AssetType.CHILDCARE +
            '_' +
            new Date().getTime() +
            Math.random().toString(12).substring(2);
        this.expense_per_child = expense_per_child;
        this.is_sellable = false;
    }

    setUpHome(loan: number, loan_interest: number) {
        if (this.type !== AssetType.NOT_DEFINED)
            throw new Error(ErrorMessage.ASSET_TYPE_ALREADY_SET);
        this.type = AssetType.HOME;
        this.id =
            AssetType.HOME +
            '_' +
            new Date().getTime() +
            Math.random().toString(12).substring(2);
        this.title = 'Home';
        this.loan = loan;
        this.loan_interest = loan_interest;
        this.is_sellable = false;
    }

    setUpCar(loan: number, loan_interest: number) {
        if (this.type !== AssetType.NOT_DEFINED)
            throw new Error(ErrorMessage.ASSET_TYPE_ALREADY_SET);
        this.type = AssetType.CAR;
        this.id =
            AssetType.CAR +
            '_' +
            new Date().getTime() +
            Math.random().toString(12).substring(2);
        this.title = 'Car';
        this.loan = loan;
        this.loan_interest = loan_interest;
        this.is_sellable = false;
    }

    setUpCreditCard(loan: number, loan_interest: number) {
        if (this.type !== AssetType.NOT_DEFINED)
            throw new Error(ErrorMessage.ASSET_TYPE_ALREADY_SET);
        this.type = AssetType.CREDIT_CARD;
        this.id =
            AssetType.CREDIT_CARD +
            '_' +
            new Date().getTime() +
            Math.random().toString(12).substring(2);
        this.title = 'Credit Card';
        this.loan = loan;
        this.loan_interest = loan_interest;
        this.is_sellable = false;
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getBuy_price() {
        return this.buy_price;
    }

    getSell_price() {
        return this.sell_price;
    }

    getQty() {
        return this.qty;
    }

    getCashflow() {
        return this.status ? this.cashflow : 0;
    }

    getNote() {
        return this.note;
    }

    getType() {
        return this.type;
    }

    getDownpayment() {
        return this.downpayment;
    }

    getMortgage() {
        return this.mortgage;
    }

    getLoan() {
        return this.loan;
    }

    getLoanInterest() {
        return this.loan > 0 ? this.loan_interest : 0;
    }

    getStatus() {
        return this.status;
    }

    getIsSellable() {
        return this.is_sellable;
    }

    getExpensePerChild() {
        return this.expense_per_child;
    }

    setId(id: string) {
        this.id = id;
    }

    setTitle(title: string) {
        this.title = title;
    }

    setBuy_price(buy_price: number) {
        this.buy_price = buy_price;
    }

    setSell_price(sell_price: number) {
        this.sell_price = sell_price;
    }

    setQty(qty: number) {
        this.qty = qty;
    }

    setCashflow(cashflow: number) {
        this.cashflow = cashflow;
    }

    setNote(note: string) {
        this.note = note;
    }

    setType(type: AssetType) {
        this.type = type;
    }

    setDownpayment(downpayment: number) {
        this.downpayment = downpayment;
    }

    setMortgage(mortgage: number) {
        this.mortgage = mortgage;
    }

    setLoan(loan: number) {
        this.loan = loan;
    }

    setLoanInterest(loan_interest: number) {
        this.loan_interest = loan_interest;
    }

    setStatus(status: AssetStatus) {
        this.status = status;
    }

    setIsSellable(is_sellable: boolean) {
        this.is_sellable = is_sellable;
    }

    setExpensePerChild(expense_per_child: number) {
        this.expense_per_child = expense_per_child;
    }
}
