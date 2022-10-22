import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';
import axios from 'axios';


const Write = () => {

  const state = useLocation().state
  const [value, setValue] = useState(state?.title || '');
  const [title, setTitle] = useState(state?.desc || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await axios.post("/api/upload", formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
  const handleClick = async e => {
    e.preventDefault()
    // const imgUrl = await upload()
    const imgUrl = "";
    try {
      state ? await axios.put(`/api/posts/${state.id}`, {
        title,
        desc: value,
        cat,
        img: file ? imgUrl : ""
      }) : await axios.post(`/api/posts/`, {
        title,
        desc: value,
        cat,
        img: file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      })
      navigate("/")

    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='add'>
      <div className='content'>
        <input type="text" value={title} placeholder='Title' onChange={e => setTitle(e.target.value)} />
        <div className='editorContainer'>
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className='menu'>
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b>Draft
          </span>
          <span>
            <b>Visibility: </b>Public
          </span>
          <input style={{ display: "none" }} type="file" name="" id="file" onChange={e => setFile(e.target.files[0])} />
          <label className="file" htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === "food"} name="cat" value="food" id="food" onChange={e => setCat(e.target.value)} />
            <label htmlFor="food">Food</label></div>
          <div className="cat">
            <input type="radio" checked={cat === "travel"} name="cat" value="travel" id="travel" onChange={e => setCat(e.target.value)} />
            <label htmlFor="travel">Travel</label></div>
          <div className="cat">
            <input type="radio" checked={cat === "cloth"} name="cat" value="cloth" id="cloth" onChange={e => setCat(e.target.value)} />
            <label htmlFor="cloth">Cloth</label></div>
          <div className="cat">
            <input type="radio" checked={cat === "photo"} name="cat" value="photo" id="photo" onChange={e => setCat(e.target.value)} />
            <label htmlFor="photo">Photo</label></div>
        </div>
      </div>
    </div>
  )
}

export default Write