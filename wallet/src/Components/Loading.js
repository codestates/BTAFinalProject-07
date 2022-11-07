import '../css/loading.css';

const Loading = (props) => {
    return <>
        <div className='Loading' style={{opacity:'70%', display:(props.load === true ? 'block' : 'none')}}>
            <div className="loading-container">
                <div className="loading"></div>
                <div className="loading-text">loading</div>
            </div>
        </div>
    </>
}

export default Loading;