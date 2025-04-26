import React from 'react';
import { PiPaperPlaneRightFill } from 'react-icons/pi';

const PromptInput = ({ prompt, setPrompt, handleSubmit }) => {
  return (
    <div className="fixed bottom-6 transform -translate-x-1/2 w-full max-w-3xl bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-4 flex items-center justify-between space-x-4">
      <textarea
        rows="2"
        className="w-full p-2 rounded bg-white/30 placeholder-white/80 text-white resize-none focus:outline-none"
        placeholder="Type your magical prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <button
        onClick={handleSubmit}
        className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-white"
      >
        <PiPaperPlaneRightFill />
      </button>
    </div>
  );
};

export default PromptInput;