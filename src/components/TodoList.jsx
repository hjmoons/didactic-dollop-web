import React, { useState } from 'react';
import axios from 'axios';

function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  
  /**
   * Todo 체크박스 설정 및 해제 기능
   * @param {*} id 
   */
  const handleToggle = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:8080/todos/${id}/toggle`);
      onToggle(response.data); // 업데이트된 todo 전달
    } catch (error) {
      console.error('상태 변경 실패:', error);
    }
  };

  /**
   * Todo 삭제 기능
   * @param {*} id 
   */
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/todos/${id}`);
      onDelete(id); // id만 넘겨서 상태 업데이트
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:8080/todos/${id}`, {
        title: editText,
      });
      onUpdate(response.data); // 업데이트된 todo 전달
      setEditingId(null);
    } catch (error) {
      alert('수정 실패: ' + error.response?.data || '오류 발생');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div>
      <h3>📋 Todo List</h3>
      <ul>
        {todos.length === 0 ? (
          <li>할 일이 없습니다.</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id}>
              {editingId === todo.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdate(todo.id);   // ⏎ 저장
                      } else if (e.key === 'Escape') {
                        handleCancel();          // ⎋ 취소
                      }
                    }}
                  />
                  <button onClick={() => handleUpdate(todo.id)}>저장</button>
                  <button onClick={handleCancel}>취소</button>
                </>
              ) : (
                <>
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => onToggle(todo)}
                    />
                    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                      {todo.title}
                    </span>
                  </label>
                  <button onClick={() => handleEditClick(todo)}>✏ 수정</button>
                  <button onClick={() => onDelete(todo.id)} style={{ color: 'red' }}>
                    🗑 삭제
                  </button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;
