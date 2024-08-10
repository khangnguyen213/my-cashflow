import BalanceSheet from './(balance-sheet)/BalanceSheet';
import IncomeStatement from './(income-statement)/IncomeStatement';

function Finace() {
    return (
        <main className="flex min-h-screen flex-col items-center gap-2 px-6">
            <IncomeStatement />
            <BalanceSheet />
        </main>
    );
}

export default Finace;
