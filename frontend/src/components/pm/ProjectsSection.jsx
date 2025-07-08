import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

// Sample data - in a real app, this would come from props, context, or API call
const initialProjects = [
    { id: 'proj001', name: 'Road Renovation - Phase 1', status: 'In Progress', description: 'Brief description of the road renovation project, highlighting key objectives and scope for quick understanding by the PM.', progress: 45, dueDate: 'Dec 15, 2023', budget: '$50,000', location: 'Accra Central' },
    { id: 'proj002', name: 'School Building Construction', status: 'Completed', description: 'Construction of a new primary school block with 5 classrooms and administrative offices.', progress: 100, completedDate: 'Nov 02, 2023', budget: '$120,000', location: 'Kumasi Outskirts' },
    { id: 'proj003', name: 'Warehouse Extension', status: 'Pending Approval', description: 'Extension of existing warehouse to increase storage capacity by 30%.', progress: 0, startDate: 'TBD', estBudget: '$75,000', location: 'Tema Industrial Area' },
    { id: 'proj004', name: 'Community Water Project', status: 'In Progress', description: 'Drilling of boreholes and installation of water pumps for rural community access to clean water.', progress: 70, dueDate: 'Jan 30, 2024', budget: '$80,000', location: 'Volta Region Village' },
];

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate fetching initial projects
    setProjects(initialProjects);
  }, []);

  const handleAddNewProject = () => {
    const name = prompt("Enter new project name:");
    if (!name) return;
    const location = prompt("Enter project location:");
    if (!location) return; // Basic validation

    const newProject = {
      id: 'proj' + String(Date.now()).slice(-4), // More unique ID
      name,
      status: 'Pending Approval',
      description: prompt("Enter project description:", "New project, description pending."),
      progress: 0,
      startDate: 'TBD',
      estBudget: prompt("Enter estimated budget:", "$0"),
      location,
    };
    setProjects(prevProjects => [newProject, ...prevProjects]); // Add to beginning
    alert(`Project '${name}' added with status 'Pending Approval'.`);
  };

  const handleViewProjectDetails = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      alert(
        `Project Details:\n-------------------\n` +
        `Name: ${project.name}\n` +
        `Status: ${project.status}\n` +
        `Location: ${project.location || 'N/A'}\n` +
        `Description: ${project.description || 'N/A'}\n` +
        `Progress: ${project.progress}%\n` +
        `Budget: ${project.estBudget || project.budget || '$0'}\n` +
        `${project.status === 'Completed' ? 'Completed: ' : 'Due Date: '}${project.status === 'Completed' ? project.completedDate : project.dueDate || project.startDate || 'TBD'}`
      );
    } else {
      alert("Project details not found.");
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (project.location && project.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="projects-tab-react" className="mb-12 p-6 bg-white rounded-lg shadow-lg print:shadow-none">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4 print:hidden">
        <h2 className="text-2xl font-semibold text-gray-700">Projects</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            onClick={handleAddNewProject}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Project
          </button>
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={handleViewProjectDetails}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">
          {searchTerm ? 'No projects match your search.' : 'No projects found. Click "Add New Project" to get started!'}
        </p>
      )}
    </section>
  );
}

export default ProjectsSection;
