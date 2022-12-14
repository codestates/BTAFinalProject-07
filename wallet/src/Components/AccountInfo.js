import { FiAlertCircle } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { BiCopy } from 'react-icons/bi';
import { useState } from "react";
import CryptoJS from 'crypto-js';
import Loading from './Loading';
import Alert from './Alert';
import '../css/App.css';


const AccountInfo = (props) => {
    const [copy, setCopy] = useState(false);
    const [load, setLoad] = useState(false);
    const [check, setCheck] = useState(false);
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [deSecret, setDeSecret] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const current = JSON.parse(localStorage.getItem('current'));

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

        setDeSecret(String(current.account.secretKey).split(':')[1]);
        setShowInfo(true);
    }

    const deleteAccount = () => {
        setConfirm(false);
        setLoad(true);

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const changeAccount = userInfo[0];
        userInfo.splice(userInfo.length - 1, 1);

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('current', JSON.stringify(changeAccount));

        if (userInfo.length === 0) {
            localStorage.removeItem('userInfo');
            localStorage.removeItem('current');
            localStorage.removeItem('wallet');
            localStorage.removeItem('pwd');
        }

        setMessage('?????? ?????? ??????.');
        setLoad(false);
        setAlert(true);
    }

    const modalClose = () => {
        setPassword('');
        setDeSecret('');
        setCheck(false);
        setShowInfo(false); 
        props.setOpen(false);
    }

    const copyData = () => {
        navigator.clipboard.writeText(deSecret);
        setCopy(true); setTimeout(() => setCopy(false), 1000);
    }

    return <>
        <div className='Account-wrap' style={{opacity:'70%', display:(props.open ? 'block' : 'none')}} />
        <div className='Account-Content' style={{display: (props.open ? 'block' : 'none')}}>
            <div className='Account-Header'>
                <p>{current ? current.name : ''}</p>
                <p style={{transition:'all 0.2s', fontSize:'15px', color:(copy ? '#EA973E' : 'white')}}>?????? ??????!</p>
                <div className='Exit' onClick={() => modalClose()}><IoMdClose size={20}/></div>
            </div>
            <div style={{padding:'5px', textAlign:'center', display:(showInfo ? 'none' : 'block')}}>
                <div>
                    <p style={{margin:0}}>?????? ?????? ????????? ?????? <br />??????????????? ??????????????????.</p>
                    <input value={password} type='password' className='Input' style={{width:'200px', marginTop:'30px'}} onChange={(e) => setPassword(e.target.value)}/>
                    <p style={{margin:0, fontSize:'13px', color:(check ? '#EA973E' : 'white'), transition:'all, 0.3s'}}>??????????????? ???????????? ????????????.</p>
                    <button className='Button_Filled' style={buttonCss} onClick={() => checkPassword()}>??????</button>
                </div>
            </div>
            <div style={{padding:'5px', textAlign:'center', display:(showInfo ? 'block' : 'none')}}>
                <div style={{padding:'5px'}}>
                    <p style={{margin:0}}>?????? ??? <BiCopy /></p>
                    <div className='Account-Info' onClick={() => copyData()}>
                        <p style={{margin:0, fontWeight:'bold'}}>
                            {String(deSecret).substring(0, 15) + '...'}
                        </p>
                    </div>
                </div>
                <div className='Account-Delete'>
                    <button onClick={() => setConfirm(true)}>?????? ??????</button>
                </div>
            </div>
        </div>
        {<Loading load={load}/>}

        {/* Confirm Area Start ========== ========== ========== ========== ==========*/}
        <div style={{display:(confirm ? 'block' : 'none')}}>
            <div className='Confirm-Alert-wrap' style={{opacity:'70%'}}/>
            <div className='Confirm-Alert-content'>
                <FiAlertCircle size={60} color='#EA973E' style={{paddingTop:'10px'}}/>
                <p className='Message'>????????? ?????????????????????????</p>
                <div style={{paddingTop:'20px'}}>
                    <button className='Create' onClick={() => deleteAccount()}>??????</button>
                    <button className='Cancle' onClick={() => setConfirm(false)}>??????</button>
                </div>
            </div>
        </div>
        {/* Confirm Area End ========== ========== ========== ========== ==========*/}
        {<Alert alert={alert} message={message} go={'/dashboard'}/>}
    </>
}

export default AccountInfo;