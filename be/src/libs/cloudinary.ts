import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class CloudinaryConfig {
  static async uploadImage(imagePath: string): Promise<any> {
    try {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "uploads",
      });
      return result;
    } catch (error : any) {
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
  }
}

export default CloudinaryConfig;
