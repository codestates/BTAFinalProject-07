import { connect, keyStores, KeyPair } from 'near-api-js';
import { parseSeedPhrase } from 'near-seed-phrase';
import { FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import { encryptMessage, parseSeed } from '../utils/util';
import Loading from '../Components/Loading';
import CryptoJS from 'crypto-js';
import { useState } from "react";
import '../css/App.css';

const Recovery = () => {
    const [inputMnemonic, setInputMnemonic] = useState('');
    const [chkMnemonic, setChkMnemonic] = useState(false);
    const [load, setLoad] = useState(false);
    const [pwd, setPwd] = useState("");
    const [chk, setChk] = useState("");
    const navigate = useNavigate();

    const locationBack = () => {
        navigate('/');
        return;
    }

    const recoverAccount = async () => {
        if (!inputMnemonic || !pwd || pwd !== chk) return;
        if (inputMnemonic.split(' ').length !== 12) {
            setChkMnemonic(true); setInputMnemonic('');
            setTimeout(() => setChkMnemonic(false), 1000);
            return false;
        }

        setLoad(true);
        const password = CryptoJS.SHA256(pwd).toString()
        const {mnemonic, secretKey, address} = parseSeed(inputMnemonic);
        const hashPrivate = encryptMessage(secretKey, password);
        const hashMnemonic = encryptMessage(mnemonic, password);
        const data = {
            address:address, 
            hashPrivate:hashPrivate,
            hashMnemonic:hashMnemonic, 
        }

        setLoad(false);
        localStorage.setItem('pwd', password);
        navigate("/create-account", {state: {...data}, type:'recovery'});
    }

    return <>
        <div style={{padding:"0 5px"}}>
            <div className="Title_div">
                <button className="Button_Back" onClick={locationBack}>◀</button>
                <p className="Title">계정 복구 진행</p>
            </div>
            <div style={{padding:"0 15px", textAlign:"center"}}>
                <p>발급받은 복구 구문을 입력해주세요.</p>
                <div>
                    <div style={{marginTop:"30px"}}>
                        <div>
                            <div style={{textAlign:"left", padding:"5px 15px"}}>복구 구문</div>
                            <input value={inputMnemonic} type={"text"} className="Input" onChange={(e) => {setInputMnemonic(e.target.value);}}></input>
                        </div>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <div>
                            <div style={{textAlign:"left", padding:"5px 15px"}}>새 비밀번호</div>
                            <input value={pwd} type={"password"} className="Input" onChange={(e) => {setPwd(e.target.value);}}></input>
                        </div>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <div>
                            <div style={{textAlign:"left", padding:"5px 15px"}}>비밀번호 확인</div>
                            <input value={chk} type={"password"} className="Input" onChange={(e) => setChk(e.target.value)} style={{borderColor:(pwd !== chk ? "red" : "")}}></input>
                        </div>
                    </div>
                </div>
                <div style={{textAlign:"center", marginTop:"40px"}}>
                    <p style={{transition:"all 0.5s", paddingLeft:"10px", fontWeight:'bold', margin:"0px", color:(chkMnemonic ? "red" : "white")}}>유효하지 않은 복구 구문입니다.</p>
                    <button className="Button_Filled" onClick={() => recoverAccount()} style={{backgroundColor:(!inputMnemonic || !pwd || pwd !== chk)?"#D3D3D3":"#EA973E"}}>복구</button>
                </div>
            </div>
        </div>
        {<Loading load={load}/>}
    </>
}

export default Recovery;