// import { OPEN_IN_WEB, STORAGE } from '../utils/Constants';
// import { generateSeed } from '../utils/util';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/App.css';

const Mnemonic = (props) => {
    const navigate = useNavigate();
    const movePage = (route) => navigate(route);
    const [mnemonic, setMnemonic] = useState("");
    const [password, setPassword] = useState("");

    // useEffect(()=>{
    //     setMnemonicPhrase();
    // }, []);

    // const setMnemonicPhrase = async () => {
    //     const {seedPhrase, address, secret} = generateSeed();
    //     setMnemonic(seedPhrase);

    //     if (OPEN_IN_WEB) {setPassword(JSON.parse(localStorage.getItem('hashedPassword')));}
    //     else {setPassword(JSON.parse(STORAGE?.get(['hashedPassword'])))}
    // };

    const locationBack = () => {
        setMnemonic("");
        movePage('/create-password');
        return;
    }

    return <>
        <div style={{padding:"0 5px"}}>
            <div className="Title_div">
                <button className="Button_Back" onClick={locationBack}>◀</button>
                <p className="Title">비밀 복구 구문</p>
            </div>
            <div style={{padding:"0 15px", textAlign:"center"}}>
                <p>비밀 복구 구문을 이용하면 계정을 쉽게 <br />백업하고 복구할 수 있습니다. 이 구문을 <br />절대로 외부에 공개하지 마세요.</p>
                <div style={{width:"250px"}}>
                    <p>{mnemonic}</p>   
                </div>
            </div>
        </div>
    </>
}

export default Mnemonic;