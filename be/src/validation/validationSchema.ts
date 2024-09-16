import * as Yup from 'yup';

export interface RegisterSchema {
    name: string;
    email: string;
    password: string;
}

export interface LoginSchema {
    email: string;
    password: string;
}

export const registerSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .min(4, 'Password must be at least 4 characters')
        .required('Password is required'),
});

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .min(4, 'Password must be at least 4 characters')
        .required('Password is required'),
});

export const updateSchema = Yup.object().shape({
    name: Yup.string().optional(),
    password: Yup.string().optional(),
});