import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Row from './components/Row'
import { useUser } from './context/useUser'

const url = import.meta.env.VITE_API_URL

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const { user } = useUser()

  useEffect(() => {
    const headers = { headers: { Authorization: user.token } }
    axios.get(url, headers)
      .then(response => setTasks(response.data))
      .catch(error => alert(error.response?.data?.message || error))
  }, [])

  const addTask = () => {
    if (!task.trim()) return
    const newTask = { description: task }
    const headers = { headers: { Authorization: user.token } }
    axios.post(url + "/create", { task: newTask }, headers)
      .then(response => {
        setTasks([...tasks, response.data])
        setTask('')
      })
      .catch(error => alert(error.response?.data?.error || error))
  }

  const deleteTask = (id) => {
    const headers = { headers: { Authorization: user.token } }
    axios.delete(`${url}/delete/${id}`, headers)
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
