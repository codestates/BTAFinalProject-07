import { useLocation, useNavigate } from "react-router-dom";
import { decryptMessage } from '../utils/util';
import { useState } from "react";
import '../css/App.css'

const CheckMnemonic = () => {
    const [inputMnemonic, setInputMnemonic] = useState("");
    const [chkValue, setChkValue] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const locationBack = () => {
        navigate('/create-password');
        return;
    }

    const compareMnemonic = async () => {
        const password = localStorage.getItem('pwd');
        const decryptMnemonic = decryptMessage(location.state.hashMnemonic, password);
        
        // Compare Value
        if (decryptMnemonic !== inputMnemonic) {
            setChkValue(true);
            setTimeout(()=> {setChkValue(false)}, 1000)
            return;
        }

        navigate('/create-account', {state: {...location.state}});
    }

    return <>
        <div style={{padding:"0 5px"}}>
            <div className="Title_div">
                <button className="Button_Back" onClick={locationBack}>◀</button>
                <p className="Title">복구 구문 확인</p>
            </div>
            <div style={{padding:"0 15px", textAlign:"center"}}>
                <p style={{paddingBottom:"20px"}}>발급받은 복구 구문을 입력해주세요.</p>
                <input value={inputMnemonic} onChange={(e) => {setChkValue(false); setInputMnemonic(e.target.value)}} type={"text"} className='Input_Mnemonic' />
                <p style={{transition:"all 0.5s", paddingLeft:"10px", margin:"0px", color:(chkValue ? "red" : "white")}}>복구 구문이 일치하지 않습니다.</p>
                <button style={{marginTop:"30px"}} className="Button_Filled" onClick={() => compareMnemonic()}>복구 구문 확인</button>
            </div>
        </div>
        
    </>
}

export default CheckMnemonic;