/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from "../../store/store";
import { loginApi, LoginData, registerApi, RegisterData } from "../api/authApi";
import { REGISTER_FAIL } from "./action";

export const register = (userData: RegisterData) => async (dispatch: AppDispatch) => {
    dispatch({ type: 'REGISTER_REQUEST' });
    try {
        const response = await registerApi(userData);
        console.log('response register: ', response);
        dispatch({ type: 'REGISTER_SUCCESS', payload: response.data.data});
    } catch (error: any) {
        dispatch({ type: REGISTER_FAIL, payload: error.response?.data?.message || error.message });
    }
};

export const login = (userData: LoginData) => async (dispatch: AppDispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
        const response = await loginApi(userData);
        console.log('response login: ', response);
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.data });
        localStorage.setItem('token', response.data.data.token);
    } catch (error: any) {
        dispatch({ type: REGISTER_FAIL, payload: error.response?.data?.message || error.message });
    }
}

export const logout = () => (dispatch: AppDispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
}