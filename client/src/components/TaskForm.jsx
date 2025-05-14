import { useEffect, useState } from "react";
import api from "../services/api";

export default function TaskForm({ onTaskCreated, editingTask, clearEditingTask }) {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        status: '',
    });

    const [statusOptions, setStatusOptions] = useState([]);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const response = await api.get('tasks/statuses');
                setStatusOptions(response.data);
                if (!editingTask && response.data.length > 0) {
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
    }, [editingTask]);

    useEffect(() => {
        if (editingTask) {
          setTaskData({
            title: editingTask.title,
            description: editingTask.description,
            status: editingTask.status,
          });
        } else {
          setTaskData({
            title: '',
            description: '',
            status: statusOptions[0] || '',
          });
        }
      }, [editingTask, statusOptions]);

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
            if (editingTask) {
                await api.put(`tasks/${editingTask.id}`, taskData);
                clearEditingTask();
            } else {
                await api.post('tasks/', taskData);
            }
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
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow-md mb-6 space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={taskData.title}
            onChange={handleInput}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            value={taskData.description}
            onChange={handleInput}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            name="status"
            value={taskData.status}
            onChange={handleInput}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {editingTask ? "Atualizar" : "Adicionar"}
            </button>
            {editingTask && (
              <button
                type="button"
                onClick={clearEditingTask}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
    );
}
