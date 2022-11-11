import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';

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
import CreateAccount from './views/CreateAccount';
import SendToken from './views/SendToken';

const Router = () => {
    const history = createMemoryHistory();

    return (
        <BrowserRouter history={history}>
            <Header />
            <Routes>
                <Route path='/' element={<Main />}/>
                <Route path='/dashboard' element={<Dashboard />}/>
                <Route path='/send-token' element={<SendToken />} />
                <Route path='/create-password' element={<Password />} />
                <Route path='/create-recovery' element={<Recovery />} />
                <Route path='/create-mnemonic' element={<Mnemonic />} />
                <Route path='/import-account' element={<ImportAccount />} />
                <Route path='/check-mnemonic' element={<CheckMnemonic />} />
                <Route path='/create-account' element={<CreateAccount />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default Router;