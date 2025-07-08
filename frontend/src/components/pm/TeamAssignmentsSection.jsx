import React, { useState, useEffect } from 'react';
import TeamMemberCard from './TeamMemberCard';

// Sample data - in a real app, this would come from props, context, or API call
const initialTeamMembers = [
    { id: 'team001', name: 'Amina Kante', role: 'Site Supervisor', assignedProject: 'Road Renovation - Phase 1', lastAction: 'Submitted daily report (2h ago)', avatar: 'https://via.placeholder.com/100/007bff/ffffff?Text=AK' },
    { id: 'team002', name: 'Ben Okoro', role: 'Lead Engineer', assignedProject: 'School Building Construction', lastAction: 'Approved material request (Yesterday)', avatar: 'https://via.placeholder.com/100/28a745/ffffff?Text=BO' },
    { id: 'team003', name: 'Fatou Sillah', role: 'Quantity Surveyor', assignedProject: 'Warehouse Extension', lastAction: 'Logged in (15m ago)', avatar: 'https://via.placeholder.com/100/ffc107/333333?Text=FS' },
    { id: 'team004', name: 'Kwame Mensah', role: 'Electrician', assignedProject: 'School Building Construction', lastAction: 'Completed wiring for Block A (3h ago)', avatar: 'https://via.placeholder.com/100/6f42c1/ffffff?Text=KM' },
];

function TeamAssignmentsSection() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    // Simulate fetching team members data
    setTeamMembers(initialTeamMembers);
  }, []);

  const handleViewTeamMemberProfile = (memberId) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
      alert(
        `Team Member Profile:\n---------------------\n` +
        `Name: ${member.name}\n` +
        `Role: ${member.role}\n` +
        `Assigned Project: ${member.assignedProject || 'N/A'}\n` +
        `Last Action: ${member.lastAction || 'No recent activity'}`
        // Add more details if available, e.g., contact info
      );
    } else {
      alert("Team member not found.");
    }
  };

  return (
    <section id="team-assignments-react" className="mb-12 p-6 bg-white rounded-lg shadow-lg print:shadow-none">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Team Assignments</h2>
        <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg shadow text-sm print:hidden">
          Assign Team Member
        </button>
      </div>

      {teamMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map(member => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onViewProfile={handleViewTeamMemberProfile}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">No team members are currently assigned or data is unavailable.</p>
      )}
    </section>
  );
}

export default TeamAssignmentsSection;
