import { useEffect, useState } from 'react';
import './App.css';
import MainRoutes from './Routes';
import AuthProvider from './hooks/AuthProvider';

function App() {

  return (
    <AuthProvider>
      <MainRoutes />
    </AuthProvider>
  );

  /*const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const toggleToRegister = () => {
    setShowRegister(true);
  }

  const refreshTasks = () => {
    setReloadTrigger(prev => prev + 1);
  };

  if (!isAuthenticated) {
    return showRegister
    ? <RegisterForm onRegister={() => {setShowRegister(false)}}/>
    : <LoginForm onLogin={handleLogin} toggleToRegister={toggleToRegister}/>
  }

  return (
    <div className="App px-4 py-8 max-w-3xl mx-auto w-full">
      <TaskForm
        onTaskCreated={refreshTasks}
        editingTask={editingTask}
        clearEditingTask={() => setEditingTask(null)}
      />
    </div>
  );*/
}

export default App;
