import { useEffect, useState } from "react";
import api from "../services/api";

export default function TaskList({ onTaskDeleted, onEdit }) {
    const [tasks, setTasks] = useState([]);
  
    const fetchTasks = async () => {
      try {
        const response = await api.get('/');
        setTasks(response.data);
      } catch (err) {
        console.error("Erro ao carregar tarefas: ", err);
      }
    };
  
    const deleteTask = async (id) => {
      try {
        await api.delete(`/${id}`);
        onTaskDeleted();
      } catch (err) {
        console.error("Erro ao excluir tarefa: ", err);
      }
    };
  
    useEffect(() => {
      fetchTasks();
    }, []);
  
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-xl mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-700">Minhas Tarefas</h2>
        <ul className="text-gray-600 space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="bg-gray-100 p-4 rounded flex justify-between items-center">
              <div>
                <strong>{task.title}</strong> - {task.status}
              </div>
              <div className="flex gap-2">
                <button onClick={() => onEdit(task)} className="text-blue-600">Editar</button>
                <button onClick={() => deleteTask(task.id)} className="text-red-600">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  