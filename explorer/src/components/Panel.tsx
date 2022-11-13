/** @jsxImportSource @emotion/react */
/*eslint-disable*/
import {css, Theme} from '@emotion/react';
import {MouseEventHandler} from 'react';
import {BallTriangle} from 'react-loader-spinner';

export interface PanelItem {
  iconUrl: string;
  description: {
    first: string;
    second?: string;
  },
  subDescription: {
    first: {
      name: string;
      description: string;
    },
    second: {
      name: string;
      description: string;
    }
  }
  badgeLabel: string;
  onItemClick?: MouseEventHandler<HTMLDivElement>;
}

interface PanelProps {
  title: string;
  titleIconUrl: string;
  items: PanelItem[];
  buttonText: string;
  onButtonClick: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
}

function Panel({title, titleIconUrl, items, buttonText, isLoading = false, onButtonClick}: PanelProps) {
  return (
    <div css={panelCss}>
      <header>
        <img width={40} height={40} src={titleIconUrl} />
        <span>{title}</span>
      </header>
      <main>
        {
          isLoading
            ? <span css={loaderCss}><BallTriangle ariaLabel="loading-indicator" color={'#FF7915'} width={60} height={60}/></span>
            : items.map(({ iconUrl, description, subDescription, badgeLabel, onItemClick }, idx) =>
                <div key={idx} css={panelItemCss} onClick={onItemClick}>
                  <div className='panel-item-icon'>
                    <img width={40} height={40} src={iconUrl} />
                  </div>
                  <div className='panel-item-descriptions'>
                    <span>
                      {description.first}
                    </span>
                    <span>
                      {description.second ?? ''}
                    </span>
                  </div>
                  <div className='panel-item-sub-descriptions'>
                    <section>
                      <span>
                        {subDescription.first.name}
                      </span>
                      <span>
                        {subDescription.second.name}
                      </span>
                    </section>
                    <section>
                      <span>
                        {subDescription.first.description}
                      </span>
                      <span>
                        {subDescription.second.description}
                      </span>
                    </section>
                  </div>
                  <div className='panel-item-badge'>
                    {badgeLabel}
                  </div>
                </div>
            )
        }
      </main>
      <footer>
        <button onClick={onButtonClick}>{buttonText}</button>
      </footer>
    </div>
  );
};

const loaderCss = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const panelItemCss = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 90px;
  
  &:hover {
    background-color: ${theme.color.black100};
    cursor: pointer;
  }
  
  .panel-item {
    &-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 70px;
      border-radius: 100%;
      background-color: ${theme.color.orange100};
    }
    
    &-descriptions {
      display: flex;
      width: 130px;
      flex-direction: column;
      gap: 5px;
      
      
      span:first-child {
        font-size: 20px;
        color: ${theme.color.black600};
      }
      span:last-child {
        font-size: 16px;
        color: ${theme.color.black300}
      }
    }
    
    &-sub-descriptions {
      display: flex;
      font-size: 20px;
      width: 210px;
      gap: 10px;
      
      span {
        color: ${theme.color.black600};
      }
      
      section {
        
        display: flex;
        flex-direction: column;
        gap: 5px;
        
        &:first-child {
          align-items: end;
          span {
            color: ${theme.color.black300};
          }
        }
      }
    }
    
    &-badge {
      display: flex;
      padding-right: 10px;
      justify-content: end;
      align-items: center;
      width: 90px;
      height: 30px;
      background: url('/assets/badge.png') no-repeat center/100% ;
    }
  }
`

const panelCss = (theme: Theme) => css`
  width: 660px;
  height: 700px;
  background-color: white;
  padding: 0 30px;

  box-shadow: 0px 4px 4px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  
  & > header {
    display: flex;
    align-items: center;
    height: 82px;

    span {
      margin-left: 20px;
      font-size: 30px;
      transform: translateY(2px);
      color: ${theme.color.black600};
    }
  }
  
  & > main {
    position: relative;
    height: 540px;
    border-top: 1px solid ${theme.color.orange600};
    border-bottom: 1px solid ${theme.color.orange600};
    overflow: auto;
  }
  
  & > footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 78px;
    
    button {
      background-color: ${theme.color.orange600};
      width: 100%;
      height: 50px;
      border-radius: 5px;
      color: white;
      font-size: 20px;
      &:hover {
        background-color: ${theme.color.orange800};
      }
    }
  }
`

export default Panel;