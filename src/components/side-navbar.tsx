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
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

function SideNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
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
        <SheetTitle className="pb-4">Menu</SheetTitle>
        <SheetDescription className="pb-4 hidden">
          Navigate to different pages
        </SheetDescription>
        <ul>
          {links.map((link) => {
            const isActive = pathName === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                <li
                  className={clsx(
                    'text-lg font-semibold text-foreground cursor-pointer hover:bg-gray-300 hover:text-slate-900 dark:hover:bg-gray-100 dark:hover:text-slate-900 p-2 rounded-md transition-colors duration-200',
                    {
                      'bg-gray-300 text-slate-900 dark:bg-gray-100 dark:text-slate-900':
                        isActive,
                    }
                  )}
                >
                  {link.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
}

export default SideNavBar;
