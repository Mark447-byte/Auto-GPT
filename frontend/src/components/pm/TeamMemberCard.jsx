import React from 'react';

function TeamMemberCard({ member, onViewProfile }) {
  if (!member) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow print:shadow-none print:border print:border-gray-300" data-member-id={member.id}>
      <div className="flex items-center space-x-3">
        <img
          className="h-12 w-12 rounded-full object-cover"
          src={member.avatar || `https://via.placeholder.com/100/cccccc/ffffff?Text=${member.name.substring(0,2).toUpperCase()}`}
          alt={member.name}
        />
        <div>
          <h4 className="text-md font-semibold text-gray-800">{member.name}</h4>
          <p className="text-xs text-gray-500">{member.role}</p>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm text-gray-600">
          Assigned to: <span className="font-medium">{member.assignedProject || 'N/A'}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Last Action: {member.lastAction || 'No recent activity'}
        </p>
      </div>
      <button
        onClick={() => onViewProfile(member.id)}
        className="mt-3 w-full text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200 py-1.5 px-3 rounded-md print:hidden"
      >
        View Profile
      </button>
    </div>
  );
}

export default TeamMemberCard;
