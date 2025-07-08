import React, { useState, useEffect } from 'react';
import NotificationItem from './NotificationItem';

// Sample data
const initialNotifications = [
    { id: 'notif001', message: "Material Request: 50 bags of cement needed by tomorrow.", type: 'request', timestamp: '25 minutes ago', project: 'Road Renovation - Phase 1' },
    { id: 'notif002', message: "Phase 2 milestone due in 3 days.", type: 'deadline', timestamp: '1 hour ago', project: 'School Building Construction' },
    { id: 'notif003', message: "Project plan approved by Admin.", type: 'update', timestamp: '3 hours ago', project: 'Warehouse Extension' },
    { id: 'notif004', message: "Low stock warning for Iron Rods (12mm).", type: 'request', timestamp: '5 hours ago', project: 'School Building Construction' },
];

function NotificationsSection() {
  const [notifications, setNotifications] = useState([]);
  // Add state for showing all notifications if implementing a "View All" page/modal
  // const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Simulate fetching notifications
    setNotifications(initialNotifications);
  }, []);

  const handleViewNotification = (notificationId) => {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      alert(
        `Notification Details:\n---------------------\n` +
        `Type: ${notification.type}\n` +
        `Message: ${notification.message}\n` +
        `Project: ${notification.project || 'General'}\n` +
        `Time: ${notification.timestamp}`
      );
      // In a real app, this might mark as read or navigate
    } else {
      alert("Notification not found.");
    }
  };

  // const displayedNotifications = showAll ? notifications : notifications.slice(0, 3); // Example for limiting display

  return (
    <section id="notifications-react" className="mb-12 p-6 bg-white rounded-lg shadow-lg print:shadow-none">
      <div className="flex justify-between items-center mb-4 print:hidden">
        <h2 className="text-2xl font-semibold text-gray-700">Notifications</h2>
        {notifications.length > 3 && ( // Example: Show "View All" if more than 3
          <button
            // onClick={() => setShowAll(true)}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            View All ({notifications.length})
          </button>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map(notification => ( // Display all for now, could slice for limited view
            <NotificationItem
              key={notification.id}
              notification={notification}
              onViewNotification={handleViewNotification}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">No new notifications.</p>
      )}
    </section>
  );
}

export default NotificationsSection;
