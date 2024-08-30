import React, { useState, useEffect } from 'react';
import imglogo from "../imgs/3390 (1).png"; // Rasmni import qilish
import Lyout from '../layout/layout';

const Logout: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the password is already in local storage
  useEffect(() => {
    const storedPassword = localStorage.getItem('password');
    if (storedPassword) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === '1234') {
      // Save password to local storage
      localStorage.setItem('password', password);
      setIsAuthenticated(true);
    } else {
      alert('Noto\'g\'ri parol');
    }
  };

  if (isAuthenticated) {
    return <Lyout />;
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex">
        {/* Chap tomonda rasm */}
        <div className="w-1/2">
          <img src={imglogo} alt="Logout Logo" className="object-cover h-full w-full rounded-l-lg" />
        </div>

        {/* O'ng tomonda forma */}
        <div
          style={{
            width: "30%",
            marginLeft: "150px",
            backgroundColor: "white",
            height: "auto",
          }}
          className="p-8 flex flex-col justify-center"
        >
          <h2 className="text-xl font-semibold text-start mb-2">Tizimga xush kelibsiz!</h2>
          <p className="text-gray-600 text-start mb-6">
            Tizimga kirish uchun, login va parol orqali autentifikatsiya jarayonidan o'ting
          </p>
          <input
            type="text"
            placeholder="fastfood@fastfood.com"
            className="w-full p-2 mb-3 border rounded-md"
          />
          <input
            type="password"
            placeholder="Parol"
            className="w-full p-2 mb-4 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-gray-700 text-white py-4 rounded-md"
            onClick={handleLogin}
          >
            Tizimga kirish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
