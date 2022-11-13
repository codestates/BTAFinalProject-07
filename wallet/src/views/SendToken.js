import { connect, keyStores } from "near-api-js";
import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import Title from "../Components/Title";


const SendToken = () => {
    const [receiver, setReceiver] = useState('');
    const [current, setCurrent] = useState({});
    const [check, setCheck] = useState(false);
    const [load, setLoad] = useState(false);
    const [coin, setCoin] = useState(0);
    const [send, setSend] = useState('');
    let near;

    const fnClick = async () => {
        if (!receiver || !send) {
            return false;
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

        const sender = current.name + '.testnet';
        const account = await near.account(sender);
        const transaction = await account.sendMoney(receiver+'.testnet', send * (10 ** 24));

        console.log(transaction);

    }

    useEffect(() => {
        const current = JSON.parse(localStorage.getItem('current'));
        setCurrent(current);
        (async () => {
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

    return <>
        <div style={{padding:"0 5px"}}>
            <Title title={'NEAR 전송'} locate={'/dashboard'}/>
            <div className="Send-Wrap">
                <p style={{margin:0, paddingTop:'15px', paddingBottom:'5px'}}>내 계좌</p>
                <div className="Send-Info">
                    <p style={{margin:0}}>
                        <span style={{fontWeight:'bold'}}>ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                        {!current ? '' : current.name}
                    </p>
                    <p style={{margin:0}}>
                        <span style={{fontWeight:'bold'}}>COIN :&nbsp;&nbsp;</span>
                        {coin } <span style={{fontWeight:'bold'}}>NEAR</span>
                    </p>
                </div>
                <div>
                    <div style={{marginTop:"30px"}}>
                        <div>
                            <div style={{textAlign:"left", padding:"5px"}}>전송 계좌</div>
                            <div style={{display:'flex'}}>
                                <input type={"text"} className="Input" onChange={(e) => setReceiver(e.target.value)} value={receiver} style={{width:'200px', paddingLeft:'10px'}}></input>
                                <p style={{color:'#D3D3D3', fontSize:'20px', margin:0, paddingTop:'5px'}}>&nbsp;.testnet</p>
                            </div>
                        </div>
                        <div>
                            <div style={{textAlign:"left", padding:"5px"}}>수량</div>
                            <div style={{display:'flex'}}>
                                <input type={"text"} className="Input" onChange={(e) => setSend(e.target.value)} value={send} style={{width:'200px', paddingLeft:'10px'}}></input>
                                <p style={{color:'#D3D3D3', fontSize:'20px', margin:0, paddingTop:'5px'}}>&nbsp;NEAR</p>
                            </div>
                        </div>
                    </div>
                    <div style={{textAlign:"center", marginTop:"40px"}}>
                        <p style={{transition:"all 0.5s", paddingLeft:"10px", fontWeight:'bold', margin:"0px", color:(check ? "red" : "white")}}>유효하지 않은 계좌입니다.</p>
                        <button type="number" className="Button_Filled" onClick={() => fnClick()} style={{backgroundColor:(!receiver || !send)?"#D3D3D3":"#EA973E"}}>전송</button>
                    </div>
                </div>
            </div>
            
        </div>
        <Loading load={load}/>
    </>
}

export default SendToken;