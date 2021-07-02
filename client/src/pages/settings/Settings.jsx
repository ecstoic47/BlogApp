import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import Axios from "../../axios/axios";


export default function Settings() {

  const PF = "http://localhost:5000/images/"
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    dispatch({type:"UPDATE_START"});
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username, email, password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await Axios.post("/upload", data);

      }
      catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await Axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    }
    catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }


  }


  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ?URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            name="name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit" onClick={handleSubmit}>
            Update
          </button>
          {success && (
            <span style={{color:"green", textAlign:"center", marginTop:"20px"}}>Profile has been updated..</span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}