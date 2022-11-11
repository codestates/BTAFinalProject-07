/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import useBlocks from '@/hooks/useBlocks';
import useTransactions from '@/hooks/useTransactions';

/*eslint-disable*/
interface HomeProps {

}

function Home({}: HomeProps) {
  const { blocks, fetchNextBlocks } = useBlocks({ fetchSize: 10 });
  const { transactions } = useTransactions({ initialFetchSize: 10 });

  console.log(blocks);
  console.log('transactions', transactions);

  useEffect(() => {
    fetchNextBlocks();
  }, [])


  return (
    <div>

    </div>
  );
};

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