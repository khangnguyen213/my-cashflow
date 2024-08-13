'use client';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useState } from 'react';

function SideNavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const links = [
        {
            name: 'Home',
            href: '/',
        },
        {
            name: 'Finance',
            href: '/finance',
        },
        {
            name: 'Cashflow',
            href: '/cashflow',
        },
    ];
    return (
        <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <SheetTrigger>
                <HamburgerMenuIcon width={24} height={24} />
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetDescription>
                        <ul>
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <li className="text-lg font-semibold text-foreground cursor-pointer hover:bg-gray-300 hover:text-slate-900 dark:hover:bg-gray-100 dark:hover:text-slate-900 p-2 rounded-md transition-colors duration-200">
                                        {link.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}

export default SideNavBar;
