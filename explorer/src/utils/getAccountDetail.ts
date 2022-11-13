import { AccountView } from 'near-api-js/lib/providers/provider';
import { connect } from 'near-api-js';
import getConnectConfig from '@/utils/getConnectConfig';

const getAccountDetail = async (accountId: string) => {
  const near = await connect(getConnectConfig());
  const accountDetail = await near.connection.provider.query<AccountView>({
    request_type: 'view_account',
    account_id: accountId,
    finality: 'final',
  });
  return accountDetail;
};

export default getAccountDetail;
