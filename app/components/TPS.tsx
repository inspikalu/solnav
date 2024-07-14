import React, { useEffect, useState } from 'react';
import CardLoader from '@/app/components/CardLoader';
import ErrorCard from '@/app/components/ErrorCard';

interface TPSResponse {
  tps?: string;
  error?: string;
}

const TPS: React.FC = () => {
  const [tps, setTPS] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTPS = async () => {
    try {
      const res = await fetch('/api/getTPS', {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data: TPSResponse = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setTPS(data.tps || null);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTPS();

    const interval = setInterval(fetchTPS, 180000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <CardLoader />;
  if (error) return <ErrorCard message={`Error: ${error}`}/>;

  return (
    <div className='flex flex-col gap-2 min-w-[13rem] min-h-[7rem] rounded-md dark:bg-blue-950 p-3'>
      <h1 className='font-bold text-lg'>Solana Transactions Per Second (TPS)</h1>
      <p>{tps} seconds</p>
    </div>
  );
};

export default TPS;
