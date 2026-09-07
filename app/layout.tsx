import type { Metadata } from "next";
import { Anek_Latin } from "next/font/google";
import "./globals.css";

const anekLatin = Anek_Latin({
  variable: "--font-anek-latin",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "1Fi Shop",
  description: "Shop now and pay later using your mutual funds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={anekLatin.variable}>{children}</body>
    </html>
  );
}
