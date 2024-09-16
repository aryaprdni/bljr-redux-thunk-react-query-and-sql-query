import { API } from "../../libs/axios";

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export const registerApi = (userData: RegisterData) => API.post('/users', userData);
export const loginApi = (userData: LoginData) => API.post('/users/login', userData);