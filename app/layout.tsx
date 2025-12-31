
import type { Metadata } from 'next';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const sourceSans = Source_Sans_3({ 
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sunstone Advisory Group Federal Contracting Services',
  description: 'Strategic intelligence and advisory services for federal market success',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Sunstone Advisory Group Federal Contracting Services',
    description: 'Strategic intelligence and advisory services for federal market success',
    images: ['/og-image.png'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sourceSans.variable} ${playfairDisplay.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
// Rebuild trigger 1766080879
