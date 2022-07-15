import React from 'react'
import SideBar from '../../components/sidebar/SideBar'
import './Settings.css'

export default function Settings() {
  return (
    <div className='settings'>
        <div className="settings-wrapper">
        <div className="settings-tittle">
            <span className="settings-update-title">Update Your Account</span>
            <span className="settings-delete-title">Delete Account</span>
        </div>
        <form className="settings-form">
            <label htmlFor="">Profile Picture</label>
            <div className="settings-profile-picture">
                <img src={require('../../components/img/profile.jpg')} alt="" />
                <label htmlFor="file-input"><i className="settings-profile-icon fa-solid fa-circle-user"></i></label>
                <input type="file" name="" id="file-input" style={{display:'none'}} />
            </div>
            <label htmlFor="">User Name</label>
            <input type="text" placeholder='akhil' />
            <label htmlFor="">email</label>
            <input type="email" placeholder='akhil@gmail.com' />
            <label htmlFor="">Password</label>
            <input type="password"  />
            <button className="settings-submit">Update</button>
            
        </form>
        </div>
            <SideBar />
        </div>
  )
}
