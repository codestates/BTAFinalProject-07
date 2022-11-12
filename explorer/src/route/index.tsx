import { useRoutes } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFoundPage';
import Home from '@/pages/Home';
import Layout from '@/components/Layout';
import Transactions from '@/pages/Transactions';
import Transaction from '@/pages/Transaction';

const Router = () => {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: '/transactions',
          children: [
            { index: true, element: <Transactions /> },
            { path: ':hash', element: <Transaction /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
};

export default Router;
