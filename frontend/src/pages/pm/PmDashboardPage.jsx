import React from 'react';
import ProjectsSection from '../../components/pm/ProjectsSection';
import MaterialDashboardSection from '../../components/pm/MaterialDashboardSection';
import TeamAssignmentsSection from '../../components/pm/TeamAssignmentsSection';
import NotificationsSection from '../../components/pm/NotificationsSection';
import CommunicationBoardSection from '../../components/pm/CommunicationBoardSection'; // Import the new component


// Define PM Navigation Items (will be passed to DashboardLayout)
// In a larger app, this might come from a config file or context
export const pmNavItems = [
  { name: 'Projects', path: '#projects-tab' }, // Using on-page anchors for now
  { name: 'Material Dashboard', path: '#material-dashboard' },
  { name: 'Team Assignments', path: '#team-assignments' },
  { name: 'Notifications', path: '#notifications' },
  { name: 'Communication', path: '#communication-board' },
  { name: 'Logout', path: '/select-role' }, // Or /login
];

export const pmSidebarSubtitle = "Project Manager";

function PmDashboardPage() {
  // State for data (projects, materials, etc.) will be added here or in child components

  return (
    <>
      <header className="flex justify-between items-center mb-8 print:hidden">
        <h1 className="text-3xl font-bold text-gray-800">Project Manager Dashboard</h1>
        {/* Mobile menu button is in DashboardLayout */}
      </header>
      <p className="text-gray-600 mb-8 print:hidden">
        Welcome, Project Manager! Oversee your projects, materials, and team communications (React Version).
      </p>

      {/* Sections will be replaced by actual components */}
      {/* Sections will be replaced by actual components */}
      <div id="projects-tab"><ProjectsSection /></div>
      <div id="material-dashboard"><MaterialDashboardSection /></div>
      <div id="team-assignments"><TeamAssignmentsSection /></div>
      <div id="notifications"><NotificationsSection /></div>
      <div id="communication-board"><CommunicationBoardSection /></div>

      <footer className="text-center text-sm text-gray-500 mt-10 print:hidden">
        <p>&copy; {new Date().getFullYear()} BatiStock. All rights reserved.</p>
      </footer>
    </>
  );
}

export default PmDashboardPage;
