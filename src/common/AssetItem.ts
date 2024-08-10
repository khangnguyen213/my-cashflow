export enum AssetType {
    REALESTATE = 'REALESATE',
    BUSINESS = 'BUSINESS',
    STOCK = 'STOCK',
}

export class AssetItem {
    id: string;
    title: string;
    price: number;
    downpayment: number;
    mortgage: number;
    qty: number;
    cashflow: number;
    type: AssetType;
    note: string;

    constructor(
        title: string,
        price: number,
        downpayment: number,
        mortgage: number,
        qty: number,
        cashflow: number,
        type: AssetType,
        note: string
    ) {
        this.id =
            type +
            '_' +
            new Date().getTime() +
            Math.random().toString(12).substring(2);
        this.title = title;
        this.price = price;
        this.downpayment = downpayment;
        this.mortgage = mortgage;
        this.qty = qty;
        this.cashflow = cashflow;
        this.type = type;
        this.note = note;
    }
}
