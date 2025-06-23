import React from 'react';
import axios from 'axios';

function TodoList({ todos, onToggle }) {
    const handleToggle = async (id) => {
        try {
          const response = await axios.patch(`http://localhost:8080/todos/${id}/toggle`);
          onToggle(response.data); // 업데이트된 todo 전달
        } catch (error) {
          console.error('상태 변경 실패:', error);
        }
    };

    return (
        <div>
          <h2>📋 Todo List</h2>
          <ul>
            {todos.length === 0 ? (
              <li>할 일이 없습니다.</li>
            ) : (
              todos.map((todo) => (
                <li key={todo.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo.id)}
                    />
                    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                      {todo.title}
                    </span>
                  </label>
                </li>
              ))
            )}
          </ul>
        </div>
    );
}

export default TodoList;
