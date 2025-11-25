import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });

export const metadata: Metadata = {
  title: 'HouseCall for Kids | Virtual Pediatric Care at Home',
  description:
    'Comforting, expert pediatric urgent care delivered virtually from the warmth of your home. Meet our care team and explore how HouseCall for Kids supports families across California.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PFHS5CX80E"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-PFHS5CX80E');`
          }}
        />
      </head>
      <body className="bg-midnight text-slate-100">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1 pb-24">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
