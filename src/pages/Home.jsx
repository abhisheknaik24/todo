import { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { postTodos } from '../todo/todoSlice';

const Home = () => {
  const [todo, setTodo] = useState('');

  const todos = useSelector((state) => state.todo.todos);

  const dispatch = useDispatch();

  const fetchTodos = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/todo/getTodos`);
    dispatch(postTodos(res.data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleChangeTodo = async (e) => {
    setTodo(e.target.value);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    await axios.post(
      `${import.meta.env.VITE_API_URL}/todo/postTodo`,
      todo
    );
    fetchTodos();
  };

  const handleDeleteTodo = async (id, e) => {
    e.preventDefault();
    await axios.post(
      `${import.meta.env.VITE_API_URL}/todo/deleteTodo`,
      id
    );
    fetchTodos();
  };

  return (
    <div className='home-section'>
      <h1>Todo's</h1>
      <div className='add-todo-section'>
        <input
          type='text'
          className='input'
          placeholder='New Todo'
          onChange={(e) => handleChangeTodo(e)}
        />
        <button onClick={(e) => handleAddTodo(e)}>
          <FaPlus />
        </button>
      </div>
      <div className='todos-section'>
        <ul>
          {todos &&
            todos.map((todo) => (
              <li key={todo.id}>
                {todo.title}
                <button
                  className='todo-delete'
                  onClick={(e) => handleDeleteTodo(todo.id, e)}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
