import express from 'express';
import { UserController } from '../controllers/user-controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { PostController } from '../controllers/post-controller';
import upload from '../middleware/upload-file';

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

apiRouter.patch("/api/users/current", UserController.update);

apiRouter.post("/api/posts", upload.single("image"), PostController.createPost);
apiRouter.get("/api/posts", PostController.getAllPosts);