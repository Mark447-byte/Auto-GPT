import React from 'react';

function CommunicationMessage({ message }) {
  if (!message) return null;

  return (
    <div className="communication-message bg-gray-50 p-4 rounded-lg shadow-sm print:shadow-none print:border print:border-gray-200" data-message-id={message.id}>
      <div className="flex items-start space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={message.userAvatar || `https://via.placeholder.com/100/cccccc/ffffff?Text=${message.user.substring(0,2).toUpperCase()}`}
          alt={message.user}
        />
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {message.user}
            {message.project && <span className="text-xs text-gray-500 font-normal"> on {message.project}</span>}
          </p>
          <p className="text-xs text-gray-400">Posted {message.timestamp}</p>
        </div>
      </div>
      <p className="text-gray-700 mt-2 text-sm whitespace-pre-wrap">{message.message}</p>
      {message.attachments && message.attachments.length > 0 && (
        <div className="mt-2 space-y-1">
          <p className="text-xs font-medium text-gray-600">Attachments:</p>
          {message.attachments.map((att, index) => (
            <a
              key={index}
              href={att.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 hover:underline flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400 print:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              {att.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommunicationMessage;
