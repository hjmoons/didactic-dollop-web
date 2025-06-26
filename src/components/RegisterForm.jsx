import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm({ onGoToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/auth/register', {
        username,
        password,
      });
      alert('회원가입 성공!');
      onGoToLogin(); // 로그인 화면으로 이동
    } catch (err) {
      alert('회원가입 실패: ' + (err.response?.data || '서버 오류'));
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ padding: '20px' }}>
      <h2>👤 회원가입</h2>
      <div>
        <input
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">가입하기</button>
      <button type="button" onClick={onGoToLogin} style={{ marginLeft: '8px' }}>
        로그인으로
      </button>
    </form>
  );
}

export default RegisterForm;
