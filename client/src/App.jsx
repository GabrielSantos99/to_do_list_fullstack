import { useState } from 'react'
import './App.css'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const refreshTasks = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm onTaskCreated={refreshTasks} />
      <TaskList key={reloadTrigger} />
    </div>
  );
}

export default App
