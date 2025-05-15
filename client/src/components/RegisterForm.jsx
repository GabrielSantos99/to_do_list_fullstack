import { useState } from "react";
import api from "../services/api";

export default function RegisterForm({ onRegister }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('users/register', formData);
            onRegister?.();
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao registrar');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold text-gray-500">Cadastre-se</h2>
            <p className="text-sm text-gray-400 text-left">
                Nome:
                <input
                    type="text"
                    placeholder="Digite seu nome"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </p>
            <p className="text-sm text-gray-400 text-left">
                Email:
                <input
                    type="text"
                    placeholder="Digite seu email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </p>
            <p className="text-sm text-gray-400 text-left">
                Senha:
                <input
                    type="text"
                    placeholder="Digite sua senha"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </p>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Cadastrar
            </button>
        </form>

    );
}