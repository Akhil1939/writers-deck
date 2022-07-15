import React from 'react'
import Post from '../Post/Post'
import './Posts.css'

export default function Posts({ posts }) {
    return (
        <div className="posts">
            {posts.map((e) => {
                return(
                    <Post post={e} />
                    
                );
            })}

        </div>
    );
}
