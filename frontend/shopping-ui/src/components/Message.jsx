import React from 'react';

const Message = ({ message }) => {
  return (
    <div className={`flex items-start ${message.role === 'user' ? 'justify-end' : 'justify-start'} p-2`}>
      <div className={`flex items-center ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''} space-x-4`}>
        {message.role !== 'user' && (
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
            <img src={message.image || "/path/to/default/avatar.png"} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        )}
        <div className={`p-4 rounded-xl max-w-xs break-words ${message.role === 'user' ? 'bg-green-400' : 'bg-blue-500'} text-white`}>
          {message.content}
        </div>
        {message.role === 'user' && (
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
             <img src={message.image || "/path/to/default/avatar.png"} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;