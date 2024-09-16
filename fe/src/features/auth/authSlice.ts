import { AnyAction } from "@reduxjs/toolkit/react";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "./action";
import { AuthState } from "./types";

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false
};

const authReducer = (state = initialState, action: AnyAction): AuthState => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isAuthenticated: true,
                error: null
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        
        default:
            return state
    }
}

export default authReducer