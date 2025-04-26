import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === '') return;

    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex].text = input;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, { text: input, completed: false }]);
    }

    setInput('');
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    if (editingIndex === index) setEditingIndex(null);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setInput(tasks[index].text);
    setEditingIndex(index);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Add or edit a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={addTask}>
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(index)}>{task.text}</span>
            <div className="actions">
              <button onClick={() => editTask(index)}>✏️</button>
              <button onClick={() => removeTask(index)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
