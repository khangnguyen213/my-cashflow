'use client';

import React from 'react';
import SideNavBar from '../side-navbar';
import PageTitle from '../page-title';
import { ModeToggle } from '../togge-theme';

function Header() {
  return (
    <div className="w-full flex justify-between items-center px-6 py-2 md:py-4 fixed top-0 left-0 right-0 bg-background shadow-md z-50">
      <div className="flex gap-4">
        <SideNavBar />
        <PageTitle />
      </div>
      <ModeToggle />
    </div>
  );
}

export default Header;
