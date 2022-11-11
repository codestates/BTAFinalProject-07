import { useRoutes } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFoundPage';
import Home from '@/pages/Home';
import Layout from '@/components/Layout';

const Router = () => {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [{ index: true, element: <Home /> }],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
};

export default Router;
