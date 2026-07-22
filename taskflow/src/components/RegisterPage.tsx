import {useState} from "react";
import {useAuth} from "../hooks/useAuth.ts";
import api from "../services/api.ts"; //*

export default function RegisterPage() {
    const {register} = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [cleanFields, setCleanFields]=useState("");

    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        async function register(username: string, password: string){
            await api.post("/users",{
                username,
                password,
            })
        }

        try {
            await register(username, password);//*
        } catch(err) {
            setError(err.message);//*
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>

            <input
                type="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
                Register
            </button>

            {error && <p>{error}</p>}
        </form>
    );
}