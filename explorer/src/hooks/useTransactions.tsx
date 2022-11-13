import useBlocks from '@/hooks/useBlocks';
import { useEffect, useState } from 'react';
import { Transaction } from 'near-api-js/lib/providers/provider';
import { connect } from 'near-api-js';
import getConnectConfig from '@/utils/getConnectConfig';

interface UseTransactionsParam {
  initialFetchSize: number;
}

const useTransactions = ({ initialFetchSize }: UseTransactionsParam) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { fetchNextBlocks } = useBlocks({ fetchSize: initialFetchSize });

  useEffect(() => {
    fetchNextTransactions(0, 0);
  }, []);

  async function fetchNextTransactions(
    currentTransactionsLength: number = initialFetchSize,
    currentFetchCount?: number,
  ) {
    try {
      const isRefetching = currentFetchCount === 0;
      const near = await connect(getConnectConfig());
      const blocks = await fetchNextBlocks(isRefetching);
      const chunkHashArr = blocks.flatMap(block => block.chunks.map(({ chunk_hash }) => chunk_hash));
      const chunkDetails = await Promise.all(chunkHashArr.map(chunk => near.connection.provider.chunk(chunk)));

      const newTransactions = chunkDetails.flatMap(chunk => chunk.transactions || []);

      console.log('isRe', isRefetching);
      setTransactions(prev => (isRefetching ? [...newTransactions] : [...prev, ...newTransactions]));
      const needsToNextFetch =
        currentFetchCount !== undefined &&
        currentFetchCount < 10 &&
        currentTransactionsLength + newTransactions.length < initialFetchSize;
      if (needsToNextFetch) {
        fetchNextTransactions(currentTransactionsLength + newTransactions.length, currentFetchCount + 1);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const refetch = () => {
    fetchNextTransactions(0, 0);
  };

  return {
    transactions,
    fetchNextTransactions,
    refetch,
  };
};

export default useTransactions;
