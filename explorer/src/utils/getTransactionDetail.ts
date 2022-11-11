import { providers } from 'near-api-js';

const getTransactionDetail = async (txHash: string) => {
  const provider = new providers.JsonRpcProvider({ url: process.env.TEST_NET_ARCHIVAL_RPC_URL as string }); // account ID associated with the transaction
  const ACCOUNT_ID = 'sender.testnet';

  return await provider.txStatus(txHash, ACCOUNT_ID);
};

export default getTransactionDetail;
