import { connect } from 'near-api-js';
import { BlockResult } from 'near-api-js/lib/providers/provider';
import getBlockDetail from '@/utils/getBlockDetail';
import { useEffect, useState } from 'react';
import getConnectConfig from '@/utils/getConnectConfig';

interface UseBlocksParam {
  fetchSize: number;
}

const useBlocks = ({ fetchSize }: UseBlocksParam) => {
  const [blocks, setBlocks] = useState<BlockResult[]>([]);
  const [prevBlockHash, setPrevBlockHash] = useState('');
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchNextBlocks();
      setIsFirstLoading(false);
    })();
  }, []);

  async function fetchNextBlocks(isRefetching: boolean = false) {
    const near = await connect(getConnectConfig());
    const lastBlock = await getBlockDetail(isRefetching ? undefined : prevBlockHash || undefined);
    const blockHashArr = [lastBlock.header.hash];
    let _prevBlockHash = lastBlock.header.prev_hash;

    for (let count = fetchSize - 1; count > 0; count--) {
      const prevBlock = await getBlockDetail(_prevBlockHash);
      blockHashArr.push(prevBlock.header.hash);
      _prevBlockHash = prevBlock.header.prev_hash;
    }

    setPrevBlockHash(_prevBlockHash);

    const blockDetails: BlockResult[] = await Promise.all(
      blockHashArr.map(blockId =>
        near.connection.provider.block({
          blockId,
        }),
      ),
    );

    console.log(blockDetails);

    setBlocks(prev => (isRefetching ? [...blockDetails] : [...prev, ...blockDetails]));
    return blockDetails;
  }

  const refetch = async () => {
    fetchNextBlocks(true);
  };

  return {
    blocks,
    fetchNextBlocks,
    refetch,
    isFirstLoading,
  };
};

export default useBlocks;
