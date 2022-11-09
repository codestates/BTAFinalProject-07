import { connect, keyStores, KeyPair } from 'near-api-js';
import { parseSeedPhrase } from 'near-seed-phrase';
import { FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import { encryptMessage } from '../utils/util';
import Loading from '../Components/Loading';
import CryptoJS from 'crypto-js';
import { useState } from "react";
import '../css/App.css';

const Recovery = () => {
    const [inputMnemonic, setInputMnemonic] = useState('');
    const [chkMnemonic, setChkMnemonic] = useState(false);
    const [alert, setAlert] = useState(false);
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
        const { secretKey, seedPhrase } = parseSeedPhrase(inputMnemonic);
        const keyPair = KeyPair.fromString(secretKey);
        const address = keyPair.publicKey.toString();
        const secret = keyPair.secretKey;

        const password = CryptoJS.SHA256(pwd).toString()
        const encryptPrivated = encryptMessage(secret, password);
        const encryptMnemonic = encryptMessage(seedPhrase, password);

        const newUser = {
            name: 'account1',
            account : {
                address: address,
                hashSecret: encryptPrivated,
                hashMnemonic: encryptMnemonic
            }
        }

        localStorage.setItem('wallet', true);
        localStorage.setItem('pwd', password);
        localStorage.setItem('current', JSON.stringify(newUser));
        localStorage.setItem('userInfo', JSON.stringify([newUser]));

        const near = await connect({
            networkId: "testnet",
            keyStore: new keyStores.InMemoryKeyStore(),
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://wallet.testnet.near.org",
            helperUrl: "https://helper.testnet.near.org",
            explorerUrl: "https://explorer.testnet.near.org",
        })

        const testnetAccount = "account1.testnet";
        const accountInfo = await near.account(testnetAccount);
        await near.createAccount(testnetAccount, address);

        setLoad(false);
        setAlert(true);
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

        {/* Alert Area Start ========== ========== ========== ========== ==========*/}
        <div style={{display:(alert ? 'block' : 'none')}}>
            <div className='Confirm-Alert-wrap' style={{opacity:'70%'}}/>
            <div className='Confirm-Alert-content'>
                <FiAlertCircle size={60} color='#EA973E' style={{paddingTop:'10px'}}/>
                <p className='Message'>계정 복구 완료</p>
                <div style={{paddingTop:'20px'}}>
                    <button className='Create' onClick={() => {setAlert(false); navigate('/dashboard');}}>확인</button>
                </div>
            </div>
        </div>
        {/* Alert Area End ========== ========== ========== ========== ==========*/}
    </>
}

export default Recovery;