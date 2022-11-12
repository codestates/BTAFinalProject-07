/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import DetailTable from '@/components/DetailTable';
import useTransactions from '@/hooks/useTransactions';
import { useNavigate } from 'react-router-dom';
import makeEllipsis from '@/utils/makeEllipsis';

function Transactions() {
  const navigate = useNavigate();
  const { transactions, fetchNextTransactions } = useTransactions({ initialFetchSize: 20 });

  const handleMoreBtnClick = () => {
    fetchNextTransactions();
  };

  const handleTransactionItemClick = (txnHash: string) => {
    navigate('/transactions/' + txnHash);
  };

  return (
    <div css={transactionsWrapCss}>
      <DetailTable title={'Transactions'} titleIconUrl={'/assets/icon-list.png'} isIconRounded={false}>
        <table>
          <colgroup>
            <col width="2%" />
            <col width="28%" />
            <col width="30%" />
            <col width="30%" />
            <col width="10%" />
            <col />
          </colgroup>
          <thead css={theadCss}>
            <th></th>
            <th>TXN HASH</th>
            <th>FROM</th>
            <th>TO</th>
            <th>actions</th>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.hash} css={itemCss} onClick={() => handleTransactionItemClick(transaction.hash)}>
                <td></td>
                <td>{makeEllipsis(transaction.hash, 27)}</td>
                <td>{makeEllipsis(transaction.signer_id, 27)}</td>
                <td>{makeEllipsis(transaction.receiver_id, 27)}</td>
                <td>{transaction.actions.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button css={moreBtnCss} onClick={handleMoreBtnClick}>
          More Blocks
        </button>
      </DetailTable>
    </div>
  );
}

const transactionsWrapCss = css`
  margin-top: 50px;
`;

export const theadCss = (theme: Theme) => css`
  height: 50px;
  background-color: ${theme.color.orange100};

  th {
    vertical-align: middle;
    text-align: start;
    color: ${theme.color.black600};
    font-weight: 700;
  }
`;

export const itemCss = (theme: Theme) => css`
  cursor: pointer;
  :hover {
    background-color: ${theme.color.black100};
  }
`;

export const moreBtnCss = (theme: Theme) => css`
  width: 100%;
  height: 40px;
  font-size: 18px;
  border-radius: 10px;
  color: white;
  background-color: ${theme.color.orange600};
  margin-bottom: 20px;

  &:hover {
    background-color: ${theme.color.orange700};
  }
`;

export default Transactions;
