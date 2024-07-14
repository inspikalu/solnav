'use client'
import AppWalletProvider from "@/app/components/walletProvider";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
                <AppWalletProvider>
                    <div className="w-full min-h-screen flex flex-col-reverse md:flex-row">
                        <div className="w-full md:w-full p-4 mb-auto min-h-auto overflow-y-auto">
                        {/* <div className="w-full md:w-3/4 p-4 mb-auto min-h-auto overflow-y-auto"> */}
                            {children}
                        </div>
                    </div>
                </AppWalletProvider>
            </body>
        </html>
    );
}
