import React, { useState } from 'react';
import axios from 'axios';

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await axios.post('http://localhost:8080/todos', { title });
      onAdd(response.data); // 새로 추가된 할 일 전달
      setTitle(''); // 입력창 초기화
    } catch (error) {
      console.error('할 일 추가 실패:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
      <input
        type="text"
        value={title}
        placeholder="할 일을 입력하세요"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">추가</button>
    </form>
  );
}

export default AddTodo;
