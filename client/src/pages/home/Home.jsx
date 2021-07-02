import React, { useEffect, useState } from 'react';
import "./home.css";
import Header from "../../components/header/Header"
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import Axios from '../../axios/axios';
import { useLocation } from 'react-router-dom';




export default function Home() {
    
    const location = useLocation();
    const search = location.search;

    const [posts, setPosts] = useState([]);

    useEffect( () =>{
        const fetchPosts = async()=>{
            try {
                const res = await Axios.get("/posts"+search);
                 setPosts(res.data);
            } catch (error) {
                console.log(error.response)
            }
        }
        fetchPosts();
    }, [search]);

    return (
        <>
            <Header />
            <div className="home">
                <Posts posts = {posts}/>
                <Sidebar />
            </div>
        </>
    )
}
