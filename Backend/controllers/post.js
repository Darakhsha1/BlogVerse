import { db } from "../db.js";
import jwt from "jsonwebtoken"
import uploadOnCloudinary from "../upload/cloudinary.js";

export const getPosts=(req,res)=>{
  const q=req.query.cat?"SELECT *FROM posts WHERE category=?":"SELECT * FROM posts";
  db.query(q,[req.query.cat],(err,data)=>{
    if(err) return res.status(500).send(err);
    return res.status(200).json(data)
  })
}
export const getPost = (req, res) => {
    const q = `
        SELECT
            p.id,
            u.username,
            p.title,
            p.descr,
            p.image,
            u.image AS userImg,
            p.category,
            p.datee
        FROM users u
        JOIN posts p ON u.id = p.uid
        WHERE p.id = ?
    `;

    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            console.log("GET POST ERROR:", err);
            return res.status(500).json(err);
        }

        if (data.length === 0) {
            return res.status(404).json("Post not found");
        }

        console.log("GET POST DATA:", data[0]);

        return res.status(200).json(data[0]);
    });
};
export const addPost = (req, res) => {
    const token = req.cookies.access_token;
  

    if (!token) {
        return res.status(401).json("Not authenticated");
    }

    jwt.verify(token, "jwtkey", async (err, userInfo) => {

        if (err) return res.status(403).json("Token invalid");

        try {
           let imageUrl = "";

if (req.file) {
   
    const image = await uploadOnCloudinary(req.file.path);
   

    if (!image) {
        return res.status(500).json("Image upload failed");
    }

    imageUrl = image.secure_url;
}

            const q = `
            INSERT INTO posts(title, descr, image, category, datee, uid)
            VALUES(?,?,?,?,?,?)
            `;

            db.query(
                q,
                [
                    req.body.title,
                    req.body.desc,
                    imageUrl,
                    req.body.cat,
                    req.body.date,
                    userInfo.id,
                ],
                (err, data) => {
                    if (err) return res.status(500).json(err);

                    return res.status(200).json("Post created");
                }
            );

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }

    });
};

export const deletePost=(req,res)=>{
   const token=req.cookies.access_token
   if(!token)
   {
    return res.status(401).json("Not authenticated!")
   }
   jwt.verify(token,"jwtkey",(err,userInfo)=>{
    if(err) return res.status(403).json("Token invalid")
        const postId=req.params.id;
    const q="DELETE FROM posts WHERE `id`=? AND `uid`=?"
    db.query(q,[postId,userInfo.id],(err,data)=>{
        if(err) return res.status(403).json("You can delete yours")
   return res.json("Post has been deleted!");
        })
   })
}
export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    console.log(1);
    if (!token) {
        console.log(2);
        return res.status(401).json("Not authenticated");
    }
   console.log(4);
    jwt.verify(token, "jwtkey", async (err, userInfo) => {

        if (err) {
            console.log(3);
            return res.status(403).json("Token invalid");
        }

        try {
            const postId = req.params.id;
               console.log(5);
            // 1. Get old image
            const getPost = "SELECT image FROM posts WHERE id=? AND uid=?";
          console.log("postId =", postId);
console.log("userId =", userInfo.id);
            db.query(getPost, [postId, userInfo.id], async (err, data) => {
 console.log(6);
                if (err) {
                    console.log(7);
                    return res.status(500).json(err);
                }

                if (data.length === 0) {
                    console.log(8);
                    return res.status(404).json("Post not found");
                }

                // 2. Keep old image by default
                let imageUrl = data[0].image;

                // 3. If user uploaded new image
                if (req.file) {
                 console.log(9);
                    const image = await uploadOnCloudinary(req.file.path);

                    if (!image) {
                        console.log(10);
                        return res.status(500).json("Image upload failed");
                    }

                    // Replace old image
                    imageUrl = image.secure_url;
                }

                // 4. Update post
                const q = `
                    UPDATE posts
                    SET title=?, descr=?, image=?, category=?
                    WHERE id=? AND uid=?
                `;

                db.query(
                    q,
                    [
                        req.body.title,
                        req.body.descr,
                        imageUrl,
                        req.body.cat,
                        postId,
                        userInfo.id
                    ],
                    (err, data) => {

                        if (err) {
                            console.log(err);
                            return res.status(500).json(err);
                        }
         console.log(12);
                        return res.status(200).json("Post updated");
                    }
                );
            });

        } catch (err) {
            console.log(14);
            console.log(err);
            return res.status(500).json(err);
        }
    });
};