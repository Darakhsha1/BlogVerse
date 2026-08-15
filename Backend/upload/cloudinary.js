import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

    // Configuration
  cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  
});
const uploadOnCloudinary= async (localfilepath)=>{
    try{
        if(!localfilepath) return null;
        const response =await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })
        //file uploaded
        console.log("File uploaded");
        fs.unlinkSync(localfilepath); 
         return response;

    }
    catch(error){
        console.log(error)
        fs.unlinkSync(localfilepath);
        //file couldnt upload so delete it from local server
        return null;


    }
}
export default uploadOnCloudinary;