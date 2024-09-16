import { NextFunction, Response } from "express";
import { CreatePostRequest } from "../model/post-model";
import { PostService } from "../services/post-service";
import { UserRequest } from "../type/user-request";
import CloudinaryConfig from "../libs/cloudinary";

export class PostController {
    
    static async createPost(req: UserRequest, res: Response, next: NextFunction) {
        try {
            let request: CreatePostRequest = {
                ...req.body,
                image: null
            }

            if (req.file) {
                const cloudinaryRes = await CloudinaryConfig.uploadImage(req.file.path);
                request.image = cloudinaryRes.secure_url; 
            }
            
            const response = await PostService.createPost(req.user!, request);
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e)
        }
    }

    static async getAllPosts(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await PostService.getAllPosts(req.user!);
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e)
        }
    }
}