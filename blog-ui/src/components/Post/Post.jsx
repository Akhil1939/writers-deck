import React from 'react'
import './Post.css';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
  const url = `https://source.unsplash.com/1000x500/?${post.categories[1]},${post.categories[0]}`
  return (
    <>
    <div className='post'>
      {post.photo ? 
        <img className='post-img' src={post.photo} alt="Post" /> :
        <img className='post-img' src={url} alt="Post"/>
      }

      <div className="post-info">
        <div className="post-cats">
          {post.categories.map((c) => {
            return (
              <span key={post._id} className="post-cat">{[c]}</span>
            )
          })}
        </div> 
        <Link className='link' to={`/post/${post._id}`}>

          <span className="post-title">{post.title} </span>
        </Link>
        <hr />
        <span className="post-date">{post.updatedAt}</span>
      </div>
      <div className="post-desc">{post.desc}</div>
    </div>
    </>
  )
}
 