
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import "./singlePost.css";
import Axios from '../../axios/axios'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function SinglePost() {

  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);

  const location = useLocation();
  const path = (location.pathname.split("/")[2]);

  const [post, setPost] = useState({});

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);


  useEffect(() => {
    const getPosts = async () => {
      const res = await Axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    }
    getPosts();
  }, [path]);

  const handleDelete = async () => {
    try {
      await Axios.delete(`/posts/${post._id}`, {
        data:
          { username: user.username }
      });
      window.location.replace("/");
    }
    catch (err) {
    }
  };

  const handleUpdate = async () => {
    try {
      await Axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
      window.location.reload();
    } catch (err) { }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo &&
          <img
            className="singlePostImg"
            src={PF + post.photo}
            alt=""
          />
        }
        {updateMode ?
          (
            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="singlePostTitle">
              {post.title}
              {post.username === user?.username &&

                <div className="singlePostEdit">
                  <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                  <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                </div>
              }
            </h1>
          )
        }

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author: <Link to={`/?user=${post.username}`} className="link"><b>{post.username}</b></Link>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>

        {updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)} /> : (
          <p className="singlePostDesc">
            {post.desc}
          </p>
        )}

        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}

      </div>
    </div>
  );
}
