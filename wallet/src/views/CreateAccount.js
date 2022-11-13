import { useLocation, useNavigate } from 'react-router-dom';
import { connect, keyStores, KeyPair, WalletConnection } from 'near-api-js';
import Loading from '../Components/Loading';
import Alert from '../Components/Alert';
import { useState } from 'react';
import '../css/App.css';
import { CONFIG, encryptMessage } from '../utils/util';

const CreateAccount = () => {
    const [accountID, setAccountID] = useState('');
    const [alert, setAlert] = useState(false);
    const [check, setCheck] = useState(false);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Validation ID.
    const fnCreateAccount = async () => {
        if (!accountID) return false;

        const info = JSON.parse(localStorage.getItem('userInfo'));
        if (info) info.forEach(item => { if (item.name === accountID) {
            setCheck(true); setTimeout(() => {
                setCheck(false);
            }, 1000); return false;
        }})

        setLoad(true);
        const id = accountID + ".testnet";
        const keyStore = new keyStores.BrowserLocalStorageKeyStore();
        const keyPair = KeyPair.fromString(location.state.secretKey);
        await keyStore.setKey('testnet', id, keyPair);

        const near = await connect({...CONFIG, keyStore:keyStore});
        const wallet = new WalletConnection(near);
        wallet.requestSignIn({
            contractId: id,
            successUrl: 'localhost:3000/dashboard'
        });

        const account = (location.state.type === 'new-account')
            ? await near.account(info[0].name)
            : await near.account(id);

        console.log(await account.getAccountDetails());
        await account.addKey(keyPair.secretKey.toString(), id);
        // if (location.state.type === 'new-account') {
        //     await account.createAccount(
        //         id, keyPair.publicKey.toString()
        //     );
        // }

        // saveUserInfo(id);
    }

    // Save User in LocalStrage.
    const saveUserInfo = (id) => {
        const info = JSON.parse(localStorage.getItem('userInfo'));
        const userInfo = []; if (info) userInfo.push(...info);
        const password = localStorage.getItem('pwd');

        const newUser = {
            name: id,
            account : {
                publicKey: location.state.publicKey,
                secretKey: location.state.secretKey,
                // secretKey: encryptMessage(location.state.secretKey, password)
            }
        }

        userInfo.push(newUser);
        localStorage.setItem('wallet', true);
        localStorage.setItem('current', JSON.stringify(newUser));
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        setLoad(false);
        setAlert(true);
    }

    return <>
        <div style={{padding:"0 5px"}}>
            <div className="Title_div">
                <button className="Button_Back" onClick={() => navigate('/')}>◀</button>
                <p className="Title">계정 ID 생성</p>
            </div>
            <div style={{padding:"0 15px", textAlign:"center"}}>
                <p style={{paddingBottom:"20px"}}>사용할 계정 ID를 입력해주세요.</p>
                <input value={accountID} onChange={(e) => {setAccountID(e.target.value)}} type={"text"} className='Input_Account' />
                <p style={{transition:'all 0.3s', color:(check ? 'red' : 'white'), margin:0, fontWeight:'bold'}}>이미 존재하는 ID 입니다.</p>
                <button style={{marginTop:"30px", background:(accountID?'#EA973E':'#D3D3D3')}} className="Button_Filled" onClick={() => fnCreateAccount()}>생성</button>
            </div>
        </div>
        {<Loading load={load}/>}
        {<Alert alert={alert} message={'계좌 생성 완료.'} go={'/dashboard'}/>}
    </>
}

export default CreateAccount;
