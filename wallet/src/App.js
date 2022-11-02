import { useState } from 'react';
import './css/App.css';

import Main from './views/Main';
import Password from './views/Password';
import Recovery from './views/Recovery';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Loading from './Components/Loading';

function App() {
  const [route, setRoute] = useState('/');
  const [load, setLoad] = useState(false);

  return (
    <>
      <Header />
      <div>
        <Main     route={route} setRoute={setRoute}/>
        <Password route={route} setRoute={setRoute} load={load} setLoad={setLoad}/>
        <Recovery route={route} setRoute={setRoute}/>
      </div>
      <Footer />
      <Loading load={load} setLoad={setLoad}/>
    </>
  );
}

export default App;
