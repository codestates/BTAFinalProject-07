import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { useState } from 'react';

// import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter as BrowserRouter} from 'react-router-dom';

import Main from './views/Main';
import Password from './views/Password';
import Recovery from './views/Recovery';
import Mnemonic from './views/Mnemonic';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Dashboard from './views/Dashboard';
import CheckMnemonic from './views/CheckMnemonic';
import ImportAccount from './views/ImportAccount';

const Router = () => {
    const history = createMemoryHistory();

    return (
        <BrowserRouter history={history}>
            <Header />
            <Routes>
                <Route path='/' element={<Main />}/>
                <Route path='/dashboard' element={<Dashboard />}/>
                <Route path='/create-password' element={<Password />} />
                <Route path='/create-recovery' element={<Recovery />} />
                <Route path='/create-mnemonic' element={<Mnemonic />} />
                <Route path='/import-account' element={<ImportAccount />} />
                <Route path='/check-mnemonic' element={<CheckMnemonic />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default Router;