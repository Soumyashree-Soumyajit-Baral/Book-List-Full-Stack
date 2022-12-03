import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "./login.css"


const Login = () => {
    const [signupState, setSignupState] = useState({});
    const navigate = useNavigate();

    const handleLogin = () => {

        axios({
            url: "http://localhost:3001/login",
            method: "post",
            data: { username: signupState.username, password: signupState.password }
        }).then((res) => {
            console.log(res.data)
            localStorage.setItem("Authorization", res.data.authToken)
            navigate("/bookmark")
        }).catch((err) => {
            console.log(err)
        })
        navigate("/bookmark")
    }

    return (
        <>
            <div className="login-container">
                <div className="login-innerContainer">
                    <form>
                        <p>Enter your Credentials</p>
                        <div>
                            <input type="text" placeholder="UserName" id="username" name="username" onChange={(e) => { setSignupState({ ...signupState, username: e.target.value }) }}></input>
                        </div>
                        <div>
                            <input type="password" placeholder="Password" id="password" name="password" onChange={(e) => { setSignupState({ ...signupState, password: e.target.value }) }}></input>
                        </div>
                        <div>
                            <button onClick={handleLogin}>Submit</button>
                        </div>
                        <div>
                            <p onClick={() => navigate("/signup")} className="btn">Sign-Up</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;