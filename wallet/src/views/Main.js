import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import engineer from '../assets/engineer.png';
import '../css/App.css';

const Main = () => {
    const navigate = useNavigate();
    const movePage = (route) => navigate(route);
    const wallet = localStorage.getItem('wallet');

    useEffect(() => {
        if (wallet) {
            navigate('lock-account');
        }
    }, [])

    return (
        <div>
            <div style={{textAlign:"center", marginTop:"10px"}}>
                <img src={engineer} width="200px" />
                <p style={{marginTop:"-35px", fontSize:"30px", fontWeight:"bold"}}>Welcome To <br />ENGINEER</p>
            </div>
            <div style={{marginTop:"50px"}}>
                <div style={{marginBottom:"10px", padding:"0px 10px", textAlign:"center"}}>
                    <button className='Button_Main' onClick={() => movePage('/create-password')}>계정 생성</button>
                    <button className='Button_Main' onClick={() => movePage('/create-recovery')}>계정 복구</button>
                </div>
            </div>
        </div>
    );
}

export default Main;