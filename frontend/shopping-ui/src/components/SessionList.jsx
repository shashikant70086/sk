jsx
import React from 'react';

const SessionList = ({ sessions, activeSession, onSessionClick, onNewChatClick }) => {
  return (
    <div className="absolute top-24 left-4 z-40 bg-white/10 backdrop-blur p-4 rounded-xl space-y-2">
      <button
        onClick={onNewChatClick}
        className="bg-green-500 px-4 py-2 rounded text-white w-full"
      >
        + New Chat
      </button>
      {sessions.map((session) => (
        <button
          key={session.sessionId}
          className={`block w-full text-left px-3 py-1 rounded ${
            activeSession === session.sessionId ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
          onClick={() => onSessionClick(session.sessionId)}
        >
          {session.title}
        </button>
      ))}
    </div>
  );
};

export default SessionList;