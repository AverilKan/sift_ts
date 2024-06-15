import type { ReactNode } from 'react';
import { Inter } from "next/font/google";
import "./globals.css";

interface LayoutProps {
  children: ReactNode;  
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}

export default Layout;
