import { useState } from 'react'
import './App.css'

let nextId = 0;

function List() {
  const [name, setName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState(new Set());

  const addTask = () => {
    if (name.trim() === '') return;

    setTasks([...tasks, { id: nextId++, name }]);
    setName('');
  };

  const toggleSelect = (id) => {
    const newSelected = new Set(selected);

    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }

    setSelected(newSelected);
  };

  const deleteSelected = () => {
    setTasks(tasks.filter(task => !selected.has(task.id)));
    setSelected(new Set());
  };

  return (
    <>
      <h1>To Do List:</h1>
      <div className='Task'>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>


      <button onClick={addTask}>Add</button>
      <button onClick={deleteSelected} disabled={selected.size === 0}>
        Delete
      </button>


      {tasks.map(task => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={selected.has(task.id)}
            onChange={() => toggleSelect(task.id)}
          />
          {task.name}
        </li>
      ))}

    </>
  );
}

export default List;
