import { ConnectConfig } from 'near-api-js';
import { keyStore } from '@/App';
import getNetworkState from '@/utils/getNetworkState';

const getConnectConfig = (): ConnectConfig => {
  const network = getNetworkState();

  return {
    keyStore,
    networkId: network,
    nodeUrl: network === 'testnet' ? (process.env.TEST_NET_ARCHIVAL_RPC_URL as string) : 'http://localhost:3030',
  };
};

export default getConnectConfig;
