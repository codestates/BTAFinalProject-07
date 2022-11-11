import { useNavigate } from 'react-router-dom';
import '../css/App.css';

const Title = (props) => {
    const navigate = useNavigate();

    return <>
        <div className="Title_div">
            <button className="Button_Back" onClick={() => navigate(props.locate)}>◀</button>
            <p className="Title">{props.title}</p>
        </div>
    </>
}

export default Title;