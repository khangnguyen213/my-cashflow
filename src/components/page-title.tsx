'use client';

import { usePathname } from 'next/navigation';

function PageTitle() {
    const pathName = usePathname();

    return (
        <h1 className="text-lg capitalize">
            {pathName.replace('/', '') || 'Home'}
        </h1>
    );
}

export default PageTitle;
