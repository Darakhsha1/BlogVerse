import express from "express"
import postRoutes from "./routes/post.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import "dotenv/config";
import path from "path";
import upload from "./middleware/multer.js";

const app=express()
app.use(cors(
    {
         origin: "http://localhost:5173",
    credentials: true
    }
))
app.use(cookieParser())
app.use(express.json())
app.post('/upload',upload.single("image"),function(req,res)
{
       res.status(200).json("Image has been uploaded");
}
)
app.use("/api/posts",postRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.listen(8800,()=>{
    console.log("connected to conn")
})