import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import ContextProvider from './ContextProvider';
import { ModeToggle } from '@/components/togge-theme';
import SideNavBar from '@/components/side-navbar';
import PageTitle from '@/components/page-title';

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
                    <div className="w-full flex justify-between items-center px-6 py-4">
                        <div className="flex gap-4">
                            <SideNavBar />
                            <PageTitle />
                        </div>
                        <ModeToggle />
                    </div>
                    <ContextProvider>{children}</ContextProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
