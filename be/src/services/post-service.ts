import { FieldPacket } from "mysql2";
import pool from "../config/db";
import { CreatePostRequest, Post, PostResponse, PostsResponseWithComments, toPostResponse } from "../model/post-model";
import { User } from "../model/user-model";
import { postSchema } from "../validation/post-schema";

export class PostService {
    static async createPost(user: User, request: CreatePostRequest): Promise<PostResponse> {
        const createPostRequest = await postSchema.validate(request);
        const [result] = await pool.execute(
            `INSERT INTO posts (title, content, image, user_id) VALUES (?,?,?,?)`,
            [createPostRequest.title, createPostRequest.content, createPostRequest.image, user.id]
        );
        const postId = (result as any).insertId;

        const [rows] = await pool.execute(
            `SELECT id, title, content, image, user_id FROM posts WHERE id = ?`,
            [postId]
        );
        const post = (rows as Post[])[0];
        return toPostResponse(post);
    }

    static async getAllPosts(user: User): Promise<PostsResponseWithComments[]> {
        const query = `
            SELECT 
                p.id AS post_id,
                p.title AS post_title,
                p.content AS post_content,
                p.image AS post_image,
                u.id AS user_id,
                u.name AS user_name,
                u.email AS user_email,
                c.id AS comment_id,
                c.comment AS comment_content,
                c.user_id AS comment_user_id,
                cu.name AS comment_user_name,
                cu.email AS comment_user_email
            FROM posts p
            JOIN users u ON p.user_id = u.id
            LEFT JOIN comments c ON p.id = c.post_id
            LEFT JOIN users cu ON c.user_id = cu.id;
        `;

        const [rows] = await pool.query(query) as [any[], FieldPacket[]];

        const postsMap = new Map<number, PostsResponseWithComments>();

        rows.forEach(row => {
            const postId = row.post_id;
            if (!postsMap.has(postId)) {
                postsMap.set(postId, {
                    title: row.post_title,
                    content: row.post_content,
                    image: row.post_image,
                    user: {
                        id: row.user_id,
                        name: row.user_name,
                        email: row.user_email
                    },
                    comments: []
                });
            }

            if (row.comment_id) {
                postsMap.get(postId)!.comments.push({
                    id: row.comment_id,
                    content: row.comment_content,
                    user: {
                        id: row.comment_user_id,
                        name: row.comment_user_name,
                        email: row.comment_user_email
                    }
                });
            }
        });

        return Array.from(postsMap.values());
    }
}
