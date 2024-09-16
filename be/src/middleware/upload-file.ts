import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req : any , file : any) => "png",
    public_id: (req : any, file : any) => file.originalname, 
  } as any,
});

// Middleware multer
const upload = multer({ storage });

export default upload;
