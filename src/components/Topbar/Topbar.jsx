import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import "./Topbar.css";

export default function Topbar() {
    const {user, dispatch} = useContext(Context);
    // const navigate

    const handleLogout = ()=>{
        dispatch({type: "Logout"})


    }
    return (
        <div className='top'> 
            <div className="topLeft">

                <i className="top-icon fa-brands fa-facebook-square"></i>
                <i className="top-icon fa-brands fa-twitter-square"></i>
                <i className="top-icon fa-brands fa-instagram-square"></i>
                <i className="top-icon fa-brands fa-pinterest-square"></i>
            </div>
            <div className="topCenter">
                <ul className="top-list">
                    <li className="top-list-item"><Link className="link" to="/" >Home</Link></li>
                    <li className="top-list-item"><Link className="link" to="/about">About</Link></li>
                    <li className="top-list-item"><Link className="link" to="/contact">Contact</Link></li>
                    <li className="top-list-item"><Link className="link" to="/write">Write</Link></li>
                    <li className="top-list-item" onClick={handleLogout}>{user && "Logout" }</li>
                </ul>
            </div>
            <div className="topRight">
                {
                    user ?(

                        <img
                        className='profile-pic'
                        src={user.profilePic} alt="" />
                    ) :(
                        <ul className='top-list'>
                            <li className='top-list-item'>

                        <Link className='link' to='/login'>LOGIN</Link>
                            </li>
                            <li className='top-list-item'>

                        <Link className='link' to='/register'>REGISTER</Link>
                            </li>
                        </ul>
                    )
                }
                <i className="top-search-icon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )
}
