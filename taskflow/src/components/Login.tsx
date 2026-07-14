// components/Login.tsx

import { useState } from "react";
import { useAuth } from "../hooks/useAuth.ts";

export default function Login() {
    const { login } = useAuth();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await login(name, password);
        } catch {
            setError("Wrong name/passvard!");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <input
                type="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
                Login
            </button>

            {error && <p>{error}</p>}
        </form>
    );
}