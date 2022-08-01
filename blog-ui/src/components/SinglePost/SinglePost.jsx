import React, { useEffect, useState } from 'react'
import "./SinglePost.css"
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import { toast} from 'react-toastify';



export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({})
  const { user } = useContext(Context)
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false)

  useEffect(() => {
    const getPost = async () => {
      await axios.get("/posts/" + path)
        .then(res => {
          const post = res.data;
          setTitle(res.data.title);
          setDesc(res.data.desc);
          console.log(post);
          setPost(res.data)
        }).catch((err) => {
          console.log(err)
        })
    }
    getPost();
  }, [path])

  const handleDelete = async () => {
    try {

      await axios.delete(`/posts/${post._id}`, { data: { username: user.username } }).then(() => {
        toast.success("Blog has been deleted 🐱‍🏍")
        navigate('/');
      });
    } catch (err) {
      toast.error("Error while deleting blog ")
      console.log(err)
    }

  }

  const handleEdit =()=>{
    setUpdateMode(true);
  }

  const handleUpdate = async ()=>{
    try{
        await axios.put( `/posts/${post._id}`, {
          username:user.username,
           title, 
           desc
        }).then(()=>{
          setUpdateMode(false);
          toast.success("Blog has been updated ");
          
        })
    }catch(err){
      console.log(err);
      toast.error("Error while updating blog")
    }
  }
  const url = `https://source.unsplash.com/1000x500/?${post.categories}`
  return (
    <div className='single-post'>
      <div className="single-post-wrapper">
        {

          post.photo ?
            <img className='single-post-img' src={post.photo} alt="Post" /> :
            <img className='single-post-img' src={url} alt="Post" />

        }
        {
          updateMode ? <input type="text" value={title} className='single-post-title-input' autoFocus onChange={(e)=> setTitle(e.target.value)} /> :
            (<h1 className="single-post-title">{title}
              {post.username === user.username &&
                <div className="single-post-edit"><i className="single-post-icon fa-solid fa-pen-to-square" onClick={handleEdit}></i>
                  <i className="single-post-icon fa-solid fa-trash-can" onClick={handleDelete}></i>
                </div>
              }
            </h1>)

        }
        <div className="single-post-info">

          <span className="single-post-author">Author :
            <Link to={`/?user=${post.username}`} className='link'>
              <b> {(post.username)}</b>
            </Link>
          </span>
          <span className="single-post-date">{post.createdAt}</span>
        </div>

        {
          updateMode ? <textarea className='single-post-desc-input' value={desc} onChange={(e)=> setDesc(e.target.value)}/> :(

            <p className="single-post-desc">

          {desc}
        </p>
          )
        }
        {
          updateMode &&
        <button className='single-post-button' onClick={handleUpdate}>Update</button>
      }


      </div>
    </div>
  )
}
