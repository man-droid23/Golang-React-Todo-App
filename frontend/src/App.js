import './App.css';
import TodoList from './components/TodoList';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const array = Object.keys(todos).map(keys => todos[keys])
  console.log(array)
  useEffect(() => {
    axios.get('http://localhost:4000/api/todos')
      .then(res => {
        setTodos(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="App">
      <div className=''>
        <TodoList todo={array} />
      </div>
    </div>
  );
}

export default App;
