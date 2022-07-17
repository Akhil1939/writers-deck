import React, { useRef, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';

import SideBar from '../../components/sidebar/SideBar'
import { Context } from '../../context/Context'
import './Settings.css'
import { useNavigate } from 'react-router'

export default function Settings() {
    const PF = "http://localhost:5000/images/"
const navigate = useNavigate();
    const { user, dispatch } = useContext(Context)
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "Update_start" })
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("/upload", data)
            } catch (err) {
                console.log(err)
            }
        }
        try {
            await axios.put("/users/" + user._id, updatedUser).then((res) => {
                dispatch({ type: "Update_Success", payload: res.data })
                toast.success("Profile has been updated");
            });

        } catch (err) {
            console.log(err);
            dispatch({ type: "Update_Failure" })
            toast.error("something went wrong")
        }

    }

    const handleDelete = async () => {
        try {
    
          await axios.delete(`/users/${user._id}`, { data: { userId: user._id } }).then(() => {
            dispatch({ type: "Logout" })
            navigate('/');
            toast.success("Account has been deleted");
          });
        } catch (err) {
          console.log(err)
        }
    
      }
    return (
        <div className='settings'>
            <div className="settings-wrapper">
                <div className="settings-tittle">
                    <span className="settings-update-title">Update Your Account</span>
                    <span className="settings-delete-title" onClick={handleDelete}>Delete Account</span>
                </div>
                <form className="settings-form" onSubmit={handleSubmit}>
                    <label htmlFor="">Profile Picture</label>
                    <div className="settings-profile-picture">
                        <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
                        <label htmlFor="file-input"><i className="settings-profile-icon fa-solid fa-circle-user"></i></label>
                        <input
                            type="file"
                            id='file-input'
                            style={{ display: "none" }}
                            onChange={e => setFile(e.target.files[0])}
                        />
                    </div>
                    <label htmlFor="">User Name</label>
                    <input type="text" value={user.username}
                        onChange={e => setUsername(e.target.value)} />
                    <label htmlFor="">email</label>
                    <input type="email" value={user.email}
                        onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="">Password</label>
                    <input type="password"
                        onChange={e => setPassword(e.target.value)} />
                    <button className="settings-submit" type='submit'>Update</button>

                </form>
            </div>
            <SideBar />
        </div>
    )
}
