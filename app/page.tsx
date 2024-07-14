import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
            <header className="w-full py-12 bg-gradient-to-r from-blue-500 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white text-center">
                <h1 className="text-6xl font-extrabold tracking-tight">SolNav</h1>
                <p className="mt-4 text-2xl">Explore the Future of Solana Analytics</p>
                <div className="mt-6 flex justify-center space-x-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-64">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Real-time Insights</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            Get up-to-date metrics on block height, average block time, and TPS.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-64">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Comprehensive Analytics</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            Dive into token performance, transaction history, and wallet details.
                        </p>
                    </div>
                </div>
                <div className="mt-8">
                    <Link href="/dashboard"  className="px-8 py-4 bg-blue-600 text-white text-2xl font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                            Go to Dashboard
                    </Link>
                </div>
            </header>
            <main className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <section className="mt-8 mb-8 w-full flex flex-col md:flex-row items-center justify-around gap-3">
                    <div className="w-full md:w-1/2 mb-6 md:mb-0">
                        <img src="/dashboard-screenshot.png" alt="SolNav Dashboard Screenshot" className="rounded-lg shadow-md w-full" />
                        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
                            Take a look at our comprehensive dashboard that offers a detailed view of the Solana blockchain metrics and analytics.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full md:w-1/2">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Key Features</h2>
                        <ul className="text-lg list-disc list-inside text-gray-700 dark:text-gray-300">
                            <li>Network Overview with Real-time Data</li>
                            <li>Detailed Token Performance Analytics</li>
                            <li>Recent Transactions Table</li>
                            <li>Wallet Overview and Management</li>
                        </ul>
                    </div>
                </section>
            </main>
            <footer className="w-full py-4 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-center">
                <p>&copy; 2024 SolNav. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
