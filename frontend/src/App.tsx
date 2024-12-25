import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { getEntityURL } from './lib/api';
import { UserCredentials } from './lib/types';
import axios from 'axios';
import { useState } from 'react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (credentials: UserCredentials) => {
    let entityURL = getEntityURL(["auth","login"])
    axios.post(entityURL, credentials).then(response => {
      if(response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
      }
    }).catch(error => {
      console.error('Giriş hatası:', error);
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? 
            <Navigate to="/main" /> : 
            <LoginForm onSubmit={handleLogin} isLoading={false} />
        } />
        <Route path="/main" element={
          isAuthenticated ? 
            <MainPage /> : 
            <Navigate to="/login" />
        } />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

function MainPage() {
  return (
    <div>
      <h1>Ana Sayfa</h1>
      <button onClick={() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }}>
        Çıkış Yap
      </button>
    </div>
  );
}