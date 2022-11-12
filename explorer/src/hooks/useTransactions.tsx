import useBlocks from '@/hooks/useBlocks';
import { useEffect, useState } from 'react';
import { Transaction } from 'near-api-js/lib/providers/provider';
import { connect } from 'near-api-js';
import { config } from '@/App';

interface UseTransactionsParam {
  initialFetchSize: number;
}

const useTransactions = ({ initialFetchSize }: UseTransactionsParam) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { fetchNextBlocks } = useBlocks({ fetchSize: initialFetchSize });

  useEffect(() => {
    fetchNextTransactions(0);
  }, []);

  async function fetchNextTransactions(currentTransactionsLength: number = initialFetchSize) {
    try {
      const near = await connect(config);
      const blocks = await fetchNextBlocks();
      const chunkHashArr = blocks.flatMap(block => block.chunks.map(({ chunk_hash }) => chunk_hash));
      const chunkDetails = await Promise.all(chunkHashArr.map(chunk => near.connection.provider.chunk(chunk)));

      const newTransactions = chunkDetails.flatMap(chunk => chunk.transactions || []);

      setTransactions(prev => [...prev, ...newTransactions]);
      if (currentTransactionsLength + newTransactions.length < initialFetchSize) {
        fetchNextTransactions(currentTransactionsLength + newTransactions.length);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return {
    transactions,
    fetchNextTransactions,
  };
};

export default useTransactions;
