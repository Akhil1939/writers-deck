import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { Context } from '../../../context/Context'
import './Write.css'
import { toast} from 'react-toastify';


export default function Write() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [photo, setPhoto] = useState("")
    const [categories, setCategories] = useState([]);
    const { user } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            username: user.username,
            title,
            desc,
            photo,
            categories
        };
       
        try {
            await axios.post("/posts", newPost).then((res) => {
                window.location.replace("/post/" + res.data._id)
            toast.success("Blog has been added")
            });

        } catch (err) {
            console.log(err);
            toast.error("Error while writing blog")
        }

    }
    const  upload = (e)=> {
        // check max. file size is not exceeded
        // size is in bytes
        if (e.size > 2000000) {
          console.log("File too large");
          return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
    
        reader.onload = () => {
          // console.log(reader.result); //base64encoded string
          setPhoto(reader.result)
        };
        reader.onerror = error => {
          console.log("Error: ", error);
        };  
      }
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
        <div className='write'>
            {
                photo && ( 
                    <img className='write-img' src={photo} alt="" />
                )

            }
            {/* <img className='write-img' src="https://source.unsplash.com/1000x500/?blog,nature,bird,animal" alt="" /> */}
            <form action="" className="write-form" onSubmit={handleSubmit}>
                <div className="write-form-group">
                    <label htmlFor="file-input"><i className="write-form-file-icon fa-solid fa-plus"></i></label>
                    <input type="file" id='file-input' style={{ display: "none" }}
                        onChange={upload}
                    />

                    <input value={title} className='write-input' type="text" placeholder='Title' autoFocus={true} onChange={e => setTitle(e.target.value)} />
                    <div className="write-cat">
                        <select name="cat-1" id="" defaultValue="Category">
                            {cats.map((c) => (
                        
                            <option value={c.name} className="sidebar-list-item" onClick={e=> setCategories(e.target.value,0)}>{c.name}</option>
                        
 
                    ))}
                        </select>
                       
                    </div>
                </div>
                <div className="write-form-category">
                    <div className="write-form-category-group">
                        
                    </div>
                </div>
                <div className="write-form-group">
                    <textarea value={desc} className='write-input write-text' placeholder='Tell Your Story' type="text" onChange={e => setDesc(e.target.value)}></textarea>
                </div>
                <button className="write-submit" type='submit'>Publish</button>
            </form>


        </div>
    )
}
