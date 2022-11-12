/** @jsxImportSource @emotion/react */
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '@/redux/store';
import theme from '@/styles/theme';
import GlobalStyle from '@/styles/global';
import Router from '@/route';
import { ConnectConfig, keyStores } from 'near-api-js';

const keyStore = new keyStores.BrowserLocalStorageKeyStore();

export const config: ConnectConfig = {
  keyStore,
  networkId: 'testnet',
  nodeUrl: process.env.TEST_NET_ARCHIVAL_RPC_URL as string,
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
