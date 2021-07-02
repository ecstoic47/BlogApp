import React ,{useState, useEffect}from 'react'
import './sidebar.css';
import Axios from '../../axios/axios'
import { Link } from 'react-router-dom';


function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async ()=>{
            const res = await Axios.get("/categories");
            setCats(res.data);
        }
        getCats();
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg" alt="" />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi similique repellendus expedita perferendis in, nulla quasi amet obcaecati.</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATAGORIES</span>
                <ul className="sidebarList">
                  {cats.map(c=>(
                      <Link className="link" to = {`/?cat=${c.name}`}> <li className="sidebarListItem">{c.name}</li> </Link>
                     
                  ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <div className="sidebarTitle">FOLLOW US</div>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                    <i className="sidebarIcon fab fa-pinterest"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
