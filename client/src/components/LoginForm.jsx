import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ toggleToRegister }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const authProvider = useAuth();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        })); 
    } ;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            authProvider.login(formData);
            navigate("/tasks");
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
                name="email"
                placeholder="Digite seu E-mail"
                onChange={handleInput}
                className="border p-2 w-full mb-2"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Digite sua senha"
                onChange={handleInput}
                className="border p-2 w-full mb-2"
                required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Entrar
            </button>
            <p className="text-sm text-center py-2">
                Não tem conta? {' '}
                <button
                    type="button"
                    onClick={toggleToRegister}
                    className="text-blue-500 hover:underline"
                >
                    Cadastre-se
                </button>
            </p>
        </form>
    );
}
