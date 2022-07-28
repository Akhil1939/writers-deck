import React, { useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

import SideBar from '../../components/sidebar/SideBar'
import { Context } from '../../context/Context'
import './Settings.css'
import { useNavigate } from 'react-router'

export default function Settings() {
    const navigate = useNavigate();
    const { user, dispatch } = useContext(Context)
    let [profilePic, setProfilePic] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [updatePic, setUpdatePic] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "Update_start" })
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
            profilePic,
        };
        try {
            await axios.put("/users/" + user._id, updatedUser).then((res) => {
                dispatch({ type: "Update_Success", payload: res.data })
                toast.success("Profile has been updated ");
            });

        } catch (err) {
            console.log(err);
            dispatch({ type: "Update_Failure" })
            toast.error("something went wrong ")
        }

    }

    const update = (e) => {
        setProfilePic(false);
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
            setProfilePic(reader.result);
            setUpdatePic(true)

        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };

    }

    const handleDelete = async () => {
        try {

            await axios.delete(`/users/${user._id}`, { data: { userId: user._id } }).then(() => {
                dispatch({ type: "Logout" })
                navigate('/');
                toast.success("Account has been deleted ");
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
                        {updatePic ?
                            <img src={profilePic} alt="" /> :
                            <img src={user.profilePic} alt="" />

                        }
                        <label htmlFor="file-input"><i className="settings-profile-icon fa-solid fa-circle-user"></i></label>
                        <input
                            type="file"
                            id='file-input'
                            style={{ display: "none" }}
                            onChange={update}
                        />
                    </div>
                    <label htmlFor="username">User Name</label>
                    <input
                        type="text"
                        placeholder={user.username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <label htmlFor="email">email</label>
                    <input
                        type="email"
                        placeholder={user.email}
                        onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        onChange={e => setPassword(e.target.value)} />

                    <button className="settings-submit" type='submit'>Update</button>

                </form>
            </div>
            <SideBar />
        </div>
    )
}
