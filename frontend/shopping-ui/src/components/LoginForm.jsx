import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = ({ email, password, setEmail, setPassword, handleLogin, showPassword, setShowPassword }) => {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded-md bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 rounded-md bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;