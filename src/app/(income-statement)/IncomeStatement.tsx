import React from 'react';
import SectionIncome from './SectionIncome';
import { Accordion } from '@/components/ui/accordion';
import SectionExpense from './SectionExpense';

function IncomeStatement() {
    return (
        <div className="w-full mb-8">
            <h1 className="p-1 text-center rounded-sm bg-slate-600 text-white dark:bg-slate-200 dark:text-black">
                Income Statement
            </h1>
            <Accordion
                type="multiple"
                defaultValue={['section-income', 'section-expense']}
                className="md:flex md:justify-between"
            >
                <SectionIncome />
                <SectionExpense />
            </Accordion>
        </div>
    );
}

export default IncomeStatement;
