
import "./topbar.css";
//import smoke from './images/smoke.png';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { Context } from "../../context/Context";



export default function TopBar() {
    
    const PF = "http://localhost:5000/images/";

    const {user, dispatch} = useContext(Context)

    const Logout = async (e) => {
        e.preventDefault();
        
        try {
            dispatch({ type: "LOGOUT_SUCCESS"});
            window.location.replace("/");
        } catch (error) {
            dispatch({ type: "LOGOUT_FAILURE" })
        }
    }

    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
                <i className="topIcon fab fa-pinterest"></i>
                <i className="topIcon fab fa-instagram-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/">HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/">ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/">CONTACT</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/write">WRITE</Link>
                    </li>
                    <li className="topListItem" onClick={Logout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="topRight">

                { user ? (
                    <Link to="/settings">
                        <img className="topImg" src={PF + user.profilePic} alt="" />
                    </Link>
                ):
                 <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/login">LOGIN</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/register">REGISTRATION</Link>
                    </li>
                 </ul>
                
                }

                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}
