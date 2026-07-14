import {type ReactNode, useState} from "react";
import type {User} from "../types/user.ts";
import api from "../services/api.ts";
import AuthContext from "./AuthContext.tsx";

interface UserWithPassword extends User {
    password: string;
}

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    const login = async (name: string, password: string) => {
        const users=await api.get("/users");

        const foundUser=(users as UserWithPassword[]).find((u)=>
            u.name === name
            &&
            u.password===password);

        if (!foundUser){
            throw new Error("Wrong email/password!")
        }

        //Simulated JWT
        const mockToken=crypto.randomUUID();

        localStorage.setItem("token", mockToken);

        setToken(mockToken);

        const {password: _, ...userWithPassword}=foundUser;

        setUser(userWithPassword);

        /*const res = await api.post('/auth/login', { email, password })
        const { user, token } = res.data
        localStorage.setItem('token', token)
        setToken(token)
        setUser(user)*/
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;