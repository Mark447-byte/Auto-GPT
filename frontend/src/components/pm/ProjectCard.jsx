import React from 'react';

function ProjectCard({ project, onViewDetails }) {
  if (!project) return null;

  const progressColor = project.progress === 100 ? 'bg-green-600' :
                        project.progress > 50 ? 'bg-blue-600' :
                        project.progress > 0 ? 'bg-yellow-500' : 'bg-gray-300';

  const statusColor = project.status === 'Completed' ? 'bg-green-200 text-green-800' :
                      project.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' :
                      project.status === 'Pending Approval' ? 'bg-red-200 text-red-800' :
                      'bg-gray-200 text-gray-800'; // Default for other statuses

  const dateLabel = project.status === 'Completed' ? 'Completed:' : 'Due Date:';
  const dateValue = project.status === 'Completed' ? project.completedDate : project.dueDate || project.startDate || 'TBD';

  const budgetLabel = project.estBudget ? 'Est. Budget:' : 'Budget:';
  const budgetValue = project.estBudget || project.budget || '$0';

  const actionButtonText = project.status === 'Completed' ? 'View Report' :
                           project.status === 'Pending Approval' ? 'Review' :
                           'View Details';

  return (
    <div className="project-card bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between print:shadow-none print:border print:border-gray-300">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800" title={project.name}>
            {project.name}
          </h3>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor}`}>
            {project.status}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">Location: {project.location || 'N/A'}</p>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed h-16 overflow-y-auto" title={project.description}>
          {project.description || 'No description available.'}
        </p>
        <div className="mt-4">
          <p className="text-xs text-gray-500">Progress</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div className={`${progressColor} h-2.5 rounded-full`} style={{ width: `${project.progress}%` }}></div>
          </div>
          <p className="text-xs text-right text-gray-500 mt-1">{project.progress}% Complete</p>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 flex justify-between items-center print:bg-transparent">
        <div>
          <p className="text-xs text-gray-500">
            {dateLabel} <span className="font-medium text-gray-700">{dateValue}</span>
          </p>
          <p className="text-xs text-gray-500">
            {budgetLabel} <span className="font-medium text-gray-700">{budgetValue}</span>
          </p>
        </div>
        <button
          onClick={() => onViewDetails(project.id)}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 print:hidden"
        >
          {actionButtonText} &rarr;
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
