export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    token?: string;
}

export type UserResponse = {
    name: string;
    email: string;
    token?: string;
}

export type CreateUserRequest = {
    name: string;
    email: string;
    password: string;
}

export type LoginUserRequest = {
    email: string;
    password: string;
}

export type UpdateUserRequest = {
    name?: string;
    password?: string;
}

export function toUserResponse(user: any): UserResponse {
    return {
        name: user.name,
        email: user.email,
    }
}