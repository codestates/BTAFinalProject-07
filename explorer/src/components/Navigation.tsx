/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import useSearchInput from '@/hooks/useSearchInput';

function Navigation() {
  const location = useLocation();
  const { inputValue, handleInputChange, handleSearchBtnClick } = useSearchInput();

  return (
    <nav css={navCss}>
      <div css={navContentCss}>
        <div css={logoCss}>
          <img width={50} height={50} src={'/logo.png'} />
          <div className="logo-text">
            <span className="logo-text-near">NEAR</span>
            <span className="logo-text-scope">SCOPE</span>
          </div>
        </div>
        <span css={rightWrapCss}>
          {location.pathname !== '/' && (
            <span css={searchInputWrapCss}>
              <input
                css={searchInputCss}
                placeholder={'Search by Account ID / Txn Hash / Block'}
                value={inputValue}
                onChange={handleInputChange}
              />
              <button css={searchBtnCss} onClick={handleSearchBtnClick}>
                <img width={15} height={15} src={'/assets/icon-search.png'} />
              </button>
            </span>
          )}
          <div css={linkGroupCss}>
            <Link to={'/'}>
              <span css={theme => linkCss(theme, location.pathname === '/')}>Home</span>
            </Link>
            <Link to={'/transactions'}>
              <span css={theme => linkCss(theme, location.pathname === '/transactions')}>Transactions</span>
            </Link>
            <Link to={'/blocks'}>
              <span css={theme => linkCss(theme, location.pathname === '/blocks')}>Blocks</span>
            </Link>
          </div>
        </span>
      </div>
    </nav>
  );
}

const rightWrapCss = css`
  display: flex;
  gap: 40px;
`;

const searchInputWrapCss = (theme: Theme) => css`
  display: flex;
  width: 400px;
  height: 30px;
  border: 1px solid ${theme.color.orange200};
  border-radius: 5px;
  overflow: hidden;
`;

const searchInputCss = (theme: Theme) => css`
  flex: 1;
  color: ${theme.color.black600};
  padding: 0 10px;
  height: 100%;
  outline: none;
  border: none;

  &::placeholder {
    color: ${theme.color.black300};
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const searchBtnCss = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: ${theme.color.orange100};
  border-left: 1px solid ${theme.color.orange200};
`;

const navCss = css`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
`;

const navContentCss = css`
  max-width: 1480px;
  flex: 1;
  display: flex;
  padding: 0 30px;
  justify-content: space-between;
  align-items: center;
`;

const logoCss = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: 700;
  gap: 10px;

  .logo-text {
    transform: translateY(4px);
  }
  .logo-text-near {
    color: ${theme.color.black600};
  }
  .logo-text-scope {
    color: ${theme.color.orange600};
  }
`;

const linkGroupCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  transform: translateY(2px);

  a {
    text-decoration-line: none;
  }
`;

const linkCss = (theme: Theme, isActive: Boolean) => css`
  font-size: 20px;
  color: ${isActive ? theme.color.orange600 : theme.color.black600};
`;

export default Navigation;
