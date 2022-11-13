/** @jsxImportSource @emotion/react */
/* eslint-disable */
import {useNavigate} from 'react-router-dom';
import DetailTable from '@/components/DetailTable';
import {css, Theme} from '@emotion/react';
import useBlocks from '@/hooks/useBlocks';
import {itemCss, moreBtnCss, theadCss} from '@/pages/Transactions';
import makeEllipsis from '@/utils/makeEllipsis';
import getPastDateDiff from '@/utils/getDateDiff';

function Blocks() {
  const navigate = useNavigate();
  const { blocks, fetchNextBlocks } = useBlocks({fetchSize: 20})

  const handleMoreBtnClick = () => {
    fetchNextBlocks();
  };

  const handleBlockItemClick = (blockId: string) => {
    navigate('/blocks/' + blockId);
  };

  return (
    <div css={blocksWrapCss}>
      <DetailTable title={'Blocks'} titleIconUrl={'/assets/icon-blocks.png'} isIconRounded={false}>
        <table>
          <colgroup>
            <col width="2%" />
            <col width="15%" />
            <col width="30%" />
            <col width="15%" />
            <col width="15%" />
            <col />
          </colgroup>
          <thead css={theadCss}>
            <th></th>
            <th>BLOCK HEIGHT</th>
            <th>AUTHOR</th>
            <th>GAS USED</th>
            <th>GAS LIMIT</th>
            <th>AGO</th>
          </thead>
          <tbody>
          {blocks.map(block => (
            <tr
              key={block.header.hash}
              css={itemCss}
              onClick={() => handleBlockItemClick(block.header.hash)}
            >
              <td></td>
              <td>{block.header.height}</td>
              <td>{makeEllipsis(block.author, 30)}</td>
              <td>{(Number(block.chunks.reduce((acc, curr) => acc + curr.gas_used, 0)) / 1000000000000).toFixed(2)} Tgas </td>
              <td>{(Number(block.chunks.reduce((acc, curr) => acc + curr.gas_limit, 0)) / 1000000000000000).toFixed(2)} Pgas </td>
              <td>{getPastDateDiff(new Date(Number(block.header.timestamp.toString().slice(0, 13))))}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <button css={moreBtnCss} onClick={handleMoreBtnClick}>
          More Transactions
        </button>
      </DetailTable>
    </div>
  );
};

const blocksWrapCss = css`
  margin-top: 50px;
`;


export default Blocks;