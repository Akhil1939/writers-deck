import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'

export default function SideBar() {
    const [cats, setCat] = useState(([]));
    const getCats = async () => {
        await axios.get("/categories").then((res) => {
            setCat(res.data)
            // console.log(res.data)
        }).catch((e) => { console.log(e) })
    }

    useEffect(() => {
        
        getCats();  
    },[])
    return ( 
        <div className="sidebar">
            <div className="sidebar-item">
                <span className="sidebar-title"> About Me</span>
                <img src={require('../img/About me.jfif')} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum reprehenderit sit fugit! Expedita fugiat recusandae quam atque molestias corrupti </p>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-title"> Categories</span>
                <ul className="sidebar-list">
                    {cats.map((c) => (
                        <Link to={`/?cat=${c.name}` } className='link' >

                            <li key={c._id} className="sidebar-list-item">{c.name}</li>
                        </Link>
 
                    ))}

                </ul>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-title">Follow Us</span>
                <div className="sidebar-social">
                    <i className="sidebar-social-icon fa-brands fa-facebook-square"></i>
                    <i className="sidebar-social-icon fa-brands fa-twitter-square"></i>
                    <i className="sidebar-social-icon fa-brands fa-instagram-square"></i>
                    <i className="sidebar-social-icon fa-brands fa-pinterest-square"></i>
                </div>
            </div>
        </div>
    )
}
