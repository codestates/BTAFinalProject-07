import { connect } from 'near-api-js';
import { config } from '@/App';
import { AccessKeyList } from 'near-api-js/lib/providers/provider';

const getAccessKeys = async (accountId: string) => {
  const near = await connect(config);
  const accessKeys = await near.connection.provider.query<AccessKeyList>({
    request_type: 'view_access_key_list',
    finality: 'final',
    account_id: accountId,
  });
  return accessKeys;
};

export default getAccessKeys;
