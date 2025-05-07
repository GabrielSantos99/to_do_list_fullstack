import { useEffect, useState } from "react";
import api from "../services/api";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/');
            setTasks(response.data);
        } catch (err) {
            console.error("Erro ao carregar tarefas: ", err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-xl mb-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-700">Minhas Tarefas</h2>
            <ul className="text-gray-600">
                {tasks.map((task) => (
                    <li key={tasks.id}>{task.title} - {task.status}</li>
                ))}
            </ul>
        </div>
    )
}
