import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import '../css/App.css';

const Alert = (props) => {
    const navigate = useNavigate();

    const navigateRoute = () => {
        if (props.close) {
            props.setAlert(false);
            return;
        }

        if (props.go === '/dashboard') {
            window.location.reload();
        } else navigate(props.go);
    }

    return <>
        <div style={{display:(props.alert ? 'block' : 'none')}}>
            <div className='Confirm-Alert-wrap' style={{opacity:'70%'}}/>
            <div className='Confirm-Alert-content'>
                <FiAlertCircle size={60} color='#EA973E' style={{paddingTop:'10px'}}/>
                <p className='Message'>{props.message}</p>
                <div style={{paddingTop:'20px'}}>
                    <button className='Create' onClick={() => navigateRoute()}>확인</button>
                </div>
            </div>
        </div>
    </>
}

export default Alert;