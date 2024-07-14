import React, { useEffect, useState } from 'react';
import CardLoader from '@/app/components/CardLoader';
import ErrorCard from '@/app/components/ErrorCard';

interface BlockHeightResponse {
  jsonrpc: string;
  result: number;
  id: number;
}

const BlockHeight: React.FC = () => {
  const [blockHeight, setBlockHeight] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlockHeight = async () => {
    try {
      const res = await fetch('/api/getBlockHeight', {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data: BlockHeightResponse = await res.json();
      setBlockHeight(data.result);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch block height on component mount
    fetchBlockHeight();

    // Set interval to fetch block height every 3 minutes
    const interval = setInterval(fetchBlockHeight, 180000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (loading) return <CardLoader />;
  if (error) return <ErrorCard message={`Error: ${error}`}/>;

  return (
    <div className='flex flex-col gap-2 min-w-[13rem] min-h-[7rem] rounded-md dark:bg-blue-950 p-3'>
      <h1 className='font-bold text-lg'>Solana Block Height</h1>
      <p>{blockHeight}</p>
    </div>
  );
};

export default BlockHeight;
