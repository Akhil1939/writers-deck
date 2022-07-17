import React, { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context';
import './Login.css';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
const userRef = useRef();
const passwordRef = useRef();
const navigate = useNavigate();

const { dispatch, isFetching} = useContext(Context)


  const handleSubmit = async (e)=>{
    e.preventDefault();
    dispatch({type:"Login_Start"});
    try{
      await axios.post('/auth/login',{
        username :userRef.current.value,
        password :passwordRef.current.value,
      }).then((res)=>{
        // console.log(res.data);
        toast.success("Login Successfully...");
        dispatch({type:"Login_Success", payload: res.data});
        navigate('/');
        
         
      })

    }catch(err){ 
      dispatch({type:"Login_Failure"});
      toast.warn("Invalid Login credential")

    } 
  };
console.log(isFetching)

    return ( 
    <div className='login'>
     
        <form  className='login-form' onSubmit={handleSubmit}>
            <span className="login-title">Login</span>
            <label htmlFor="username">Username</label>
            <input className='login-input' type="text" name="username" id="usernme" placeholder='Enter Your Username...' 
            ref={userRef}/>

            <label htmlFor="Password">Password</label>
            <input className='login-input' type="Password" name="Password" id="Password" placeholder='Enter your Password'
            ref={passwordRef} />

            <button className="login-btn"
            disabled={isFetching}
            >Login</button>
        </form>
        <button className="login-register-btn" type='submit'>
          <Link className='link' to="/register">Register</Link>
          </button>

        </div>
  )
}
