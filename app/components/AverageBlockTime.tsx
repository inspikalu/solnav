import React, { useEffect, useState } from 'react';
import CardLoader from '@/app/components/CardLoader';
import ErrorCard from '@/app/components/ErrorCard';

interface AverageBlockTimeResponse {
  averageBlockTime?: string;
  error?: string;
}

const AverageBlockTime: React.FC = () => {
  const [averageBlockTime, setAverageBlockTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAverageBlockTime = async () => {
    try {
      const res = await fetch('/api/getAverageBlockTime', {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data: AverageBlockTimeResponse = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setAverageBlockTime(data.averageBlockTime || null);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAverageBlockTime();

    const interval = setInterval(fetchAverageBlockTime, 180000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <CardLoader />;
  if (error) return <ErrorCard message={`Error: ${error}`}/>;

  return (
    <div className='flex flex-col gap-2 min-w-[13rem] min-h-[7rem] rounded-md dark:bg-blue-950 p-3'>
      <h1 className='font-bold text-lg'>Solana Average Block Time</h1>
      <p>{averageBlockTime} seconds</p>
    </div>
  );
};

export default AverageBlockTime;
