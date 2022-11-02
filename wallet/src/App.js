import { useState } from 'react';
import './css/App.css';

import Main from './views/Main';
import Password from './views/Password';
import Recovery from './views/Recovery';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  const [route, setRoute] = useState('/');

  return (
    <>
      <Header />
      <div>
        <Main     route={route} setRoute={setRoute}/>
        <Password route={route} setRoute={setRoute}/>
        <Recovery route={route} setRoute={setRoute}/>
      </div>
      <Footer />
    </>
  );
}

export default App;
