import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import { toast } from 'react-toastify';

import axios from 'axios'

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [profilePic, setProfilePic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await axios.post("/auth/register", {
        username,
        email, 
        password,
        profilePic,

      }).then((res) => {
        toast.success("Registration successfully ")
        toast.success("welcome to Writer's deck ")
        // res.data && window.location.replace("/login");
        // console.log(profilePic);
      });
    } catch (err) {
      console.log(err)
      toast.error("Error while register")
    }
  };
const  convert = (e)=> {
    // check max. file size is not exceeded
    // size is in bytes
    if (e.size > 2000000) {
      console.log("File too large");
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      // console.log(reader.result); //base64encoded string
      setProfilePic(reader.result)
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };  
  }

  return ( 
    <div className='register'>
      <form
        className='register-form'
        onSubmit={handleSubmit}
      >
        <span className="register-title">Register</span>
        <input
          type="file"
          label="Image"
          name="myFile"
          accept=".jpeg, .png, .jpg"
          onChange={convert}
        />
        <label htmlFor="userName">UserName</label>
        <input
          className='register-input'
          type="text"
          name="userName"
          id="userName"
          placeholder='Enter Your userName...'
          onChange={e => setUsername(e.target.value)} />

        <label htmlFor="email">Email</label>
        <input
          className='register-input'
          type="email"
          name="email"
          id="email"
          placeholder='Enter Your Email...'
          onChange={e => setEmail(e.target.value)} />

        <label htmlFor="Password">Password</label>
        <input className='register-input'
          type="Password"
          name="Password"
          id="Password"
          placeholder='Enter your Password'
          onChange={e => setPassword(e.target.value)} />

        <button className="register-btn"
          type='submit'>
          Register
        </button>
      </form>
      <button className="register-login-btn">
        <Link className='link' to="/login">Login</Link>
      </button>

    </div>
  )
}
