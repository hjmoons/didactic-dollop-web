import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(token){
      setIsLoggedIn(true);
      fetchTodos();
    }
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/todos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.removeItem('jwt');  // 토큰 제거
        setIsLoggedIn(false);           // 로그인 상태 해제 → 로그인 화면으로 리디렉션됨
      } else {
        console.error('할 일 가져오기 실패:', error);
      }
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    fetchTodos();
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setTodos([]); // 데이터 초기화
  };

  const handleAdd = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleToggle = (updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleUpdate = (updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  }

  return (
    <div>
      {isLoggedIn ? (
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>📝 DEMO</h2>
            <button onClick={handleLogout}>🚪 로그아웃</button>
          </div>
          <AddTodo onAdd={handleAdd} />
          <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} onUpdate={handleUpdate}/>
        </div>
      ) : isRegistering ? (
        <RegisterForm onGoToLogin={() => setIsRegistering(false)} />
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} onGoToRegister={() => setIsRegistering(true)} />
      )}
    </div>
  );
}

export default App;
