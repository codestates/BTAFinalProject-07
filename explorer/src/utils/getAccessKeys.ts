import { connect } from 'near-api-js';
import { AccessKeyList } from 'near-api-js/lib/providers/provider';
import getConnectConfig from '@/utils/getConnectConfig';

const getAccessKeys = async (accountId: string) => {
  const near = await connect(getConnectConfig());
  const accessKeys = await near.connection.provider.query<AccessKeyList>({
    request_type: 'view_access_key_list',
    finality: 'final',
    account_id: accountId,
  });
  return accessKeys;
};

export default getAccessKeys;
