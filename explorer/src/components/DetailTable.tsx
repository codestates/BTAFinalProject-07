/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import { ReactNode } from 'react';
import theme from '@/styles/theme';

interface DetailTableProps {
  title: string;
  titleIconUrl: string;
  isIconRounded?: boolean;
  children: ReactNode;
}

function DetailTable({ title, titleIconUrl, isIconRounded = true, children }: DetailTableProps) {
  return (
    <div css={detailTableWrapCss}>
      <header>
        {isIconRounded ? (
          <div css={iconWrapCss}>
            <img width={30} height={30} src={titleIconUrl} />
          </div>
        ) : (
          <img width={40} height={40} src={titleIconUrl} />
        )}

        <span css={headerTextCss}>{title}</span>
      </header>
      <table>{children}</table>
    </div>
  );
}

const detailTableWrapCss = css`
  padding: 0 30px;
  background-color: white;
  box-shadow: 0px 4px 4px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  min-height: 100px;

  header {
    display: flex;
    gap: 20px;
    align-items: center;
    height: 90px;
  }

  table {
    width: 100%;

    tr {
      height: 65px;
      border-top: 1px solid ${theme.color.black300};

      & > th,
      td {
        font-size: 20px;
        text-align: start;
        vertical-align: middle;
        color: ${theme.color.black600};
      }

      th {
        color: ${theme.color.black300};
      }
    }
  }
`;

const iconWrapCss = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  border-radius: 100%;
  background-color: ${theme.color.orange100};
`;

const headerTextCss = (theme: Theme) => css`
  font-size: 32px;
  color: ${theme.color.black600};
  transform: translateY(3px);
`;

export default DetailTable;
