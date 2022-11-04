import { useLocation, useNavigate } from "react-router-dom";
import { decryptMessage } from '../utils/util';
import { useState } from "react";
import '../css/App.css'

const CheckMnemonic = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const movePage = (route) => navigate(route);
    const [chkValue, setChkValue] = useState(false);
    const [inputMnemonic, setInputMnemonic] = useState("");

    const locationBack = () => {
        movePage('/create-password');
        return;
    }

    const compareMnemonic = () => {
        const password = localStorage.getItem('pwd');
        const decryptMnemonic = decryptMessage(location.state.data, password);
        
        // Compare Value
        if (decryptMnemonic !== inputMnemonic) {
            setChkValue(true);
            setTimeout(()=> {setChkValue(false)}, 1000)
            return;
        }

        // Go TO Home
        props.setLoad(true);
        const userInfo = {
            name: "Account_1",
            accounts : {
                [location.state.address] : {
                    data: location.state.data,
                    address: location.state.address,
                    secretKey: location.state.secretKey
                }
            }
        }

        localStorage.setItem("wallet", true);
        localStorage.setItem("userInfo", userInfo);
        
        setTimeout(() => {
            props.setLoad(false);
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
    </>
}

export default CheckMnemonic;