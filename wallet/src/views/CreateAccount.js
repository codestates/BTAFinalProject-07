import { useLocation, useNavigate } from 'react-router-dom';
import { connect, keyStores } from 'near-api-js';
import Loading from '../Components/Loading';
import Alert from '../Components/Alert';
import { useState } from 'react';
import '../css/App.css';

const CreateAccount = () => {
    const [accountID, setAccountID] = useState('');
    const [message, setMessage] = useState(false);
    const [alert, setAlert] = useState(false);
    const [check, setCheck] = useState(false);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const locationBack = () => {
        navigate('/');
        return;
    }

    const validateCheck = () => {
        const info = JSON.parse(localStorage.getItem('userInfo'));
        let validate = true; if (info) info.forEach(item => {
            if (item.name === accountID) {
                setCheck(true);
                validate = false;
                setTimeout(() => setCheck(false), 1000);
                return false;
            }
        });

        if (validate) {
            fnCreateAccount();
        }
    }

    const fnCreateAccount = async () => {
        if (!accountID) {
            return false;
        }

        setLoad(true);
        const userInfo = [];
        const info = JSON.parse(localStorage.getItem('userInfo'));
        if (info) userInfo.push(...info);

        const newUser = {
            name: accountID,
            account : {
                address: location.state.address,
                hashSecret: location.state.hashPrivate,
                hashMnemonic: location.state.hashMnemonic
            }
        }

        // Set User Info
        userInfo.push(newUser);
        localStorage.setItem('wallet', true);
        localStorage.setItem('current', JSON.stringify(newUser));
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        if (location.type === 'recovery') {
            setMessage('계좌 복구 완료.');
            setLoad(false);
            setAlert(true);
            return false;
        }
        
        // Create Account
        const near = await connect({
            networkId: "testnet",
            keyStore: new keyStores.InMemoryKeyStore(),
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://wallet.testnet.near.org",
            helperUrl: "https://helper.testnet.near.org",
            explorerUrl: "https://explorer.testnet.near.org",
        })

        const id = accountID + ".testnet";
        await near.account(id);
        await near.createAccount(id, location.state.address);

        setMessage('계좌 생성 완료.');
        setLoad(false);
        setAlert(true);
    }

    return <>
        <div style={{padding:"0 5px"}}>
            <div className="Title_div">
                <button className="Button_Back" onClick={locationBack}>◀</button>
                <p className="Title">계정 ID 생성</p>
            </div>
            <div style={{padding:"0 15px", textAlign:"center"}}>
                <p style={{paddingBottom:"20px"}}>사용할 계정 ID를 입력해주세요.</p>
                <input value={accountID} onChange={(e) => {setAccountID(e.target.value)}} type={"text"} className='Input_Account' />
                <p style={{transition:'all 0.3s', color:(check ? 'red' : 'white'), margin:0, fontWeight:'bold'}}>이미 존재하는 ID 입니다.</p>
                <button style={{marginTop:"30px", background:(accountID?'#EA973E':'#D3D3D3')}} className="Button_Filled" onClick={() => validateCheck()}>생성</button>
            </div>
        </div>
        {<Loading load={load}/>}
        {<Alert alert={alert} message={message} go={'/dashboard'}/>}
    </>
}

export default CreateAccount;
