/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { css } from '@emotion/react';

/*eslint-disable*/
interface LayoutProps {
  
}

function Layout({}: LayoutProps) {
  return (
    <div css={layoutCss}>
      <Navigation/>
      <main>
        <Outlet/>
      </main>
    </div>
  );
};

const layoutCss = css`
  width: 100vw;
  height: 100vh;
  background-color: white;
`

export default Layout;