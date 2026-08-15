import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function Menu({category})
{
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
      const fetchData=async()=>{
        try{
       const res = await axios.get(`/api/posts/?cat=${category}`);
    
    setPosts(res.data);
        }
        catch(err){
         console.log(err)
        }
      }
      fetchData();
      },[category]);
     
    return(
        <div className="menu">
            <h1>Other posts u may like</h1>
            {posts.map((post)=>(
                <div className="post" key ={post.id}>
                    <img src={post.img}/>
                    <h2>{post.title}</h2>
                    <button>Read More</button>
                </div>
            ))}


        </div>
    )

}
export default Menu;