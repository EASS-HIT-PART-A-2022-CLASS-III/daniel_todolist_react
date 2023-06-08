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
    await api.post('/add', { title: inputValue, checked: false })
    setInputValue('')
    loadTodos()
  }

  async function removeTodo(todo) {
    await api.post('/remove', todo)
    loadTodos()
  }

  async function updateTodo(todo, checked) {
    await api.post('/update', {...todo, checked: checked})
  }

  useEffect(() => {
    loadTodos()
  }, [])



  return (
    <div className="w-full h-full flex items-center justify-center align-center">
      <div className='w-[95%] lg:w-[55%] h-[300px] bg-white shadow-lg rounded-lg p-12'>
        <span className='text-2xl'>Todo List</span>
        <div className='mt-4 h-[50%] overflow-scroll overflow-x-hidden mb-5'>
          {todos.map(todo => (
            <div class="flex items-center mb-4">
              <input value={inputValue} onChange={() => updateTodo(todo, !todo.checked)} checked={todo.checked} id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{todo.title}  </label>
              <svg onClick={() => removeTodo(todo, !todo.checked)}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-auto stroke-red-400 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

            </div>
          ))}
        </div>
        <div className='flex row'>
          <input onChange={e => setInputValue(e.target.value)} type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <button onClick={addTodo} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Add
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;
