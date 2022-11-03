import engineer from '../assets/engineer.png';
import '../css/App.css';

const Main = (props) => {
    return (
        <div style={{display:(props.route === '/' ? 'block' : 'none')}}>
            <div style={{textAlign:"center", marginTop:"10px"}}>
                <img src={engineer} width="200px" />
                <p style={{marginTop:"-35px", fontSize:"30px", fontWeight:"bold"}}>Welcome To <br />ENGINEER</p>
            </div>
            <div style={{marginTop:"50px"}}>
                <div style={{marginBottom:"10px", padding:"0px 10px", textAlign:"center"}}>
                    <button className='Button_Main' onClick={() => props.setRoute('/create-password')}>계정 생성</button>
                    <button className='Button_Main' onClick={() => console.log('/create-recovery')}>계정 복구</button>
                </div>
            </div>
        </div>
    );
}

export default Main;