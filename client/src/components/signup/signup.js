import React,{ useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "./signup.css"



const Signup=()=>{
    const [signupState, setSignupState]=useState({});
    const navigate=useNavigate();

    const handleUser=()=>{
        if(signupState.password===signupState.cpassword){
            axios({
                url:"http://localhost:3001/signup",
                method:"post",
                data:{username:signupState.username, password:signupState.password}
            }).then((res)=>{
                console.log(res.data)
                navigate("/")
            }).catch((err)=>{
                console.log(err)
                alert(err.response.data)
            })
        }else{
            alert("password didnot Match")
        }
        navigate("/")
    }

    return (
        <>
            <div className="signup-container">
                <div className="signup-innerContainer">
                    <form>
                        <p>Create new Account</p>
                        <div>
                            <input type="text" placeholder="UserName" id="username" name="username" onChange={(e)=>{setSignupState({...signupState, username:e.target.value})}}></input>
                        </div>
                        <div>
                            <input type="password" placeholder="Password" id="password" name="password" onChange={(e)=>{setSignupState({...signupState, password:e.target.value})}}></input>
                        </div>
                        <div>
                            <input type="password" placeholder="Confirm Password" id="cpassword" name="cpassword" onChange={(e)=>{setSignupState({...signupState, cpassword:e.target.value})}}></input>
                        </div>
                        <div>
                            <button onClick={handleUser}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;