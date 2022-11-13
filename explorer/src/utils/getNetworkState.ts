import { NearScopeNetwork } from '@/components/Navigation';

const getNetworkState = (): NearScopeNetwork => {
  let network: NearScopeNetwork = 'testnet';
  const initialNetwork = localStorage.getItem('NEAR_SCOPE_NETWORK');
  if (initialNetwork === 'localnet') {
    network = 'localnet';
  }
  return network;
};
export default getNetworkState;
