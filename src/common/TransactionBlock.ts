export enum TransactionFlowType {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
}

export enum TransactionType {
    PAYCHECK = 'PAYCHECK',
    SAVING = 'SAVING',
    DOODADS = 'DOODADS',
    UNEMPLOYMENT = 'UNEMPLOYMENT',
    OTHER = 'OTHER',
}

export class TransactionBlock {
    private id: string;
    private flow_type: TransactionFlowType;
    private amount = 0;
    private title = '';
    private note = '';
    private timestamp: Date;

    constructor(
        flow_type: TransactionFlowType,
        amount: number,
        title: TransactionType,
        note = ''
    ) {
        this.id =
            title +
            '_' +
            new Date().getTime() +
            Math.random().toString(12).substring(2);
        this.flow_type = flow_type;
        this.amount = amount;
        this.title = title;
        this.note = note;
        this.timestamp = new Date();
    }

    getAmount() {
        return this.amount;
    }

    getTitle() {
        return this.title;
    }

    getNote() {
        return this.note;
    }

    getFlowType() {
        return this.flow_type;
    }

    getId() {
        return this.id;
    }

    getTimestamp() {
        return this.timestamp;
    }

    setAmount(amount: number) {
        this.amount = amount;
    }

    setTitle(title: TransactionType) {
        this.title = title;
    }

    setNote(note: string) {
        this.note = note;
    }

    setFlowType(flow_type: TransactionFlowType) {
        this.flow_type = flow_type;
    }

    setId(id: string) {
        this.id = id;
    }

    setTimestamp(timestamp: Date) {
        this.timestamp = timestamp;
    }
}
