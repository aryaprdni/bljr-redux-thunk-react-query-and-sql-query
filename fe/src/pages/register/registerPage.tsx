import React from "react"
import { register } from "../../features/auth/thunk";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from 'react-redux';

export const RegisterPage = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    });
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(register(formData));
    }
    const auth = useSelector((state: RootState) => state.auth);
    console.log('auth: ', auth);
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email"/>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password"/>
            <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
            {error && <p>{error}</p>}
        </form>
    )
}