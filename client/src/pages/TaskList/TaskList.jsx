import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function TaskList({ onEdit }) {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearch] = useState('');
    const [reloadTrigger, setReloadTrigger] = useState(0);
    const authProvider = useAuth();
    const navigate = useNavigate();

    const refreshTasks = () => {
      setReloadTrigger(prev => prev + 1);
    };
  
    const fetchTasks = async () => {
      try {
        const response = await api.get('tasks/', {
          params: { searchTerm }
        });
        setTasks(response.data);
      } catch (err) {
        console.error("Erro ao carregar tarefas: ", err);
      }
    };
  
    const deleteTask = async (id) => {
      try {
        await api.delete(`tasks/${id}`);
        refreshTasks();
      } catch (err) {
        console.error("Erro ao excluir tarefa: ", err);
      }
    };

    const logout = () => {
      authProvider.logout();
      navigate("/");
    };
  
    useEffect(() => {
      if (searchTerm.trim() === "") return;
      fetchTasks();
    }, [reloadTrigger, searchTerm]);
  
    return (
      <div>
        <header className="flex justify-center w-full top-0 left-0 p-4 gap-2">
          <button className="text-gray-50 bg-blue-500 hover:bg-blue-600">Criar</button>
          <input
              type="text"
              name="search"
              placeholder="Buscar"
              value={searchTerm}
              onChange={ (e) => {setSearch(e.target.value)} }
              className="w-full p-2 border border-gray-300 rounded m-auto"
          />
          <button
            onClick={ logout }
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 m-auto"
          >
            Logout
          </button>
        </header>

        <div className="bg-white p-6 rounded-2xl shadow-md max-w-md lg:max-w-7xl mb-6 mt-8 space-y-4 m-auto lg:w-3/4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-700 mb-6">
            To-Do List
          </h1>
          <h2 className="text-2xl font-bold text-gray-700">Minhas Tarefas</h2>
          <ul className="text-gray-600 space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="bg-gray-100 p-4 rounded flex justify-between items-center">
                <div>
                  <strong>{task.title}</strong> - {task.status}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => deleteTask(task.id)} className="text-red-600">Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  