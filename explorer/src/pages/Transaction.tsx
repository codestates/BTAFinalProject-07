/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FinalExecutionOutcome } from 'near-api-js/lib/providers';
import { BlockResult, Transaction as TransactionType } from 'near-api-js/lib/providers/provider';
import getTransactionDetail from '@/utils/getTransactionDetail';
import DetailTable from '@/components/DetailTable';
import getBlockDetail from '@/utils/getBlockDetail';
import { css, Theme } from '@emotion/react';

function Transaction() {
  const params = useParams();
  const [transaction, setTransaction] = useState<FinalExecutionOutcome | null>(null);
  const [block, setBlock] = useState<BlockResult | null>(null);

  useEffect(() => {
    (async () => {
      const transactionHash = params?.hash;
      if (!transactionHash) {
        alert('올바르지 않은 접근입니다. 메인으로 돌아갑니다.');
        location.href = '/';
        return;
      }
      try {
        const transaction = await getTransactionDetail(transactionHash);
        if (!transaction) throw Error;
        setTransaction(transaction);
      } catch (e) {
        alert('올바르지 않은 접근입니다. 메인으로 돌아갑니다.');
        location.href = '/';
        return;
      }
    })();
  }, []);

  useEffect(() => {
    if (!transaction) return;
    (async () => {
      const block = await getBlockDetail((transaction.transaction_outcome as any).block_hash);
      setBlock(block);
    })();
  }, [transaction]);

  console.log(transaction);
  console.log(block);

  return (
    <div css={transactionWrapCss}>
      <DetailTable title="Transaction Overview" titleIconUrl="/assets/icon-transaction.png">
        {transaction && (
          <>
            <colgroup>
              <col width="300px" />
              <col />
            </colgroup>
            <tbody>
              <>
                <tr>
                  <th>Txn Hash</th>
                  <td>{(transaction.transaction as TransactionType).hash}</td>
                </tr>
                {block && (
                  <>
                    <tr style={{ borderTop: 'none' }}>
                      <th>Block Height</th>
                      <td>{block.header.height}</td>
                    </tr>
                    <tr style={{ borderTop: 'none' }}>
                      <th>Time Stamp</th>
                      <td>{new Date(Number(block.header.timestamp.toString().slice(0, 13))).toString()}</td>
                    </tr>
                  </>
                )}
                {(transaction.transaction as TransactionType).actions.map((action, idx) => (
                  <tr key={idx} style={idx ? { borderTop: 'none' } : undefined}>
                    <th>{idx === 0 ? 'Actions' : ''}</th>
                    <td css={actionTdCss}>
                      <span>{typeof action === 'string' ? action : Object.keys(action).join('')}</span>
                    </td>
                  </tr>
                ))}
                <tr>
                  <th>From</th>
                  <td>{(transaction.transaction as TransactionType).signer_id}</td>
                </tr>
                <tr style={{ borderTop: 'none' }}>
                  <th>To</th>
                  <td>{(transaction.transaction as TransactionType).receiver_id}</td>
                </tr>
              </>
            </tbody>
          </>
        )}
      </DetailTable>
    </div>
  );
}

const transactionWrapCss = css`
  margin-top: 50px;
`;

const actionTdCss = (theme: Theme) => css`
  span {
    font-weight: 700;
    color: ${theme.color.black300};
  }
`;

export default Transaction;
