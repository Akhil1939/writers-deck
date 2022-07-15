import React, { useEffect, useState } from 'react'
import "./SinglePost.css"
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';



export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({})
  
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
  const url = `https://source.unsplash.com/1000x500/?${post.categories}`
  return (
    <div className='single-post'>
      <div className="single-post-wrapper">
        {
          
          post.photo ?
          <img className='single-post-img' src={post.photo} alt="Post" /> :
          <img className='single-post-img' src={url} alt="Post" />

        }
        <h1 className="single-post-title">{post.title}
          <div className="single-post-edit"><i className="single-post-icon fa-solid fa-pen-to-square"></i>
            <i className="single-post-icon fa-solid fa-trash-can"></i>
          </div>
        </h1>
        <div className="single-post-info">

          <span className="single-post-author">Author :
            <Link to={`/?user=${post.username}`} className='link'>
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
