export type Post = {
    id: number;
    title: string;
    content: string;
    image: string;
    user_id: number;
}

export type PostResponse = {
    title: string;
    content: string;
    image: string;
    user_id: number;
}

export type CreatePostRequest = {
    title: string;
    content: string;
    image: string;
    user_id: number;
}

export function toPostResponse(post: Post): PostResponse {
    return {
        title: post.title,
        content: post.content,
        image: post.image,
        user_id: post.user_id
    }
}

export type User = {
    id: number;
    name: string;
    email: string;
}

export type Comments = {
    id: number;
    content: string;
    user: User
}

export type PostsResponseWithComments = {
    title: string;
    content: string;
    image: string;
    user: User;
    comments: Comments[]
}

export function toPostResponseWithComments(post: Post, user: User): PostsResponseWithComments {
    return {
        title: post.title,
        content: post.content,
        image: post.image,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        comments: []
    }
}