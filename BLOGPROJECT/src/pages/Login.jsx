import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
const Login=()=>{
    const [inputs,setInputs]=useState({
        username:"",
        email:"",
        password:""
    })
    const [err,seterror]=useState(null);
    const navigate=useNavigate();
    const {login}=useContext(AuthContext);

    const Handlechage=e=>{
       setInputs(prev=>({...prev,[e.target.name]: e.target.value}))
    }
    const handleSubmit= async e=>{
e.preventDefault();
try{
 await login(inputs)
navigate("/")
}catch(err){
       console.log(err);
    console.log(err.response);
    console.log(err.response?.data);
    seterror(err.response?.data || err.message);
}
    }
    return (
        <div className="auth">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input required type="text" placeholder='username'name="username" onChange={Handlechage}/>
                <input required type="password" placeholder='password' name="password" onChange={Handlechage}/>
                <button >Login</button>
                {err&&<p>{err}</p>}
                <span>Don't you have an account?<Link to="/register">Register</Link> </span>
            </form>
            </div>
    )
}
export default Login