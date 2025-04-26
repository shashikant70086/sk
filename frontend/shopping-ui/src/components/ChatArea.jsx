import React, { useEffect, useRef } from 'react';
import Message from '../components/Message';

function ChatArea({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto mb-28 overflow-y-auto space-y-4 max-h-[calc(100vh-180px)] scrollbar-thin pr-2">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatArea;