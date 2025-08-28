import { useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    const trimmed = task.trim()
    if (!trimmed) return
    setTasks([...tasks, trimmed])
    setTask('')
  }

  const deleteTask = (deleted) => {
    const withoutRemoved = tasks.filter(item => item !== deleted)
    setTasks(withoutRemoved)
  }

  return (
    <div id="container">
      <h3>todos</h3>

      <form onSubmit={(e) => { e.preventDefault(); addTask(); }}>
        <input
          placeholder="add new task"
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTask()
            }
          }}
        />
      </form>

      <ul>
        {
          tasks.map((item, index) => (
            <li key={index}>
              {item}
              <button
                className="delete-button"
                onClick={() => deleteTask(item)}>
                Delete
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
