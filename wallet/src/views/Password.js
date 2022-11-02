import { useState } from "react";
import '../css/App.css';

const Password = (props) => {
    const [pwd, setPwd] = useState("");
    const [chk, setChk] = useState("");

    const handleChk = () => {
        if (pwd !== chk || pwd.length === 0 || chk.length === 0) {
            alert("비밀번호가 일치하지 않습니다.");
            return false;
        }
        
        props.setLoad(true);
    }
    
    const locationBack = () => {
        props.setRoute('/');
        return;
    }

    return (
        <div style={{display:(props.route === '/create-password' ? "block" : "none"), padding:"0 5px"}}>
            <div className="Title_div">
                <button className="Button_Back" onClick={locationBack}>◀</button>
                <p className="Title">비밀번호 설정</p>
            </div>
            <div style={{padding:"0 15px", textAlign:"center"}}>
                <p>계정 생성에 필요한 암호를 입력해주세요.</p>
                <div style={{marginTop:"30px"}}>
                    <div>
                        <div style={{textAlign:"left", padding:"5px 15px"}}>새 비밀번호</div>
                        <input type={"password"} className="Input" onChange={(e) => {setPwd(e.target.value);}}></input>
                    </div>
                </div>
                <div style={{marginTop:"20px"}}>
                    <div>
                        <div style={{textAlign:"left", padding:"5px 15px"}}>비밀번호 확인</div>
                        <input type={"password"} className="Input" onChange={(e) => setChk(e.target.value)}></input>
                    </div>
                </div>
                <div style={{textAlign:"center", marginTop:"60px"}}>
                    <button className="Button_Main" onClick={handleChk}>생성</button>
                </div>
            </div>
        </div>
    );
}

export default Password;