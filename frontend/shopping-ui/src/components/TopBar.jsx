jsx
import React from 'react';
import { FaSignOutAlt, FaHistory } from 'react-icons/fa';

function TopBar({ handleLogout, showHistory, setShowHistory }) {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md flex justify-between items-center px-6 py-4 shadow-lg">
      <h1 className="text-2xl font-bold text-white">Smartlet 🛍️</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md"
        >
          <FaHistory />
          History
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}

export default TopBar;