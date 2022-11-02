import { useState } from "react";

const Password = (props) => {
    const [visivle, setVisible] = useState("none");

    return (
        <div style={{display:(props.route === '/create-password' ? "block" : "none")}}>Password</div>
    );
}

export default Password;