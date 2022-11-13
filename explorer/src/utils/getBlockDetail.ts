import { connect } from 'near-api-js';
import { BlockId, BlockReference } from 'near-api-js/lib/providers/provider';
import getConnectConfig from '@/utils/getConnectConfig';

const getBlockDetail = async (blockId?: BlockId) => {
  const near = await connect(getConnectConfig());
  const blockQuery: BlockReference = blockId ? { blockId } : { finality: 'final' };
  console.log(blockQuery);
  const blockInfoByHeight = await near.connection.provider.block(blockQuery);
  return blockInfoByHeight;
};

export default getBlockDetail;
