import React from 'react';
import { Link } from 'react-router-dom';

function RoleSelectionPage() {
  const roles = [
    { name: 'Admin', path: '/admin/dashboard', color: 'bg-red-600 hover:bg-red-700 focus:ring-red-500' },
    { name: 'Project Manager', path: '/pm/dashboard', color: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' },
    { name: 'Salesperson', path: '/sales/pos', color: 'bg-green-600 hover:bg-green-700 focus:ring-green-500' },
    { name: 'Accountant', path: '/accountant/dashboard', color: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400' },
  ];

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Select Your Role
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          For demonstration purposes, please select a user role to proceed.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <div className="space-y-6">
            {roles.map((role) => (
              <Link
                key={role.name}
                to={role.path}
                className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white ${role.color} focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                {role.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              &larr; Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleSelectionPage;
