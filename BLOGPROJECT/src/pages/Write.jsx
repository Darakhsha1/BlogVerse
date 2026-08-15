import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
const Write=()=>{
  axios.defaults.withCredentials = true;
     const state=useLocation().state
     const navigate = useNavigate();
   const [value, setValue] = useState(state?.descr||"");
   const [title,setTitle]=useState(state?.title||"");
   const [file,setFile]=useState(null);
   const [cat,setCat]=useState(state?.category||"");
   const handleClick=async e=>{
    e.preventDefault()
    const formData = new FormData();
    
  if(title) formData.append("title", title);
  if(value) formData.append("descr", value);
  if(cat) formData.append("cat", cat);
  if(file) formData.append("image", file);
 try {
    if (state) {
        console.log("1. Updating post:", state.id);

        const res = await axios.put(
            `/api/posts/${state.id}`,
            formData,
            {
                withCredentials: true
            }
        );

        console.log("2. UPDATE SUCCESS:", res.data);

        console.log("3. Going to:", `/post/${state.id}`);

        navigate(`/post/${state.id}`);
    } else {
        console.log("Creating post");

        await axios.post(
            `/api/posts`,
            formData,
            {
                withCredentials: true
            }
        );

        navigate("/");
    }
} catch (err) {
    console.log("ERROR:", err);
}

};
    return (
       <div className="add">
        <div className="content">
           <input
  type="text"
  placeholder="Title" value={title}
  onChange={e => setTitle(e.target.value)}
/>
            <div className="editorCont">
                <ReactQuill
  theme="snow"
  value={value}
  onChange={setValue}
/>
            </div>
        </div>
        <div className="menu">
            <div className="item">
                <h1>Publish</h1>
                <span><b>Status: </b> Draft</span>
                <span>Visibility:</span>
                <input style={{display:"none"}}type="file" name="" id="file"  onChange={(e) => setFile(e.target.files[0])}/>
                <label className="file" htmlFor="file">Upload</label>
                <div className="buttons">
                    <button >Save as draft</button>
                        <button onClick={handleClick}>Publish</button>
                </div>
            </div>
            <div className="item">
                <h1>Category</h1>
                <div className="cat">
                <input type="radio" checked={cat==="Art"} name="cat" value="art" id="art" onChange={e=>setCat(e.target.value)} />
                <label htmlFor="art">Art</label>
                </div>
                <div className="cat">
                 <input type="radio" name="cat" checked={cat==="technology"} value="technology" id="technology" onChange={e=>setCat(e.target.value)} />
                <label htmlFor="art">technology</label>
                </div>
                <div className="cat">
                 <input type="radio" name="cat" checked={cat==="cinema"} value="cinema" id="cinema" onChange={e=>setCat(e.target.value)}/>
                <label htmlFor="art">cinema</label>
                </div>
                <div className="cat">
                 <input type="radio" name="cat" checked={cat==="science"}value="science" id="science" onChange={e=>setCat(e.target.value)}/>
                <label htmlFor="art">science</label>
                </div>
                <div className="cat">
                 <input type="radio" name="cat" checked={cat==="design"} value="design" id="design" onChange={e=>setCat(e.target.value)}/>
                <label htmlFor="design">Design</label>
                </div>
            </div>
        </div>

       </div>

    )
}
export default Write