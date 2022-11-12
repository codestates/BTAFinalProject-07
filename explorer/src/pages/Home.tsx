/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from 'react';
import useBlocks from '@/hooks/useBlocks';
import useTransactions from '@/hooks/useTransactions';
import { css } from '@emotion/react';
import Panel, { PanelItem } from '@/components/Panel';
import { connect } from 'near-api-js';
import { config } from '@/App';
import { BlockResult } from 'near-api-js/lib/providers/provider';
import { useNavigate } from 'react-router-dom';

/*eslint-disable*/
interface HomeProps {

}

function Home({}: HomeProps) {
  const { blocks, fetchNextBlocks } = useBlocks({ fetchSize: 10 });
  const { transactions } = useTransactions({ initialFetchSize: 10 });
  const [blocksPanelItems, setBlocksPanelItems] = useState<PanelItem[]>([]);
  const transactionsPanelItems: PanelItem[] = useMemo(() => transactions.map(transaction => ({
    iconUrl: '/assets/icon-transaction.png',
    description: {
      first: transaction.hash.slice(0, 10) + '...',
      second: transaction.nonce // TODO: 나중에 타임 스탬프로
    },
    subDescription: {
      first: {
        name: 'From',
        description: transaction.signer_id.slice(0, 12) + (transaction.signer_id.length <= 12 ? '' : '...'),
      },
      second: {
        name: 'To',
        description: transaction.receiver_id.slice(0, 12) + (transaction.receiver_id.length <= 12 ? '' : '...'),
      }
    },
    badgeLabel: String(transaction.nonce).slice(0, 3), // TODO: 추후에 다른 값으로
    onItemClick: () => {
      navigate('/transactions/' + transaction.hash);
    }
  })), [transactions]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const blocksPanelItems: PanelItem[] = []
      for (let i = 0; i < blocks.length; i++) {
        blocksPanelItems.push(await getBlockPanelItem(blocks[i]));
      }
      setBlocksPanelItems(blocksPanelItems);
    })()
  }, [blocks])

  
  async function getBlockPanelItem(block: BlockResult): Promise<PanelItem> {
    const near = await connect(config);
    const chunkHashArr = block.chunks.map(({ chunk_hash }) => chunk_hash);
    const chunkDetails = await Promise.all(chunkHashArr.map(chunk => near.connection.provider.chunk(chunk)));
    const transactions = chunkDetails.flatMap(chunk => chunk.transactions || []);

    return {
      iconUrl: '/assets/icon-block.png',
      description: {
        first: block.header.hash.slice(0, 10) + (block.header.hash.length <= 10 ? '' : '...'),
        second: block.header.timestamp.toString().slice(0, 10),
      },
      subDescription: {
        first: {
          name: 'Author',
          description: block.author.slice(0, 12) + (block.author.length <= 12 ? '' : '...'),
        },
        second: {
          name: 'Txn',
          description: transactions.length.toString(),
        }
      },
      badgeLabel: Number(block.header.gas_price) / 10000000 + ' Tgas',
      onItemClick: () => {
        navigate('/blocks/' + block.header.hash);
      }
    }
  }
  

  useEffect(() => {
    fetchNextBlocks();
  }, [])


  return (
    <div css={homeCss}>
      <p css={searchTextCss}> Let's scope NEAR out </p>
      <input css={searchInputCss}/>
      <section css={panelSectionCss}>
        <Panel title={'Blocks'} titleIconUrl={'/assets/icon-blocks.png'} items={blocksPanelItems} buttonText={'View All Blocks'} onButtonClick={() => navigate('/blocks')}/>
        <Panel title={'Transactions'} titleIconUrl={'/assets/icon-list.png'} items={transactionsPanelItems} buttonText={'View All Transactions'} onButtonClick={() => navigate('/transactions')}/>
      </section>
    </div>
  );
};

const homeCss = css`
  padding-top: 50px;
`

const searchTextCss = css`
  font-size: 36px;
  font-weight: 500;
  color: white;
`

const searchInputCss = css`
  margin-top: 40px;
  height: 80px;
  width: 100%;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`

const panelSectionCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 60px;
  height: 700px;
`

export default Home;

// useEffect(() => {
//   getTransactions();
//
//
//
//   async function getTransactions(amount: number = 10) {
//     const near = await connect(config);
//
//     const lastBlock = await getBlockByID();
//     const blockHashArr = [lastBlock.header.hash];
//     let prevBlockHash = lastBlock.header.prev_hash;
//
//     for (let count = amount - 1; count > 0; count--) {
//       const prevBlock = await getBlockByID(prevBlockHash);
//       blockHashArr.push(prevBlock.header.hash);
//       prevBlockHash = prevBlock.header.prev_hash;
//     }
//
//     // returns block details based on hashes in array
//     const blockDetails: BlockResult[] = await Promise.all(
//       blockHashArr.map((blockId) =>
//         near.connection.provider.block({
//           blockId,
//         })
//       )
//     );
//
//     // returns an array of chunk hashes from block details
//     const chunkHashArr = blockDetails.flatMap((block) =>
//       block.chunks.map(({ chunk_hash }) => chunk_hash)
//     );
//
//     //returns chunk details based from the array of hashes
//     const chunkDetails = await Promise.all(
//       chunkHashArr.map(chunk => near.connection.provider.chunk(chunk))
//     );
//
//     // checks chunk details for transactions
//     // if there are transactions in the chunk we
//     // find ones associated with passed accountId
//     const transactions = chunkDetails.flatMap((chunk) =>
//       chunk.transactions || []
//     );
//
//     console.log("MATCHING TRANSACTIONS: ", transactions);
//   }
// }, [])