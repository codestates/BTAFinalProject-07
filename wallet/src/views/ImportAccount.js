import { encryptMessage, decryptMessage, parseSeed } from '../utils/util';
import { useNavigate } from "react-router-dom";
import Loading from '../Components/Loading';
import Alert from '../Components/Alert';
import { useState } from "react";
import '../css/App.css';

const ImportAccount = () => {
    const [inputMnemonic, setInputMnemonic] = useState('');
    const [message, setMessage] = useState('');
    const [check, setCheck] = useState(false);
    const [alert, setAlert] = useState(false);
    const [close, setClose] = useState(false);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();

    const locationBack = () => {
        navigate('/dashboard');
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
            setMessage('이미 존재하는 계좌입니다.');
            setInputMnemonic('');
            setClose(true);
            setAlert(true);
            return false;
        }

        
        setLoad(true);
        const password = localStorage.getItem('pwd');
        const {mnemonic, secretKey, address} = parseSeed(inputMnemonic);
        const hashPrivate = encryptMessage(secretKey, password);
        const hashMnemonic = encryptMessage(mnemonic, password);
        const data = {
            address:address, 
            hashPrivate:hashPrivate,
            hashMnemonic:hashMnemonic, 
            type:'recovery',
        }

        setLoad(false);
        navigate("/create-account", {state: {...data}});
    }

    return (<>
        <div style={{padding:"0 5px"}}>
            <div className="Title_div">
                <button className="Button_Back" onClick={locationBack}>◀</button>
                <p className="Title">계좌 가져오기</p>
            </div>
            <div style={{padding:"0 15px", textAlign:"center"}}>
                <p style={{paddingBottom:"20px"}}>발급받았던 복구 구문을 입력해주세요.</p>
                <input value={inputMnemonic} type={'text'} className='Input_Mnemonic' onChange={(e) => {setCheck(false); setInputMnemonic(e.target.value)}}/>
                <p style={{transition:'all 0.3s', color:(check ? '#EA973E' : 'white'), margin:0}}>유효하지 않은 복구 구문입니다.</p>
                <button className="Button_Filled" style={{margin:'30px 0px'}} onClick={() => fnImport()}>확인</button>
            </div>
        </div>

        {<Loading load={load}/>}
        {<Alert alert={alert} setAlert={setAlert} message={message} go={'/dashboard'} close={close} />}
    </>
    );
}

export default ImportAccount;