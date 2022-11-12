import { connect } from 'near-api-js';
import { BlockReference } from 'near-api-js/lib/providers/provider';
import { config } from '@/App';

const getBlockDetail = async (blockId?: string) => {
  const near = await connect(config);
  const blockQuery: BlockReference = blockId ? { blockId } : { finality: 'final' };
  console.log(blockQuery);
  const blockInfoByHeight = await near.connection.provider.block(blockQuery);
  return blockInfoByHeight;
};

export default getBlockDetail;
