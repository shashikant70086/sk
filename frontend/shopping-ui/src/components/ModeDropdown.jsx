import React from 'react';

const ModeDropdown = ({ value }) => {
  return (
    <select value={value} className="w-full p-2 rounded-md bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="full-ai">Full AI Purchase</option>
    </select>
  );
};

export default ModeDropdown;