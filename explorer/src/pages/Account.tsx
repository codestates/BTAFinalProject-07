/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { useUrlQueryParams } from '@/hooks/useUrlQueryParams';
import { useEffect, useState } from 'react';
import { AccessKeyList, AccountView } from 'near-api-js/lib/providers/provider';
import getAccountDetail from '@/utils/getAccountDetail';
import { css, Theme } from '@emotion/react';
import DetailTable from '@/components/DetailTable';
import { utils } from 'near-api-js';
import getAccessKeys from '@/utils/getAccessKeys';

function Account() {
  const navigate = useNavigate();
  const params = useUrlQueryParams();
  const accountId = params.id;
  const [accountDetail, setAccountDetail] = useState<AccountView | null>(null);
  const [accessKeys, setAccessKeys] = useState<AccessKeyList | null>();

  useEffect(() => {
    if (!accountId) {
      alert('올바른 접근이 아닙니다. 메인으로 돌아갑니다.');
      navigate('/');
      return;
    }
    (async () => {
      try {
        const accountDetail = await getAccountDetail(accountId);
        setAccountDetail(accountDetail);
      } catch (e) {
        alert('계정 데이터를 불러오는데 실패하였습니다. 메인으로 돌아갑니다.');
        navigate('/');
        console.error(e);
      }
      const accessKeys = await getAccessKeys(accountId);
      setAccessKeys(accessKeys);
    })();
  }, [accountId]);

  return (
    <>
      <div css={accountWrapCss}>
        <DetailTable title={'Account Information'} titleIconUrl={'/assets/icon-account.png'} isIconRounded={false}>
          <tr>
            <th>Account Id</th>
            <td>{accountId}</td>
          </tr>
          {accountDetail && (
            <>
              <tr>
                <th>Balance</th>
                <td>{Number(utils.format.formatNearAmount(accountDetail.amount)).toFixed(2)} Near</td>
              </tr>
              <tr>
                <th>Locked</th>
                <td>{Number(accountDetail.locked) ? 'YES' : 'NO'} </td>
              </tr>
              <tr>
                <th>Storage Used</th>
                <td>{(Number(accountDetail.storage_usage) / 1000).toFixed(2)}KB</td>
              </tr>
            </>
          )}
          {accessKeys &&
            accessKeys.keys.map(({ public_key, access_key }, idx) => (
              <tr key={public_key} style={idx ? { borderTop: 'none' } : undefined}>
                <th>{idx === 0 ? 'Access Keys' : ''}</th>
                <td css={accessKeyTdCss}>
                  <p>
                    <span className="permission-label">
                      {access_key.permission === 'FullAccess' ? 'Full' : 'Limited'}
                    </span>
                    <span>{public_key}</span>
                  </p>
                </td>
              </tr>
            ))}
        </DetailTable>
      </div>
    </>
  );
}

const accountWrapCss = css`
  margin: 50px 0;
`;

const accessKeyTdCss = (theme: Theme) => css`
  p {
    display: flex;
    align-items: center;
    gap: 10px;

    span {
      color: ${theme.color.black600};
    }

    .permission-label {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      width: 60px;
      height: 24px;
      border-radius: 5px;

      background-color: ${theme.color.orange100};
    }
  }
`;

export default Account;
