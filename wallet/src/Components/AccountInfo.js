import { decryptMessage } from '../utils/util';
import { FiAlertCircle } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { BiCopy } from 'react-icons/bi';
import { useState } from "react";
import CryptoJS from 'crypto-js';
import Loading from './Loading';
import '../css/App.css';


const AccountInfo = (props) => {
    const [copy, setCopy] = useState(false);
    const [load, setLoad] = useState(false);
    const [check, setCheck] = useState(false);
    const [alert, setAlert] = useState(false);
    const [password, setPassword] = useState('');
    const [deSecret, setDeSecret] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [deMnemonic, setDeMnemonic] = useState('');
    const current = JSON.parse(localStorage.getItem('current'));
    const name = String(current.name).substring(0, 1).toUpperCase() + String(current.name).substring(1);

    const buttonCss = {
        width:'250px', 
        marginTop:'30px', 
        background:(password.length === 0 ? '#D3D3D3' : '#EA973E')
    }

    const checkPassword = () => {
        if (password.length === 0) {
            return false;
        }

        const wallet_password = localStorage.getItem('pwd');
        const hashed_password = CryptoJS.SHA256(password).toString();
        if (wallet_password !== hashed_password) {
            setCheck(true);
            setPassword('');
            setTimeout(() => {setCheck(false)}, 1000);
            return false;
        }

        setDeSecret(decryptMessage(current.account.hashSecret, wallet_password));
        setDeMnemonic(decryptMessage(current.account.hashMnemonic, wallet_password));
        setShowInfo(true);
    }

    const deleteAccount = () => {
        setConfirm(false);
        setLoad(true);

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const current = JSON.parse(localStorage.getItem('current'));
        const index = String(current.name)[7];
        const changeAccount = userInfo[0];
        userInfo.splice(index - 1, 1);

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('current', JSON.stringify(changeAccount));

        setLoad(false);
        setAlert(true);
    }

    const modalClose = () => {
        setPassword('');
        setDeSecret('');
        setCheck(false);
        setDeMnemonic('');
        setShowInfo(false); 
        props.setOpen(false);
    }

    const copyData = (type) => {
        if (type === 'secret') navigator.clipboard.writeText(deSecret);
        if (type === 'mnemonic') navigator.clipboard.writeText(deMnemonic);
        setCopy(true); setTimeout(() => setCopy(false), 1000);
    }

    return <>
        <div className='Account-wrap' style={{opacity:'70%', display:(props.open ? 'block' : 'none')}} />
        <div className='Account-Content' style={{display: (props.open ? 'block' : 'none')}}>
            <div className='Account-Header'>
                <p>{name}</p>
                <p style={{transition:'all 0.2s', fontSize:'15px', color:(copy ? '#EA973E' : 'white')}}>복사 완료!</p>
                <div className='Exit' onClick={() => modalClose()}><IoMdClose size={20}/></div>
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
                <div style={{padding:'5px'}}>
                    <p style={{margin:0}}>복구 코드 <BiCopy /></p>
                    <div className='Account-Info' onClick={() => copyData('mnemonic')}>
                        <p style={{margin:0, fontWeight:'bold'}}>
                            {deMnemonic}
                        </p>
                    </div>
                </div>
                <div style={{padding:'5px'}}>
                    <p style={{margin:0}}>비밀 키 <BiCopy /></p>
                    <div className='Account-Info' onClick={() => copyData('secret')}>
                        <p style={{margin:0, fontWeight:'bold'}}>
                            {String(deSecret).substring(0, 15) + '...'}
                        </p>
                    </div>
                </div>
                <div className='Account-Delete'>
                    <button onClick={() => setConfirm(true)}>계정 삭제</button>
                </div>
            </div>
        </div>
        {<Loading load={load}/>}

        {/* Confirm Area Start ========== ========== ========== ========== ==========*/}
        <div style={{display:(confirm ? 'block' : 'none')}}>
            <div className='Confirm-Alert-wrap' style={{opacity:'70%'}}/>
            <div className='Confirm-Alert-content'>
                <FiAlertCircle size={60} color='#EA973E' style={{paddingTop:'10px'}}/>
                <p className='Message'>계정을 삭제하시겠습니까?</p>
                <div style={{paddingTop:'20px'}}>
                    <button className='Create' onClick={() => deleteAccount()}>삭제</button>
                    <button className='Cancle' onClick={() => setConfirm(false)}>취소</button>
                </div>
            </div>
        </div>
        {/* Confirm Area End ========== ========== ========== ========== ==========*/}

        {/* Alert Area Start ========== ========== ========== ========== ==========*/}
        <div style={{display:(alert ? 'block' : 'none')}}>
            <div className='Confirm-Alert-wrap' style={{opacity:'70%'}}/>
            <div className='Confirm-Alert-content'>
                <FiAlertCircle size={60} color='#EA973E' style={{paddingTop:'10px'}}/>
                <p className='Message'>계정 삭제 완료.</p>
                <div style={{paddingTop:'20px'}}>
                    <button className='Create' onClick={() => window.location.reload()}>확인</button>
                </div>
            </div>
        </div>
        {/* Alert Area End ========== ========== ========== ========== ==========*/}
    </>
}

export default AccountInfo;