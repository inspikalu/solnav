'use client'
import React from 'react'
import BlockHeight from '@/app/components/BlockHeight';
import AverageBlockTime from '@/app/components/AverageBlockTime';
import TPS from '@/app/components/TPS';
import TransactionsTable from '@/app/components/TransactionTable';
import WalletOverview from '@/app/components/WalletOverview';
import TokenAnalytics from '@/app/components/TokenAnalytics';
// import NetworkFees from '@/app/components/NetworkFees';
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Page = () => {
    return (
        <main className="p-6 bg-gray-100 dark:bg-gray-900 w-full">
            <h2 className="font-bold text-3xl text-gray-800 dark:text-gray-200 mb-6">Welcome to SolNav</h2>
            <section className="w-full mb-6">
                <h2 className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-4">Network Overview</h2>
                <div className="w-full flex flex-row flex-wrap gap-4">
                    <BlockHeight />
                    <AverageBlockTime />
                    <TPS />
                    {/* <NetworkFees /> */}
                </div>
            </section>
            <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="w-full row-span-1 md:row-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <TokenAnalytics />
                </div>
                <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <TransactionsTable />
                </div>
                <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <WalletOverview />
                </div>
            </section>
        </main>
    );
}

export default Page
