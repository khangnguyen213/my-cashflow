import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import ContextProvider from './ContextProvider';
import { ModeToggle } from '@/components/togge-theme';
import SideNavBar from '@/components/side-navbar';
import PageTitle from '@/components/page-title';
import Header from '@/components/ui/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Cashflow',
  description: 'Your personal finnancial statement to play Cashflow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <ContextProvider>
            <div className="w-full pt-20">{children}</div>
          </ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
