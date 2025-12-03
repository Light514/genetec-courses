import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const garamond = localFont({
  src: [
    {
      path: '../public/fonts/Garamond Premier Pro/GaramondPremrPro.otf',
      weight: '400',
    },
    {
      path: '../public/fonts/Garamond Premier Pro/GaramondPremrPro-Smbd.otf',
      weight: '600',
    },
  ],
  variable: '--font-garamond',
});

const circular = localFont({
  src: [
    {
      path: '../public/fonts/Circular Pro/CircularPro-Book.otf',
      weight: '400',
    },
    {
      path: '../public/fonts/Circular Pro/CircularPro-Medium.otf',
      weight: '500',
    },
    {
      path: '../public/fonts/Circular Pro/CircularPro-Bold.otf',
      weight: '700',
    },
  ],
  variable: '--font-circular',
});

export const metadata: Metadata = {
  title: "Genetec Training Courses",
  description: "Browse our comprehensive training courses catalog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${circular.variable} ${garamond.variable}`} style={{ fontFamily: 'var(--font-circular), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
