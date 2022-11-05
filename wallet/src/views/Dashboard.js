import { connect, keyStores } from 'near-api-js';
import engineer from '../assets/engineer_title.png';
import { useEffect, useState } from 'react';
import '../css/App.css';

const Dashboard = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [copyCheck, setCopyCheck] = useState(false);
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [coin, setCoin] = useState(0);
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
            
            

        })();
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

    // ========== ========== ========== ========== ========== ==========
    const copyText = {
        color:(copyCheck ? "#EA973E" : "white"), 
        transition:"all 0.3s", 
        margin:0
    };
    // ========== ========== ========== ========== ========== ==========
    

    return <>
        <div style={{textAlign:"center", marginTop:"5px"}}>
            <div style={{borderBottom:"1px solid #D3D3D3", height:"50px"}}>
                <div className='Hambuger' onClick={() => clickMenu()}>···</div>
                <p style={{margin:0, fontSize:"20px", fontWeight:"bold"}}>{String(name).substring(0, 1).toUpperCase() + String(name).substring(1)}</p>
                <p className='CopyAddress' onClick={() => clipboardCopy()}>{(address) ? address.substring(0, 5) + '...' + address.substring(40) : address}</p>
            </div>

            {/* Modal Area Start */}
            <div className='Modal' style={{visibility:(menuOpen)?'':'hidden', width:(menuOpen)?'200px':0, height:(menuOpen)?'300px':0}}>

            </div>
            {/* Modal Area End */}

            <p style={copyText}>복사되었습니다.</p>
            <img src={engineer} alt='logo' width="150px" />
            <div>
                <p style={{fontWeight:'bold', fontSize:'20px', margin:0}}><span style={{color:"#EA973E"}}>{coin}</span> NEAR</p>
                <div style={{paddingTop:'20px', display:'flex', textAlign:'center', alignItems:'middle'}}>
                    <div>
                        <button className='Button_dash' />
                        <p>전송</p>
                    </div>
                    <div>
                        <button className='Button_dash' />
                        <p>전송</p>
                    </div>
                    <div>
                        <button className='Button_dash' />
                        <p>전송</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Dashboard;