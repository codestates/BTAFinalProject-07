import engineer from '../assets/engineer.png';

const Header = () => {

    return(
        <div style={{height:"60px", boxShadow:"1px 0px 4px 0px", display:"flex", alignItems:"center"}}>
            <img src={engineer} style={{width:"50px", height:"50px", marginLeft:"5px"}}/>
            <p style={{fontWeight:"bold", fontSize:"25px"}}>ENGINEER</p>
        </div>
    );
}

export default Header;