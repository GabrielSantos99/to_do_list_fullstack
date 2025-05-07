import { useEffect, useState } from "react";
import api from "../services/api";

export default function TaskForm({onTaskCreated}) {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        status: '',
    });

    const [statusOptions, setStatusOptions] = useState([]);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const response = await api.get('/statuses');
                setStatusOptions(response.data);
                if (response.data.length > 0) {
                    setTaskData(prev => ({
                        ...prev,
                        status:response.data[0]
                    }));
                }
            } catch (err) {
                console.error("Erro ao buscar os status: ", err);
            }
        };
        fetchStatuses();
    }, []);

    const handleInput = async (e) => {
        const { name, value } = e.target;

        setTaskData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskData.title.trim()) return;

        try {
            await api.post('/', taskData);
            setTaskData({
                title: '',
                description: '',
                status: statusOptions[0] || '',
            });
            onTaskCreated();
        } catch (err) {
            console.log('Erro ao criar tarefa: ', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md max-w-xl mx-auto mb-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-700">Nova Tarefa</h2>
    
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={taskData.title}
            onChange={handleInput}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
    
          <input
            type="text"
            name="description"
            placeholder="Descrição da tarefa"
            value={taskData.description}
            onChange={handleInput}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
    
          <select
            name="status"
            value={taskData.status}
            onChange={handleInput}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
    
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Adicionar Tarefa
          </button>
        </form>
      );
}
