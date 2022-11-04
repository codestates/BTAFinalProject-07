import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import CryptoJS from 'crypto-js';
import '../css/App.css';

const Password = (props) => {
    const navigate = useNavigate();
    const movePage = (route) => navigate(route);
    
    const [pwd, setPwd] = useState("");
    const [chk, setChk] = useState("");
    const handleChk = () => {
        // RETURN
        if (!pwd || !chk || pwd !== chk) {
            return;
        }

        // SET PWD
        props.setLoad(true);
        localStorage.setItem("pwd", CryptoJS.SHA256(pwd).toString());
        setPwd(""); setChk("");

        // GO TO SEED
        setTimeout(() => {
            props.setLoad(false);
            movePage("/create-mnemonic");
        }, 1000)
    }
    
    const locationBack = () => {
        movePage("/");
        return;
    }

    return (
        <div style={{padding:"0 5px"}}>
            <div className="Title_div">
                <button className="Button_Back" onClick={locationBack}>◀</button>
                <p className="Title">비밀번호 설정</p>
            </div>
            <div style={{padding:"0 15px", textAlign:"center"}}>
                <p>계정 생성에 필요한 암호를 입력해주세요.</p>
                <div style={{marginTop:"30px"}}>
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
                <div style={{textAlign:"center", marginTop:"60px"}}>
                    <button className="Button_Filled" onClick={handleChk} style={{backgroundColor:(!pwd || !chk || pwd !== chk)?"#D3D3D3":"#EA973E"}}>생성</button>
                </div>
            </div>
        </div>
    );
}

export default Password;