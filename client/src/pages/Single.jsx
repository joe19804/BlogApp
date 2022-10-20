import React,{useState, useContext} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/authContext";
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import Menu from "../components/Menu";
import moment from "moment";
import axios from "axios"



const Single = () => {
  const [post,setPost] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const {currentUser} = useContext(AuthContext);

  const handleDelete = async () =>{
    try{
      await axios.delete(`/posts/${postId}`);
      navigate("/")
    }catch(err){
      console.log(err);
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='single'>
      <div className='content'>
        <img src={`../upload/${post?.img}`} alt="" />
      <div className='user'>
        {post.userImg && <img src={post.userImg} alt="" />}
      <div className="info">
        <span>{post.username}</span>
        <p>Posted {moment(post.data).fromNow()}</p>
      </div>
      {currentUser.username === post.username && (
        <div className='edit'>
          <Link to={`/write?edit=2`} state={post}>
            <img src={Edit} alt="" />
          </Link>
          <img onclick={handleDelete} src={Delete} alt="" />
        </div>
      )}
      </div>
      <h1>{post.title}</h1>
        {getText(post.desc)}
      </div>
      <div className="menu">
        <Menu cat={post.cat}/>
      </div>
    </div>
  )
}

export default Single