import { useLocation, useNavigate } from "react-router-dom";
import { connect, keyStores } from 'near-api-js';
import { FiAlertCircle } from 'react-icons/fi';
import { decryptMessage } from '../utils/util';
import Loading from '../Components/Loading';
import { useState } from "react";
import '../css/App.css'

const CheckMnemonic = (props) => {
    const [inputMnemonic, setInputMnemonic] = useState("");
    const [chkValue, setChkValue] = useState(false);
    const [alert, setAlert] = useState(false);
    const [load, setLoad] = useState(false);
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

        // Get User Info
        setLoad(true);
        const newUser = {
            name: 'account1',
            account : {
                address: location.state.address,
                hashSecret: location.state.hashPrivate,
                hashMnemonic: location.state.hashMnemonic
            }
        }

        // Set User Info
        localStorage.setItem('wallet', true);
        localStorage.setItem('current', JSON.stringify(newUser));
        localStorage.setItem('userInfo', JSON.stringify([newUser]));

        // Create Account
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
        await near.createAccount(testnetAccount, location.state.address);
        
        setLoad(false);
        setAlert(true);
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
        {<Loading load={load}/>}

        {/* Alert Area Start ========== ========== ========== ========== ==========*/}
        <div style={{display:(alert ? 'block' : 'none')}}>
            <div className='Confirm-Alert-wrap' style={{opacity:'70%'}}/>
            <div className='Confirm-Alert-content'>
                <FiAlertCircle size={60} color='#EA973E' style={{paddingTop:'10px'}}/>
                <p className='Message'>계정 생성 완료.</p>
                <div style={{paddingTop:'20px'}}>
                    <button className='Create' onClick={() => navigate('/dashboard')}>확인</button>
                </div>
            </div>
        </div>
        {/* Alert Area End ========== ========== ========== ========== ==========*/}
    </>
}

export default CheckMnemonic;