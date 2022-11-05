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
import CheckMnemonic from './views/CheckMnemonic';
import Dashboard from './views/Dashboard';

const Router = () => {
    const [load, setLoad] = useState(false);
    const history = createMemoryHistory();

    return (
        <BrowserRouter history={history}>
            <Header />
            <Routes>
                <Route path='/' element={<Main />}/>
                <Route path='/dashboard' element={<Dashboard />}/>
                <Route path='/create-password' element={<Password setLoad={setLoad}/>} />
                <Route path='/create-recovery' element={<Recovery setLoad={setLoad}/>} />
                <Route path='/create-mnemonic' element={<Mnemonic setLoad={setLoad}/>} />
                <Route path='/check-mnemonic' element={<CheckMnemonic setLoad={setLoad}/>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default Router;