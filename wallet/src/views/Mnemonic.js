import { useState } from 'react';
import '../css/App.css';

const Mnemonic = (props) => {
    const [mnemonic, setMnemonic] = useState("");

    const locationBack = () => {
        props.setRoute('/create-password');
        return;
    }

    return <>
        <div style={{display:(props.route === '/create-mnemonic' ? "block" : "none"), padding:"0 5px"}}>
            <div className="Title_div">
                <button className="Button_Back" onClick={locationBack}>◀</button>
                <p className="Title">비밀 복구 구문</p>
            </div>
            <div style={{padding:"0 15px", textAlign:"center"}}>
                <p>비밀 복구 구문을 이용하면 계정을 쉽게 <br />백업하고 복구할 수 있습니다. 이 구문을 <br />절대로 외부에 공개하지 마세요.</p>
                <input value={mnemonic} type={"text"} className="Mnemonic" readOnly />
                <div>
                    
                </div>
            </div>
        </div>
    </>
}

export default Mnemonic;