import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ onLoginSuccess, onGoToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      });
      const token = res.data.token;
      localStorage.setItem('jwt', token);
      onLoginSuccess(); // 로그인 성공 시 호출
    } catch (err) {
      alert('로그인 실패: ' + (err.response?.data || '서버 오류'));
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: '20px' }}>
      <h2>🔐 로그인</h2>
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
      <button type="submit">로그인</button>
      <button type="button" onClick={onGoToRegister} style={{ marginLeft: '8px' }}>회원가입</button>
    </form>
  );
}

export default LoginForm;