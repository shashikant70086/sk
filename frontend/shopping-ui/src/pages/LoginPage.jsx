import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function LoginPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email: loginEmail,
        password: loginPassword,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed', {
        duration: 3000,
        position: 'top-center',
      });
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/signup', {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      });
      localStorage.setItem('token', res.data.token);
      toast.success('Signup successful!', {
        duration: 3000,
        position: 'top-center',
      });
      setIsFlipped(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed', {
        duration: 3000,
        position: 'top-center',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-6">
      <Toaster />
      <div className="stars" />
      <div className="twinkling" />
      <div className="perspective-container">
        <div
          className={`card-container ${isFlipped ? 'flipped' : ''}`}
          onClick={() => {
            setIsFlipped(!isFlipped);
          }}
        >
          <div className="card bg-gray-800/50 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md w-full text-center">
            {/* Shopping Cart Logo */}
            <div className="w-24 h-24 mx-auto mb-6">
              <img src={require('../logo.svg').default} className="text-white w-full h-full" alt="Logo" />
            </div>

            {/* Title and Subtitle */}
            <h1 className="text-3xl font-bold text-white mb-2">Shopping Assistant</h1>
            <p className="text-white text-sm mb-6">✨ Making your shopping experience magical ✨</p>

            {/* Login Form */}
            <LoginForm
              email={loginEmail}
              password={loginPassword}
              setEmail={setLoginEmail}
              setPassword={setLoginPassword}
              handleLogin={handleLogin}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>
          <div className="card-back bg-gray-800/50 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md w-full text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Register</h2>
            <RegisterForm
              username={signupUsername}
              email={signupEmail}
              password={signupPassword}
              setUsername={setSignupUsername}
              setEmail={setSignupEmail}
              setPassword={setSignupPassword}
              handleSignup={handleSignup}
              showPassword={showSignupPassword}
              setShowPassword={setShowSignupPassword}
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setIsFlipped(!isFlipped);
        }}
        className="absolute bottom-10 right-10 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isFlipped ? 'Login' : 'Register'}
      </button>
    </div>
  );
}

export default LoginPage;