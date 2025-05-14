import { useEffect, useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import LoginForm from './components/LoginForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }

  const refreshTasks = () => {
    setReloadTrigger(prev => prev + 1);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin}/>
  }

  return (
    <div className="App p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">To-Do List</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
      <TaskForm
        onTaskCreated={refreshTasks}
        editingTask={editingTask}
        clearEditingTask={() => setEditingTask(null)}
      />
      <TaskList
        key={reloadTrigger}
        onTaskUpdated={refreshTasks}
        onTaskDeleted={refreshTasks}
        onEdit={setEditingTask}
      />
    </div>
  );
}

export default App;
