import { useLocation, useNavigate } from "react-router-dom";
import { connect, keyStores } from 'near-api-js';
import { decryptMessage } from '../utils/util';
import Loading from '../Components/Loading';
import { useState } from "react";
import '../css/App.css'

const CheckMnemonic = (props) => {
    const [inputMnemonic, setInputMnemonic] = useState("");
    const [chkValue, setChkValue] = useState(false);
    const movePage = (route) => navigate(route);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const locationBack = () => {
        movePage('/create-password');
        return;
    }

    const compareMnemonic = async () => {
        const password = location.state.hashPwd;
        const decryptMnemonic = decryptMessage(location.state.hashMnemonic, password);
        
        // Compare Value
        if (decryptMnemonic !== inputMnemonic) {
            setChkValue(true);
            setTimeout(()=> {setChkValue(false)}, 1000)
            return;
        }

        // Get User Info
        setLoad(true);
        const userInfo = [];
        const existedUser = JSON.parse(localStorage.getItem('userInfo'));
        const accountNum = existedUser ? existedUser.length + 1 : 1;
        const accountID = "account" + accountNum;

        const newUser = {
            name: accountID,
            account : {
                address: location.state.address,
                hashPwd: location.state.hashPwd,
                hashSecret: location.state.hashPrivate,
                hashMnemonic: location.state.hashMnemonic
            }
        }

        // Set User Info
        if (existedUser) { userInfo.push(...existedUser); userInfo.push(newUser);
        } else { userInfo.push(newUser)}
        localStorage.setItem('wallet', true);
        localStorage.setItem('current', JSON.stringify(newUser));
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        // Create Account
        const near = await connect({
            networkId: "testnet",
            keyStore: new keyStores.InMemoryKeyStore(),
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://wallet.testnet.near.org",
            helperUrl: "https://helper.testnet.near.org",
            explorerUrl: "https://explorer.testnet.near.org",
        })

        const testnetAccount = accountID + ".testnet";
        const accountInfo = await near.account(testnetAccount);
        await near.createAccount(testnetAccount, location.state.address);
        
        
        setTimeout(() => {
            setLoad(false);
            alert("계정생성 완료.");
            navigate('/dashboard');
        }, 1000)
    }

    return <>
        <div style={{padding:"0 5px"}}>
            <div className="Title_div">
                <button className="Button_Back" onClick={locationBack}>◀</button>
                <p className="Title">복구 구문 확인</p>
            </div>
            <div style={{padding:"0 15px", textAlign:"center"}}>
                <p style={{paddingBottom:"20px"}}>발급받은 복구 구문을 입력해주세요.</p>
                <input value={inputMnemonic} onChange={(e) => {setChkValue(false); setInputMnemonic(e.target.value)}} type={"text"} style={{width:"300px", height:"50px", border:"1px solid #D3D3D3", borderRadius:"10px", padding:"10px", fontSize:"15px"}} />
                <p style={{transition:"all 0.5s", paddingLeft:"10px", margin:"0px", color:(chkValue ? "red" : "white")}}>복구 구문이 일치하지 않습니다.</p>
                <button style={{marginTop:"30px"}} className="Button_Filled" onClick={() => compareMnemonic()}>복구 구문 확인</button>
            </div>
        </div>
        {<Loading load={load}/>}
    </>
}

export default CheckMnemonic;