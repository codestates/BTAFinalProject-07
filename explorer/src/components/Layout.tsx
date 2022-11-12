/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { css, Theme } from '@emotion/react';

/*eslint-disable*/
interface LayoutProps {
  
}

function Layout({}: LayoutProps) {
  return (
    <div css={layoutCss}>
      <Navigation/>
      <main css={layoutMainCss}>
        <div css={mainContentCss}>
          <Outlet/>
        </div>
      </main>
      <footer css={footerCss}>

      </footer>
    </div>
  );
};

const layoutCss = css`
  width: 100vw;
  height: 100vh;
  background-color: white;
`

const footerCss = css`
  width: 100%;
  height: 200px;
`

const layoutMainCss = (theme: Theme) => css`
  display: flex;
  position: relative;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 350px;
    background-color: ${theme.color.orange600};
    z-index: 0;
  }
`

const mainContentCss = css`
  width: 100%;
  max-width: 1480px;
  min-width: 1400px;
  padding: 0 30px;
  z-index: 1;
`

export default Layout;