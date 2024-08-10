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

interface IncomeStatementSummary {
    total_income: number;
    passive_income: number;
    total_expenses: number;
    monthly_cashflow: number;
}
