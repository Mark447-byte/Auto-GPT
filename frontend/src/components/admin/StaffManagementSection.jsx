import React, { useState, useEffect } from 'react';

// This would typically come from props or a global state/context in a larger app
const initialStaffMembers = [
    { id: 1, name: 'Amina Kante', role: 'Salesperson', lastActive: '2 hours ago', email: 'amina@example.com' },
    { id: 2, name: 'John Mensah', role: 'Inventory Manager', lastActive: '30 mins ago', email: 'john.m@example.com' },
    { id: 3, name: 'Fatima Diallo', role: 'Accountant', lastActive: '1 day ago', email: 'fatima.d@example.com' }
];

function StaffManagementSection() {
  const [staffMembers, setStaffMembers] = useState(initialStaffMembers);
  // Add state for managing a modal for add/edit if you want a more complex UI later
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editingStaff, setEditingStaff] = useState(null);

  const handleAddNewStaff = () => {
    const name = prompt("Enter new staff member's name:");
    if (!name) return;
    const role = prompt("Enter role:", "Salesperson");
    if (!role) return;
    const email = prompt("Enter email:"); // Basic validation, ideally use a form
    if (!email || !email.includes('@')) {
        alert("Invalid email provided.");
        return;
    }

    const newStaff = {
      id: staffMembers.length > 0 ? Math.max(...staffMembers.map(s => s.id)) + 1 : 1,
      name,
      role,
      lastActive: 'Just now',
      email,
    };
    setStaffMembers(prevStaff => [...prevStaff, newStaff]);
    alert(`Staff member '${name}' added.`);
    // TODO: Add system log entry if that system is integrated
  };

  const handleEditStaff = (staffId) => {
    const staffToEdit = staffMembers.find(s => s.id === staffId);
    if (!staffToEdit) return alert("Staff member not found.");

    const newName = prompt(`Editing ${staffToEdit.name}. New name:`, staffToEdit.name);
    const newRole = prompt(`New role for ${newName || staffToEdit.name}:`, staffToEdit.role);
    // Email editing could also be added here

    if (newName || newRole) {
      setStaffMembers(prevStaff =>
        prevStaff.map(s =>
          s.id === staffId ? { ...s, name: newName || s.name, role: newRole || s.role } : s
        )
      );
      alert(`${newName || staffToEdit.name}'s details updated.`);
    }
  };

  const handleDeleteStaff = (staffId) => {
    const staffToDelete = staffMembers.find(s => s.id === staffId);
    if (!staffToDelete) return alert("Staff member not found.");

    if (window.confirm(`Are you sure you want to delete ${staffToDelete.name}?`)) {
      setStaffMembers(prevStaff => prevStaff.filter(s => s.id !== staffId));
      alert(`${staffToDelete.name} has been deleted.`);
    }
  };

  return (
    <section id="staff" className="mb-8 p-6 bg-white rounded-lg shadow-lg print:hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Staff Management</h2>
        <button
          onClick={handleAddNewStaff}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
        >
          Add New Staff
        </button>
      </div>
      <p className="text-gray-600 mb-4">Create, assign roles, and monitor staff activity.</p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody id="staff-table-body" className="divide-y divide-gray-200">
            {staffMembers.length > 0 ? (
              staffMembers.map(staff => (
                <tr key={staff.id} data-staff-id={staff.id}>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{staff.name}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{staff.role}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{staff.email}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{staff.lastActive}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm space-x-2">
                    <button
                      onClick={() => handleEditStaff(staff.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStaff(staff.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-4 text-center text-gray-500">No staff members found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default StaffManagementSection;
