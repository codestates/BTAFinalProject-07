import {BiPaperPlane, BiReceipt, BiUserCircle, BiCheck, BiImport, BiPlus, BiCopy, BiKey} from 'react-icons/bi';
import { generateSeed, encryptMessage } from '../utils/util';
import AccountInfo from '../Components/AccountInfo';
import engineer from '../assets/engineer_title.png';
import { connect, keyStores } from 'near-api-js';
import { useNavigate } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';
import Loading from '../Components/Loading';
import { useEffect, useState } from 'react';
import '../css/App.css';

const Dashboard = () => {
    const [copyCheck, setCopyCheck] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [address, setAddress] = useState("");
    const [load, setLoad] = useState(false);
    const [alert, setAlert] = useState("");
    const [name, setName] = useState("");
    const [coin, setCoin] = useState(0);
    const navigate = useNavigate();

    let near;
    useEffect(() => {
        (async () => {
            const current = JSON.parse(localStorage.getItem('current'));
            setAddress(current.account.address.split(':')[1]);
            setName(current.name);

            near = await connect({
                networkId: "testnet",
                keyStore: new keyStores.InMemoryKeyStore(),
                nodeUrl: "https://rpc.testnet.near.org",
                walletUrl: "https://wallet.testnet.near.org",
                helperUrl: "https://helper.testnet.near.org",
                explorerUrl: "https://explorer.testnet.near.org",
            })

            const account = await near.account(current.name + ".testnet");
            const balance = await account.getAccountBalance();
            const calcurate = balance.available / 10 ** 24;
            const available = Math.floor(calcurate * 100000) / 100000;
            setCoin(available);

            const info = JSON.parse(localStorage.getItem('userInfo'));
            setUserInfo(info);
        })();

        window.addEventListener('click', (e) => {
            if (e.target !== document.getElementsByClassName('Hambuger')[0]) {
                const lwrap = document.getElementsByClassName('List-wrap')[0];
                const modal = document.getElementsByClassName('Modal')[0];
                const mdiv0 = document.getElementsByClassName('Modiv')[0];
                const mdiv1 = document.getElementsByClassName('Modiv')[1];
                if(![modal, mdiv0, mdiv1, lwrap].includes(e.target)) {
                    setMenuOpen(false);
                };
            }
        })
    }, []);

    const clipboardCopy = () => {
        setCopyCheck(true);
        navigator.clipboard.writeText(address);
        setTimeout(() => {setCopyCheck(false)}, 1000);
    };

    const clickMenu = () => {
        if (menuOpen) {setMenuOpen(false)}
        else {setMenuOpen(true)}
    };

    const createAccount = async () => {
        setLoad(true);
        setConfirm(false);
        const userInfo = [];
        const password = localStorage.getItem('pwd');
        const existedUser = JSON.parse(localStorage.getItem('userInfo'));
        
        const {seedPhrase, address, secret} = generateSeed();
        const hashPrivate = encryptMessage(secret, password);
        const hashMnemonic = encryptMessage(seedPhrase, password);
        const accountNum = existedUser.length + 1;
        const accountID = "account" + accountNum;
        const testnetID = accountID + ".testnet";

        const newUser = {
            name: accountID,
            account : {
                address: address,
                hashSecret: hashPrivate,
                hashMnemonic: hashMnemonic
            }
        }

        userInfo.push(...existedUser); userInfo.push(newUser);
        localStorage.setItem('current', JSON.stringify(newUser));
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        near = await connect({
            networkId: "testnet",
            keyStore: new keyStores.InMemoryKeyStore(),
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://wallet.testnet.near.org",
            helperUrl: "https://helper.testnet.near.org",
            explorerUrl: "https://explorer.testnet.near.org",
        })

        
        await near.account(testnetID);
        await near.createAccount(testnetID, address);

        setTimeout(() => {
            setLoad(false);
            setAlert(true);
        }, 1000)

        return;
    }

    const clickAccount = async (data) => {
        if (name === data.name) {
            return;
        }

        setLoad(true);
        near = await connect({
            networkId: "testnet",
            keyStore: new keyStores.InMemoryKeyStore(),
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://wallet.testnet.near.org",
            helperUrl: "https://helper.testnet.near.org",
            explorerUrl: "https://explorer.testnet.near.org",
        })

        const account = await near.account(data.name + ".testnet");
        const balance = await account.getAccountBalance();
        const calcurate = balance.available / 10 ** 24;
        const available = Math.floor(calcurate * 100000) / 100000;

        localStorage.setItem('current', JSON.stringify(data));
        setAddress(data.account.address.split(':')[1]);
        setName(data.name);
        setCoin(available);
        setAlert(false);
        setLoad(false);
        return;
    }


    return <>
        <div style={{textAlign:"center", marginTop:"5px"}}>
            <div style={{borderBottom:"1px solid #D3D3D3", height:"50px"}}>
                <div className='Hambuger' onClick={() => clickMenu()}>···</div>
                <p style={{margin:0, fontSize:"20px", fontWeight:"bold"}}>{String(name).substring(0, 1).toUpperCase() + String(name).substring(1)}</p>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                    <p className='CopyAddress' onClick={() => clipboardCopy()}>
                        {(address) ? address.substring(0, 5) + '...' + address.substring(40) : address} <BiCopy />
                    </p>
                </div>
            </div>

            {/* Menu Modal Area Start ========== ========== ========== ========== ==========*/}
            <div className='Modal' style={{visibility:(menuOpen)?'':'hidden', width:(menuOpen)?'200px':0, height:(menuOpen)?'320px':0}}>
                <div className='Modiv' style={{borderBottom:'1px solid #D3D3D3'}}>
                    <div className='Modiv' style={{width:'80px', padding:'5px 0px'}}>내 계정</div>
                </div>
                <div className='List-wrap'>  
                    {!userInfo ? null : userInfo.map((item, idx) => {
                        return (
                            <div key={idx} className='List-Item' onClick={() => clickAccount(item)}>
                                {(item.name == name) ? <BiCheck size={30} color='#1FD655'/> : <BiUserCircle size={30} color='#373737'/>}
                                <div style={{paddingLeft:'10px'}}>
                                    {String(item.name).substring(0, 1).toUpperCase() + String(item.name).substring(1)}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <div className='Bottom-Item' onClick={() => setInfoOpen(true)}>
                        <BiKey size={30} color='#373737'/>
                        <div style={{paddingLeft:'5px', color:'#373737'}}>계정 정보</div>
                    </div>
                    <div className='Bottom-Item' onClick={() => setConfirm(true)}>
                        <BiPlus size={30} color='#373737'/>
                        <div style={{paddingLeft:'5px', color:'#373737'}}>계정 생성</div>
                    </div>
                    <div className='Bottom-Item' onClick={() => navigate('/import-account')}>
                        <BiImport size={30} color='#373737'/>
                        <div style={{paddingLeft:'5px', color:'#373737'}}>계정 가져오기</div>
                    </div>
                </div>
            </div>
            {/* Menu Modal Area End ========== ========== ========== ========== ==========*/}

            <p style={{transition:'all 0.3s', margin:0, color:(copyCheck?'#EA973E':'white')}}>복사되었습니다.</p>
            <img src={engineer} alt='logo' width="150px" />
            <p style={{fontWeight:'bold', fontSize:'20px', margin:0}}><span style={{color:"#EA973E"}}>{coin}</span> NEAR</p>
            <div style={{paddingTop:'50px', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <div className='Button_Area'>
                    <button><BiPaperPlane size={30}/></button>
                    <p>전송</p>
                </div>
                <div className='Button_Area'>
                    <button><BiReceipt size={30}/></button>
                    <p>내역</p>
                </div>
            </div>
        </div>

        {/* Confirm Area Start ========== ========== ========== ========== ==========*/}
        <div style={{display:(confirm ? 'block' : 'none')}}>
            <div className='Confirm-Alert-wrap' style={{opacity:'70%'}}/>
            <div className='Confirm-Alert-content'>
                <FiAlertCircle size={60} color='#EA973E' style={{paddingTop:'10px'}}/>
                <p className='Message'>계정을 생성하시겠습니까?</p>
                <div style={{paddingTop:'20px'}}>
                    <button className='Create' onClick={() => createAccount()}>생성</button>
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
                <p className='Message'>계정 생성 완료.</p>
                <div style={{paddingTop:'20px'}}>
                    <button className='Create' onClick={() => window.location.reload()}>확인</button>
                </div>
            </div>
        </div>
        {/* Alert Area End ========== ========== ========== ========== ==========*/}

        {<Loading load={load}/>}
        {<AccountInfo open={infoOpen} setOpen={setInfoOpen}/>}
    </>
}

export default Dashboard;