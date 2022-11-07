import { useNavigate } from "react-router-dom";
import Loading from '../Components/Loading';
import { parseSeed } from '../utils/util';
import { useState } from "react";
import '../css/App.css';

const ImportAccount = () => {
    const [inputMnemonic, setInputMnemonic] = useState("");
    const [check, setCheck] = useState(false);
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

        setLoad(true);
        const {mnemonic, secretKey, address} = parseSeed(inputMnemonic);

    }

    return (<>
        <div style={{padding:"0 5px"}}>
            <div className="Title_div">
                <button className="Button_Back" onClick={locationBack}>◀</button>
                <p className="Title">계정 가져오기</p>
            </div>
            <div style={{padding:"0 15px", textAlign:"center"}}>
                <p style={{paddingBottom:"20px"}}>발급받았던 니모닉 구문을 입력해주세요.</p>
                <input type={'text'} className='Input_Mnemonic' onChange={(e) => {setCheck(false); setInputMnemonic(e.target.value)}}/>
                <p style={{transition:'all 0.3s', color:(check ? '#EA973E' : 'white'), margin:0}}>유효하지 않은 니모닉 구문입니다.</p>
                <button className="Button_Filled" style={{margin:'30px 0px'}} onClick={() => fnImport()}>가져오기</button>
            </div>
        </div>
        {<Loading load={load}/>}
    </>
    );
}

export default ImportAccount;