import React, { useEffect, useState } from 'react'
import "./SinglePost.css"
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../../context/Context';



export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({})
  const PF ="http://localhost:5000/images/"
  const {user} = useContext(Context)
  const navigate = useNavigate();
  // console.log(path)
  useEffect(() => {
    const getPost = async () => {
      await axios.get("/posts/" + path)
        .then(res => {
          const post = res.data;
          console.log(post);
          setPost(res.data)
        }).catch((err) => {
          console.log(err)
        })
    }
    getPost();
  }, [path])

  const handleDelete = async()=>{
  try{

      await axios.delete(`/posts/${post._id}`, {data : {username : user.username}}).then(()=>{
navigate('/');
      });
  }catch(err){
    console.log(err)
  }

  }
  const url = `https://source.unsplash.com/1000x500/?${post.categories}`
  return (
    <div className='single-post'>
      <div className="single-post-wrapper">
        {
          
          post.photo ?
          <img className='single-post-img' src={PF + post.photo} alt="Post" /> :
          <img className='single-post-img' src={url} alt="Post" />

        }
        <h1 className="single-post-title">{post.title}
        {post.username === user.username && 
          <div className="single-post-edit"><i className="single-post-icon fa-solid fa-pen-to-square"></i>
            <i className="single-post-icon fa-solid fa-trash-can" onClick={handleDelete}></i>
          </div>
        }
        </h1>
        <div className="single-post-info">

          <span className="single-post-author">Author :
            <Link to={`/?user=${post.userName}`} className='link'>
              <b> {(post.username)}</b>
            </Link>
          </span>
          <span className="single-post-date">{post.createdAt}</span>
        </div>
        <p className="single-post-desc">

          {post.desc}
        </p>


      </div>
    </div>
  )
}
