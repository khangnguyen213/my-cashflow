import { Accordion } from '@/components/ui/accordion';
import SectionAsset from './SectionAsset';
import SectionLiability from './SectionLiablitiy';

function BalanceSheet() {
    return (
        <div className="w-full">
            <h1 className="p-1 text-center rounded-sm bg-slate-600 text-white dark:bg-slate-200 dark:text-black">
                Balance Sheet
            </h1>
            <Accordion
                type="multiple"
                defaultValue={['section-asset', 'section-liability']}
                className="md:flex md:justify-between"
            >
                <SectionAsset />
                <SectionLiability />
            </Accordion>
        </div>
    );
}

export default BalanceSheet;
