import React from 'react';

function OfflineIndicator({ isOnline, onToggle }) { // onToggle is for the demo button
  return (
    <div className="flex items-center text-sm text-gray-500">
      {isOnline ? (
        <>
          <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
          <span>Online</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
            {/* Using a simple X in circle for offline for now */}
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
          </svg>
          <span>Offline</span>
        </>
      )}
      {/* Temporary button to toggle offline status for demo, can be removed later */}
      {onToggle && (
         <button onClick={onToggle} className="ml-2 text-xs underline text-gray-400 hover:text-gray-600">(Toggle Demo)</button>
      )}
    </div>
  );
}

export default OfflineIndicator;
