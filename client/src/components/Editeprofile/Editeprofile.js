import React, { useState } from "react";
import "./editeProfile.css";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../actions/user";
export default function EditeProfile() {
    //
    const user = JSON.parse(localStorage.getItem("profile"));
    const dispatch = useDispatch();
    const User = useSelector((state) => state.auth.authData);
    console.log();
    const [editeUser, setEditeUser] = useState({});
    const handlChange = (e) => {
        setEditeUser({ ...editeUser, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(User, editeUser));
    };
    
    return !user ? (
        <h1>Loading</h1>
    ) : (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm">
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src="https://gurukulsivasagar.org.in/assets/img/governingbody/pcrajkhowa.png" 
                        alt="" />
                        {/* <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label> */}
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                        />
                    </div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={user?.result?.name}
                        placeholder="name"
                        onChange={handlChange}
                    />
                    <label>Email</label>
                    <input
                        autoFocus={true}
                        type="email"
                        name="email"
                        defaultValue={user?.result?.email}
                        placeholder="email@gmail.com"
                        onChange={handlChange}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        defaultValue={user?.result?.password}
                        onChange={handlChange}
                    />
                    <button className="settingsSubmit" onClick={handleSubmit}>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}