import React from 'react';

function NotificationItem({ notification, onViewNotification }) {
  if (!notification) return null;

  let bgColor, borderColor, textColor, iconSvg;

  switch (notification.type) {
    case 'request':
      bgColor = 'bg-blue-50';
      borderColor = 'border-blue-500';
      textColor = 'text-blue-700';
      iconSvg = <svg className="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      break;
    case 'deadline':
      bgColor = 'bg-yellow-50';
      borderColor = 'border-yellow-500';
      textColor = 'text-yellow-700';
      iconSvg = <svg className="h-6 w-6 text-yellow-500"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      break;
    case 'update':
      bgColor = 'bg-green-50';
      borderColor = 'border-green-500';
      textColor = 'text-green-700';
      iconSvg = <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      break;
    default: // Generic/Info
      bgColor = 'bg-gray-50';
      borderColor = 'border-gray-500';
      textColor = 'text-gray-700';
      iconSvg = <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4s-1.79 4-4 4c-1.742 0-3.223-.835-3.772-2H8.228z" /></svg>;
  }

  const buttonTextColor = textColor.replace('-700', '-600');
  const buttonHoverTextColor = textColor.replace('-700', '-800');


  return (
    <div className={`notification-item flex items-start p-3 ${bgColor} border-l-4 ${borderColor} rounded-r-md shadow-sm`} data-notif-id={notification.id}>
      <div className="flex-shrink-0">{iconSvg}</div>
      <div className="ml-3 flex-1">
        <p className={`text-sm font-medium ${textColor}`}>
          {notification.message}
          {notification.project && <span className="text-xs text-gray-500"> (Project: {notification.project})</span>}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{notification.timestamp}</p>
      </div>
      <button
        onClick={() => onViewNotification(notification.id)}
        className={`text-xs ${buttonTextColor} hover:${buttonHoverTextColor} ml-2 p-1 print:hidden`}
      >
        View
      </button>
    </div>
  );
}

export default NotificationItem;
