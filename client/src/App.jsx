import { useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [editingTask, setEditingTask] = useState(null);

  const refreshTasks = () => {
    setReloadTrigger(prev => prev + 1);
  };

  return (
    <div className="App p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">To-Do List</h1>
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
