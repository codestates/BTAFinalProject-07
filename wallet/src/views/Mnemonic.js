import { generateSeed, encryptMessage } from '../utils/util';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/App.css';

const Mnemonic = (props) => {
    const navigate = useNavigate();
    const movePage = (route) => navigate(route);
    const [mnemonic, setMnemonic] = useState("");
    const [copyCheck, setCopyCheck] = useState(false);
    const [encryptedData, setEncryptedData] = useState(null);

    useEffect(()=>{
        setMnemonicPhrase();
    }, []);

    const setMnemonicPhrase = async () => {
        const {seedPhrase, address, secret} = generateSeed();
        setMnemonic(seedPhrase);
        const password = localStorage.getItem("pwd");
        const cipherMnemonic = encryptMessage(seedPhrase, password);
        const cipherPrivate = encryptMessage(secret, password);
        setEncryptedData({data:cipherMnemonic, address:address, secretKey:cipherPrivate});
    };

    const locationBack = () => {
        movePage('/create-password');
        return;
    }

    const clipboardCopy = () => {
        setCopyCheck(true);
        navigator.clipboard.writeText(mnemonic);
        setTimeout(() => {setCopyCheck(false)}, 1000);
    }

    const goToCheckMnemonic = () => {
        navigate("/check-mnemonic", {state: {...encryptedData}});
    }

    return <>
        <div style={{padding:"0 5px"}}>
            <div className="Title_div">
                <button className="Button_Back" onClick={locationBack}>◀</button>
                <p className="Title">비밀 복구 구문</p>
            </div>
            <div style={{padding:"0 15px", textAlign:"center"}}>
                <p>비밀 복구 구문을 이용하면 계정을 쉽게 <br />백업하고 복구할 수 있습니다. 이 구문을 <br />절대로 외부에 공개하지 마세요.</p>
                <div style={{padding:"0px 20px", margin:"20px 0px", border:"1px solid #D3D3D3", borderRadius:"10px"}}>
                    <p style={{fontSize:"20px"}}>{mnemonic}</p>
                </div>
            </div>
            <div style={{textAlign:"center"}}>
                <button className='Button_Filled' style={{width:"150px", margin:"0px 5px", fontSize:"16px"}} onClick={() => clipboardCopy()}>클립보드 복사</button>
                <button className='Button_Main' style={{width:"150px", margin:"0px 5px", fontSize:"16px"}} onClick={() => goToCheckMnemonic()}>다음</button>
                <p style={{transition:"all 0.3s", color:(copyCheck ? "#EA973E" : "white")}}>복사되었습니다.</p>
            </div>
        </div>
    </>
}

export default Mnemonic;