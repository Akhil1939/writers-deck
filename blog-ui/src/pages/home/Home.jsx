import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import Header from '../../components/Header/Header';
import Posts from '../../components/Posts/Posts';
import SideBar from '../../components/sidebar/SideBar';
import "./home.css";
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();



  useEffect(() => {
    const fetchPosts = async () => {
      await axios.get("/posts" + search).then(res => {
        const posts = res.data;
        // console.log(posts);
        setPosts(res.data)

      })

    }
    fetchPosts();
  }, [search])

  return (
    <>
    <ToastContainer />
      <Header />
      <div className='home'>
        <Posts posts={posts} />
        <SideBar />


      </div>
    </>
  )
}
