import React from 'react';
import { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../../context/Context';
import "./Topbar.css";
import 'react-toastify/dist/ReactToastify.css';

export default function Topbar() {
    const { user, dispatch } = useContext(Context);
    // const navigate
    const PF = "http://localhost:5000/images/"

    const handleLogout = () => {
        dispatch({ type: "Logout" })
        toast.success("logout successfully ");
        toast.success("we will wait for your next visit ");
        Navigate('/')


    }
    return (
        <div className='top'>
            {/* <ToastContainer /> */}
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
                    <li className="top-list-item" onClick={handleLogout}>{user && "Logout"}</li>
                </ul>
            </div>
            <div className="topRight">

                {
                    user ? (
                        <Link to='/settings'>
                            <img
                                className='profile-pic'
                                // src={PF + user.profilePic} alt="" />
                                src={user.profilePic} alt="" />
                        </Link>

                    ) : (
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
