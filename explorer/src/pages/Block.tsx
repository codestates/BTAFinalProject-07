/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BlockResult, ChunkResult } from 'near-api-js/lib/providers/provider';
import DetailTable from '@/components/DetailTable';
import getBlockDetail from '@/utils/getBlockDetail';
import { css, Theme } from '@emotion/react';
import { connect } from 'near-api-js';
import getConnectConfig from '@/utils/getConnectConfig';

function Block() {
  const params = useParams();
  const navigate = useNavigate();
  const [block, setBlock] = useState<BlockResult | null>(null);
  const [chunkDetails, setChunkDetails] = useState<ChunkResult[]>([]);

  useEffect(() => {
    (async () => {
      const blockId = params?.id;
      if (!blockId) {
        alert('올바르지 않은 접근입니다. 메인으로 돌아갑니다.');
        location.href = '/';
        return;
      }
      try {
        const block = await getBlockDetail(isNaN(Number(blockId)) ? blockId : Number(blockId));
        if (!block) throw Error;
        const near = await connect(getConnectConfig());
        const chunkDetails = await Promise.all(
          block.chunks.map(({ chunk_hash }) => near.connection.provider.chunk(chunk_hash)),
        );
        setBlock(block);
        setChunkDetails(chunkDetails);
      } catch (e) {
        alert('올바르지 않은 접근입니다. 메인으로 돌아갑니다.');
        location.href = '/';
        return;
      }
    })();
  }, []);

  const handleTransactionHashClick = (txnHash: string) => {
    navigate('/transactions/' + txnHash);
  };

  return (
    <div css={blockWrapCss}>
      <DetailTable title="Block Overview" titleIconUrl="/assets/icon-block.png">
        {block && (
          <>
            <colgroup>
              <col width="300px" />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th>Block Height</th>
                <td>{block.header.height}</td>
              </tr>
              <tr>
                <th>Hash</th>
                <td>{block.header.hash}</td>
              </tr>
              <tr>
                <th>Time Stamp</th>
                <td>{new Date(Number(block.header.timestamp.toString().slice(0, 13))).toString()}</td>
              </tr>
              <tr>
                <th>Author</th>
                <td>{block.author}</td>
              </tr>
              <tr>
                <th>Parent Hash</th>
                <td>{block.header.prev_hash}</td>
              </tr>
              <tr>
                <th>Gas Used</th>
                <td>
                  {(Number(block.chunks.reduce((acc, curr) => acc + curr.gas_used, 0)) / 1000000000000).toFixed(2)} Tgas
                </td>
              </tr>
              <tr>
                <th>Gas Limit</th>
                <td>
                  {(Number(block.chunks.reduce((acc, curr) => acc + curr.gas_limit, 0)) / 1000000000000000).toFixed(2)}{' '}
                  Pgas
                </td>
              </tr>
              {chunkDetails
                .flatMap(chunkDetail => chunkDetail.transactions)
                .map((transaction, idx) => (
                  <tr key={transaction.hash} style={idx ? { borderTop: 'none' } : undefined}>
                    <th>{idx === 0 ? 'Transactions' : ''}</th>
                    <td css={transactionsTdCss}>
                      <span onClick={() => handleTransactionHashClick(transaction.hash)}>{transaction.hash}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </>
        )}
      </DetailTable>
    </div>
  );
}

const blockWrapCss = css`
  margin-top: 50px;
`;

const transactionsTdCss = (theme: Theme) => css`
  span {
    font-weight: 700;
    color: ${theme.color.black300};

    &:hover {
      color: ${theme.color.black600};
      cursor: pointer;
    }
  }
`;

export default Block;
