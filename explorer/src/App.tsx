/** @jsxImportSource @emotion/react */
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '@/redux/store';
import theme from '@/styles/theme';
import GlobalStyle from '@/styles/global';
import Router from '@/route';
import { keyStores } from 'near-api-js';

export const keyStore = new keyStores.BrowserLocalStorageKeyStore();

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
