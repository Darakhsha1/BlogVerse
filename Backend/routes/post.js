import express from "express"
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.js"
import upload from "../middleware/multer.js";
const router=express.Router()
router.get("/",getPosts)
router.get("/:id",getPost)
router.post("/", upload.single("image"), addPost);
router.delete("/:id",deletePost)
router.put("/:id", upload.single("image"),updatePost)
export default router
