import React, { useState, useEffect } from 'react';

const initialLogs = [
    { timestamp: '2023-10-27 10:05:15', message: "User 'admin' logged in." },
    { timestamp: '2023-10-27 10:00:00', message: "New sale #INV00123 created by 'amina_k'." },
    { timestamp: '2023-10-26 18:30:00', message: "Data sync completed successfully." },
    { timestamp: '2023-10-26 17:00:00', message: "ERROR: Failed to sync branch 'Kumasi'." }
];

function SystemLogsSection() {
  const [logs, setLogs] = useState(initialLogs);

  // Function to add a new log entry (could be called from other components via props/context in a real app)
  const addLogEntry = (messageContent) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // Add to the beginning of the array to show newest first easily
    setLogs(prevLogs => [{ timestamp, message: messageContent }, ...prevLogs]);
  };

  // Simulate a new log entry appearing after component mounts (for demo)
  useEffect(() => {
    const timer = setTimeout(() => {
      addLogEntry("System audit check passed.");
    }, 3000); // Add a log after 3 seconds
    return () => clearTimeout(timer); // Cleanup timer
  }, []);


  return (
    <section id="logs" className="mb-8 p-6 bg-white rounded-lg shadow-lg print:hidden">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">System Logs</h2>
      <p className="text-gray-600 mb-4">View transaction history, sync issues, and backup logs.</p>
      <div id="system-logs-display-react" className="bg-gray-50 p-4 rounded-md h-48 overflow-y-auto space-y-1 border border-gray-200">
        {logs.length > 0 ? (
          logs.map((log, index) => {
            const logClass = log.message.toLowerCase().includes('error') ? 'text-red-500' : 'text-gray-600';
            return (
              <p key={index} className={`text-sm ${logClass} font-mono`}>
                <span className="text-gray-400">[{log.timestamp}]</span> {log.message}
              </p>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No system logs available.</p>
        )}
      </div>
    </section>
  );
}

export default SystemLogsSection;
