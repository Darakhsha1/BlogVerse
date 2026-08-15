import React from "react";
import edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import { Link,useLocation, useNavigate } from "react-router-dom";
import Menu from "../Components/Menu";
import moment from "moment"
import axios from "axios";
import { AuthContext } from "../context/authContext.jsx";
import { useContext,useState,useEffect} from "react";
import { Navigate } from "react-router-dom";
const Single=()=>{
    const [post,setPost]=useState({});
     const location=useLocation();
     const postId=location.pathname.split("/")[2];
     const navigate=useNavigate()
     const curruser=useContext(AuthContext)
     console.log(curruser);
      useEffect(()=>{
      const fetchData=async()=>{
        try{
       const res = await axios.get(`/api/posts/${postId}`);
    console.log("SINGLE POST:", res.data);
    setPost(res.data);
        }
        catch(err){
         console.log(err)
        }
      }
      fetchData();
      },[postId]);
      const handleDelete=async()=>{
          try{
      await axios.delete(`/api/posts/${postId}`);
                                 navigate("/") ;                                                                     
        }
        catch(err){
         console.log(err)
        }

      }
      console.log("POST:", post);
console.log("POST ID:", post.id);
console.log("POST USERNAME:", post.username);
console.log("CURRENT USERNAME:", curruser?.currentUser?.username);
    return (
       <div className="single">
        <div className="content">
             <img src={post?.image} />
             <div className="user">
               {post.userImg&& <img src={post.userImg}/>}
                <div className="info">
                    <span>{post.username}</span>
                    <p>Posted {moment(post.datee).fromNow()}</p>
                </div>
                {post?.id && curruser?.currentUser?.username===post?.username&&(<div className="change">
                    <Link to={`/write?edit=${postId}`} state={post} >
                     <img src={edit}/></Link>
                    <img onClick={handleDelete} src={Delete}/>
                </div>
    )}
            </div>
            <h1>{post.title}</h1>
            <p>{post.descr}</p>
       <Menu cat={post.category}/>
       </div>
       </div>
    )
}
export default Single