import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { LoginForm } from "./pages/LoginForm";
import { getEntityURL } from "./lib/api";
import { UserCredentials } from "./lib/types";
import axios from "axios";
import { useState } from "react";
import Home from "./pages/Home";

export default function App() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Uygulama başladığında localStorage'dan kontrol et
    return !!localStorage.getItem("token");
  });

  const handleLogin = async (credentials: UserCredentials) => {
    try {
      const entityURL = getEntityURL(["auth", "login"]);
      const response = await axios.post(entityURL, credentials);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
        navigate('/')
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Login Sayfası */}
        <Route
          path="/login"
          element={<LoginForm onSubmit={handleLogin} isLoading={false} />}
        />
        {/* Ana Sayfa */}
        <Route
          path="/"
          element={<Home isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
        />
      </Routes>
    </Router>
  );
}
