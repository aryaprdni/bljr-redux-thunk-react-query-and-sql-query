export interface User {
    id: number;
    name: string;
    email: string;
    token: string;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}