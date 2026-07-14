import {createContext} from "react";
import type {User} from "../types/user.ts";

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export default AuthContext;