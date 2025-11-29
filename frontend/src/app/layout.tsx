import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CYCLR | The Circular Economy Protocol",
  description: "Transform every purchase into an investment. Your products hold value until they return to the cycle.",
  keywords: ["circular economy", "sustainability", "blockchain", "recycling", "staking"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-void">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-void text-holographic`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
