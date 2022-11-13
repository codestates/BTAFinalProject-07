import useBlocks from '@/hooks/useBlocks';
import { useEffect, useState } from 'react';
import { FinalExecutionStatus, Transaction } from 'near-api-js/lib/providers/provider';
import { connect } from 'near-api-js';
import getConnectConfig from '@/utils/getConnectConfig';
import getTransactionDetail from '@/utils/getTransactionDetail';

interface UseTransactionsParam {
  initialFetchSize: number;
}

const useTransactions = ({ initialFetchSize }: UseTransactionsParam) => {
  const [transactions, setTransactions] = useState<(Transaction & { status: FinalExecutionStatus })[]>([]);
  const { fetchNextBlocks } = useBlocks({ fetchSize: initialFetchSize });
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    (async () => {
      await fetchNextTransactions(0, 0);
      setIsFirstLoading(false);
    })();
  }, []);

  async function fetchNextTransactions(
    currentTransactionsLength: number = initialFetchSize,
    currentFetchCount?: number,
  ) {
    try {
      setIsFetching(true);
      const isRefetching = currentFetchCount === 0;
      const near = await connect(getConnectConfig());
      const blocks = await fetchNextBlocks(isRefetching);
      const chunkHashArr = blocks.flatMap(block => block.chunks.map(({ chunk_hash }) => chunk_hash));
      const chunkDetails = await Promise.all(chunkHashArr.map(chunk => near.connection.provider.chunk(chunk)));

      const newTransactions = chunkDetails.flatMap(chunk => chunk.transactions || []);
      const newTransactionsDetail = await Promise.all(
        newTransactions.map(transaction => getTransactionDetail(transaction.hash)),
      );
      const newTransactionsWithStatus = newTransactions.map((transaction, idx) => ({
        ...transaction,
        status: newTransactionsDetail[idx].status,
      }));

      setTransactions(prev =>
        isRefetching ? [...newTransactionsWithStatus] : [...prev, ...newTransactionsWithStatus],
      );
      const needsToNextFetch =
        currentFetchCount !== undefined &&
        currentFetchCount < 10 &&
        currentTransactionsLength + newTransactions.length < initialFetchSize;
      if (needsToNextFetch) {
        await fetchNextTransactions(currentTransactionsLength + newTransactions.length, currentFetchCount + 1);
      }
    } catch (e) {
      console.error(e);
    }
    setIsFetching(false);
  }

  const refetch = () => {
    fetchNextTransactions(0, 0);
  };

  return {
    transactions,
    fetchNextTransactions,
    refetch,
    isFirstLoading,
    isFetching,
  };
};

export default useTransactions;
