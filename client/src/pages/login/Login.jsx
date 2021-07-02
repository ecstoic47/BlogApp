import { useRef, useContext} from "react";
import Axios from "../../axios/axios";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {

  const userRef = useRef();
  const passRef = useRef();

  const {user, dispatch, isFetching} = useContext(Context)
  
  const handleSubmit =async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try{
        const res = await Axios.post("/auth/login", {
          username: userRef.current.value,
          password:passRef.current.value
        });
        
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    }
    catch(err){
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }
  

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your username..." 
          ref ={userRef}
          />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..." 
          ref ={passRef}
          />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
      <button className="loginRegisterButton">Register</button>
    </div>
  );
}