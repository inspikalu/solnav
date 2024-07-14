import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "SolNav",
  description: "SolNav is designed to provide a comprehensive overview of the Solana blockchain network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
