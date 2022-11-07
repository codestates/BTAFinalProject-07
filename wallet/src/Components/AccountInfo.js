import { IoMdClose } from 'react-icons/io';
import { useState } from "react";
import CryptoJS from 'crypto-js';
import '../css/App.css';


const AccountInfo = (props) => {
    const [check, setCheck] = useState(false);
    const [password, setPassword] = useState('');
    const [showInfo, setShowInfo] = useState(false);
    const current = JSON.parse(localStorage.getItem('current'));
    const name = String(current.name).substring(0, 1).toUpperCase() + String(current.name).substring(1);


    const wrap = {
        display: (props.open ? 'block' : 'none'),
        position: 'absolute',
        backgroundColor:'black',
        height: '600px',
        width: '370px',
        opacity:'70%',
        zIndex:20,
        top:0,
    }

    const content_wrap = {
        display: (props.open ? 'block' : 'none'),
        backgroundColor: 'white',
        position: 'absolute',
        borderRadius: '10px',
        height: '520px',
        width: '290px',
        left: '40px',
        top: '40px',
        opacity: 1,
        zIndex:30,
    }

    const exit = {
        padding: '15px',
        position: 'absolute',
        top: '10px',
        right: 0,
        cursor:'pointer',
    }

    const buttonCss = {
        width:'250px', 
        marginTop:'30px', 
        background:(password.length === 0 ? '#D3D3D3' : '#EA973E')
    }

    const checkPassword = () => {
        const wallet_password = localStorage.getItem('pwd');
        const hashed_password = CryptoJS.SHA256(password).toString();
        if (wallet_password !== hashed_password) {
            setCheck(true);
            setPassword('');
            setTimeout(() => {setCheck(false)}, 1000);
            return false;
        }

        setShowInfo(true);
    }

    const modalClose = () => {
        setPassword('');
        setCheck(false);
        setShowInfo(false); 
        props.setOpen(false);
    }

    return <>
        <div style={wrap}></div>
        <div style={content_wrap}>
            <div style={{padding:'20px', textAlign:'center', height:'30px', borderBottom:'1px solid #D3D3D3'}}>
                <p style={{margin:0, fontWeight:'bold', fontSize:'20px'}}>{name}</p>
            <div style={exit} onClick={() => modalClose()}><IoMdClose size={20}/></div>
            </div>
            <div style={{padding:'5px', textAlign:'center', display:(showInfo ? 'none' : 'block')}}>
                <div>
                    <p style={{margin:0}}>계정 정보 확인을 위해 <br />비밀번호를 입력해주세요.</p>
                    <input value={password} type='password' className='Input' style={{width:'200px', marginTop:'30px'}} onChange={(e) => setPassword(e.target.value)}/>
                    <p style={{margin:0, fontSize:'13px', color:(check ? '#EA973E' : 'white'), transition:'all, 0.3s'}}>비밀번호가 일치하지 않습니다.</p>
                    <button className='Button_Filled' style={buttonCss} onClick={() => checkPassword()}>확인</button>
                </div>
            </div>
            <div style={{padding:'5px', textAlign:'center', display:(showInfo ? 'block' : 'none')}}>
            HI
            </div>
        </div>
    </>
}

export default AccountInfo;