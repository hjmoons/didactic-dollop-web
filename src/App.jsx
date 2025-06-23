import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('할 일 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleToggle = (updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>📝 나의 Todo 리스트</h1>
      <AddTodo onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} />
    </div>
  );
}

export default App;
