import { encryptMessage, decryptMessage, parseSeed } from '../utils/util';
import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loading from '../Components/Loading';
import { useState } from "react";
import '../css/App.css';

const ImportAccount = () => {
    const [inputMnemonic, setInputMnemonic] = useState("");
    const [message, setMessage] = useState("");
    const [check, setCheck] = useState(false);
    const [alert, setAlert] = useState(false);
    const [load, setLoad] = useState(false);
    const navigator = useNavigate();

    const locationBack = () => {
        navigator('/dashboard');
        return;
    }

    const fnImport = () => {
        if (inputMnemonic.split(' ').length !== 12) {
            setCheck(true);
            setTimeout(() => {
                setCheck(false);
            }, 1000);
            return false;
        }

        let validate = true;
        JSON.parse(localStorage.getItem('userInfo')).forEach((item) => {
            const password = localStorage.getItem('pwd');
            const decryptMnemonic = decryptMessage(item.account.hashMnemonic, password);
            if (inputMnemonic === decryptMnemonic) {
                validate = false;
            }
        })

        if (!validate) {
            setMessage('이미 존재하는 계정입니다.');
            setInputMnemonic('');
            setAlert(true);
            return false;
        }

        
        setLoad(true);
        const password = localStorage.getItem('pwd');
        const existed = JSON.parse(localStorage.getItem('userInfo'));
        const {mnemonic, secretKey, address} = parseSeed(inputMnemonic);

        const hashPrivate = encryptMessage(secretKey, password);
        const hashMnemonic = encryptMessage(mnemonic, password);
        const number = Number(String(existed[existed.length - 1].name).substring(7)) + 1;
        const acctId = "account" + number;

        const userInfo = [];
        const newUser = {
            name: acctId,
            account : {
                address: address,
                hashSecret: hashPrivate,
                hashMnemonic: hashMnemonic
            }
        }

        userInfo.push(...existed); userInfo.push(newUser);
        localStorage.setItem('current', JSON.stringify(newUser));
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        setMessage("계정 복구 성공.")
        setLoad(false);
        setAlert(true);
    }

    const clickOK = () => {
        setAlert(false);
        if (!inputMnemonic) {
            return false;
        }

        navigator('/dashboard')
    }

    return (<>
        <div style={{padding:"0 5px"}}>
            <div className="Title_div">
                <button className="Button_Back" onClick={locationBack}>◀</button>
                <p className="Title">계정 가져오기</p>
            </div>
            <div style={{padding:"0 15px", textAlign:"center"}}>
                <p style={{paddingBottom:"20px"}}>발급받았던 니모닉 구문을 입력해주세요.</p>
                <input value={inputMnemonic} type={'text'} className='Input_Mnemonic' onChange={(e) => {setCheck(false); setInputMnemonic(e.target.value)}}/>
                <p style={{transition:'all 0.3s', color:(check ? '#EA973E' : 'white'), margin:0}}>유효하지 않은 니모닉 구문입니다.</p>
                <button className="Button_Filled" style={{margin:'30px 0px'}} onClick={() => fnImport()}>가져오기</button>
            </div>
        </div>

        {/* Alert Area Start ========== ========== ========== ========== ==========*/}
        <div style={{display:(alert ? 'block' : 'none')}}>
            <div className='Confirm-Alert-wrap' style={{opacity:'70%'}}/>
            <div className='Confirm-Alert-content'>
                <FiAlertCircle size={60} color='#EA973E' style={{paddingTop:'10px'}}/>
                <p className='Message'>{message}</p>
                <div style={{paddingTop:'20px'}}>
                    <button className='Create' onClick={() => clickOK()}>확인</button>
                </div>
            </div>
        </div>
        {/* Alert Area End ========== ========== ========== ========== ==========*/}

        {<Loading load={load}/>}
    </>
    );
}

export default ImportAccount;