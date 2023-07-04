import React, { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  

  const addTask = () => {
    if (toDo.trim() !== '') {
      const isExistingTask = toDos.some((task) => task.text.toLowerCase() === toDo.toLowerCase());
      if (!isExistingTask) {
        const newTask = { id: Date.now(), text: toDo, status: false };
        setToDos([...toDos, newTask]);
        setToDo('');
      } else {
        alert('Task already exists!');
      }
    } else {
      alert('Please enter a valid task!');
    }
  };
  
  const deleteTask = (id) => {
    const updatedTasks = toDos.filter((task) => task.id !== id);
    setToDos(updatedTasks);
  };


  const toggleTaskStatus = (id) => {
    const updatedTasks = toDos.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDos(updatedTasks);
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h3 >Hey, it's Sunday. You have <span> {toDos.length}</span> tasks to complete!</h3>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={addTask} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((task) => (
          <div className="todo" key={task.id}>
            <div className="left">
              <input
                onChange={() => toggleTaskStatus(task.id)}
                type="checkbox"
                checked={task.status}
              />
              <p>{task.text}</p>
              {task.status && <h1>Active task</h1>}
            </div>
            <div className="right">
              <i onClick={() => deleteTask(task.id)} className="fas fa-times"></i>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
}

export default App;
