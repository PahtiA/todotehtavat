import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Row from './components/Row'

const url = "http://localhost:3002"

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])


  useEffect(() => {
    axios.get(url)
      .then(response => setTasks(response.data))
      .catch(error => alert(error.response?.data?.message || error))
  }, [])

  const addTask = () => {
    if (!task.trim()) return
    const newTask = { description: task }
    axios.post(url + "/create", { task: newTask })
      .then(response => {
        setTasks([...tasks, response.data])
        setTask('')
      })
      .catch(error => alert(error.response?.data?.error || error))
  }

  const deleteTask = (id) => {
    axios.delete(`${url}/delete/${id}`)
      .then(() => setTasks(tasks.filter(t => t.id !== id)))
      .catch(error => alert(error.response?.data?.error || error))
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Add a new task" 
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(item => (
          <Row key={item.id} item={item} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  )
}

export default App
