import { providers } from 'near-api-js';
import getNetworkState from '@/utils/getNetworkState';

const getTransactionDetail = async (txHash: string) => {
  const network = getNetworkState();
  const provider = new providers.JsonRpcProvider({
    url: network === 'testnet' ? (process.env.TEST_NET_ARCHIVAL_RPC_URL as string) : 'http://localhost:3030',
  }); // account ID associated with the transaction
  const ACCOUNT_ID = 'sender.testnet';

  return await provider.txStatus(txHash, ACCOUNT_ID);
};

export default getTransactionDetail;
