import { useState } from "react";
import api from "../services/api";

export default function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('users/login', { email, password });
            const token = res.data.token;
            onLogin(token);
        } catch (err) {
            setError('Login falhou. Verifique suas credenciais.');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
            <h2 className="text-xl mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="email"
                placeholder="Digite seu E-mail"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                className="border p-2 w-full mb-2"
                required
            />
            <input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                className="border p-2 w-full mb-2"
                required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Entrar
            </button>
        </form>
    );
}
