import React, { useState, useEffect } from 'react';
import CommunicationMessage from './CommunicationMessage';

// Sample data - in a real app, projectsForSelect would also be dynamic
const initialMessages = [
    { id: 'comm001', user: 'Amina Kante', userAvatar: 'https://via.placeholder.com/100/007bff/ffffff?Text=AK', project: 'Road Renovation - Phase 1', message: 'Just a heads up, we might need to reroute traffic near the site starting next Monday. All necessary permits are in place. Attached is the traffic management plan.', timestamp: '50m ago', attachments: [{ name: 'traffic_plan_v2.pdf', url: '#' }] },
    { id: 'comm002', user: 'Ben Okoro', userAvatar: 'https://via.placeholder.com/100/28a745/ffffff?Text=BO', project: 'School Building Construction', message: 'Foundation work is 90% complete. Expecting to start brickwork next week.', timestamp: '2h ago', attachments: [] }
];

const projectsForSelect = [ // This would typically come from the projects state/props
    { id: 'proj001', name: 'Road Renovation - Phase 1' },
    { id: 'proj002', name: 'School Building Construction' },
    { id: 'proj003', name: 'Warehouse Extension' },
    { id: 'proj004', name: 'Community Water Project' }
];

function CommunicationBoardSection() {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [selectedProjectForNewMessage, setSelectedProjectForNewMessage] = useState(projectsForSelect[0]?.name || ''); // Default to first project or empty

  useEffect(() => {
    // Simulate fetching initial messages
    setMessages(initialMessages);
    if (projectsForSelect.length > 0 && !selectedProjectForNewMessage) {
        setSelectedProjectForNewMessage(projectsForSelect[0].name);
    }
  }, []);

  const handlePostUpdate = (e) => {
    e.preventDefault(); // Prevent form submission if it were a form
    if (!newMessageText.trim()) {
      alert("Please enter a message.");
      return;
    }

    const newMessage = {
      id: 'comm' + String(Date.now()).slice(-4),
      user: 'Project Manager (You)', // Simulate current user
      userAvatar: 'https://via.placeholder.com/100/777777/ffffff?Text=PM',
      project: selectedProjectForNewMessage,
      message: newMessageText,
      timestamp: 'Just now',
      attachments: [] // File upload not handled in this simulation
    };

    setMessages(prevMessages => [newMessage, ...prevMessages]); // Add new message to the top
    setNewMessageText(''); // Clear textarea
    // Optionally, keep selectedProjectForNewMessage or reset it
    console.log("New message posted:", newMessage);
  };

  // File input is visual only, no actual upload logic here
  const handleFileAttachClick = () => {
    document.getElementById('file-upload-comm')?.click();
  };


  return (
    <section id="communication-board-react" className="mb-12 p-6 bg-white rounded-lg shadow-lg print:shadow-none">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Project Communication Board</h2>

      {/* Message Feed */}
      <div id="communication-feed-items" className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
        {messages.length > 0 ? (
          messages.map(msg => <CommunicationMessage key={msg.id} message={msg} />)
        ) : (
          <p className="text-center text-gray-500 py-8">No messages on the board yet.</p>
        )}
      </div>

      {/* New Comment Form */}
      <div className="mt-6 border-t pt-6 print:hidden">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Leave a Comment or Update</h3>
        <textarea
          rows="3"
          placeholder="Type your message for a project..."
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
        <div className="flex flex-wrap justify-between items-center mt-3 gap-2">
          <div className="flex items-center space-x-2">
            <label htmlFor="project-select-comm-react" className="sr-only">Select Project</label>
            <select
              id="project-select-comm-react"
              value={selectedProjectForNewMessage}
              onChange={(e) => setSelectedProjectForNewMessage(e.target.value)}
              className="text-xs border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-1.5"
            >
              {projectsForSelect.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
            <input type="file" id="file-upload-comm" className="hidden" />
            <button
              onClick={handleFileAttachClick}
              className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 py-1.5 px-3 rounded-md inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              Attach File
            </button>
          </div>
          <button
            onClick={handlePostUpdate}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-lg shadow text-sm"
          >
            Post Update
          </button>
        </div>
      </div>
    </section>
  );
}

export default CommunicationBoardSection;
