import React from 'react'
import "./Header.css";

export default function Header() {
  return (
    <div className='header'>
        <div className="header-titles">
            <span className='header-title-sm'>React & node</span>
            <span className='header-title-lg'>Blog</span>
        </div>
        <img className='header-img' src="https://source.unsplash.com/1600x500/?blog,nature" alt="" />

    </div>
  )
}
