import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register=()=>{
    const [inputs,setInputs]=useState({
        username:"",
        email:"",
        password:""
    })
    const [err,seterror]=useState(null);
    const navigate=useNavigate();
    const Handlechage=e=>{
       setInputs(prev=>({...prev,[e.target.name]: e.target.value}))
    }
    const handleSubmit= async e=>{
e.preventDefault();
try{
const res = await axios.post(
  "http://localhost:8800/api/auth/register",inputs
)
navigate("/login")
console.log(res)
}catch(err){
    console.log(err)
    seterror(err.response?.data || err.message);
}
    }
    return (
        <div className="auth">
            <h1>Register</h1>
            <form>
                <input required type="text" placeholder='username'name="username" onChange={Handlechage}/>
                <input required type="text" placeholder='Email'name="email" onChange={Handlechage}/>
                <input required type="password" placeholder='password' name="password" onChange={Handlechage}/>
                <button onClick={handleSubmit}>Register</button>
                {err&&<p>{err}</p>}
                <span>Do you have an account?<Link to="/login">Login</Link> </span>
            </form>
            </div>
    )
}
export default Register