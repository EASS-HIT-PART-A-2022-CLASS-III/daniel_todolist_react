import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { createElement, useEffect, useState } from 'react'

const api = axios.create({ baseURL: 'http://localhost:8000' })

function App() {

  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])

  async function loadTodos() {
    const res = await api.get('/get')
    setTodos(res.data)
  }

  async function addTodo() {
    if (!inputValue) {
      return
    }
    await api.post('/add', { title: inputValue })
    setInputValue('')
    loadTodos()
  }

  async function removeTodo(todo) {

    await api.post('/remove', todo)
    loadTodos()
  }

  useEffect(() => {
    loadTodos()
  }, [])
  return (
    <div className="App">
      <div className='add'>
        <input
          className='add-input'
          type='text'
          placeholder='Todo...'
          onChange={event => setInputValue(event.target.value)}
        />
        <button className='add-button' onClick={addTodo}>Add</button>
      </div>
      <div className='items'>
        {todos.map(todo => (
          <div className='todo-item'>
            <h3>{todo.title}</h3>
            <button onClick={() => removeTodo(todo)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
