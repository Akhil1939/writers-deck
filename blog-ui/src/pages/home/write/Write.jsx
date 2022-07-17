import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Context } from '../../../context/Context'
import './Write.css'
import { toast} from 'react-toastify';


export default function Write() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const { user } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            username: user.username,
            title,
            desc
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("/upload", data)
            } catch (err) {
                console.log(err)
            }
        }
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
    return (
        <div className='write'>
            {
                file && (
                    <img className='write-img' src={URL.createObjectURL(file)} alt="" />
                )

            }
            {/* <img className='write-img' src="https://source.unsplash.com/1000x500/?blog,nature,bird,animal" alt="" /> */}
            <form action="" className="write-form" onSubmit={handleSubmit}>
                <div className="write-form-group">
                    <label htmlFor="file-input"><i className="write-form-file-icon fa-solid fa-plus"></i></label>
                    <input type="file" id='file-input' style={{ display: "none" }}
                        onChange={e => setFile(e.target.files[0])}
                    />

                    <input value={title} className='write-input' type="text" placeholder='Title' autoFocus={true} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="write-form-group">
                    <textarea value={desc} className='write-input write-text' placeholder='Tell Your Story' type="text" onChange={e => setDesc(e.target.value)}></textarea>
                </div>
                <button className="write-submit" type='submit'>Publish</button>
            </form>


        </div>
    )
}
