import "./register.css"
import { useState } from "react";
import Axios from "../../axios/axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e)=>{
    
     setError(false);
     e.preventDefault();
     try{
       const res = await Axios.post("/auth/register", {
         username,
         email,
         password
       });
       
       res.data && window.location.replace("/login");

     }
     catch(err){
      setError(true)
     }
     
  }


  

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit = {handleSubmit}>
        <label>Username</label>
        <input className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange = {e=>setUsername(e.target.value)}
        />
        <label>Email</label>
        <input className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={e => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={e => setPassword(e.target.value)}

        />
        <button className="registerButton" type = "submit" >Register</button>
        {error && <span style={{padding:"10px", color:"red"}}>Somthing is wrong</span>}
      </form>
      <button className="registerLoginButton">Login</button>
    </div>
  )
}