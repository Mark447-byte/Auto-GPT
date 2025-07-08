import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';

// Placeholder Pages (defined inline for this step)
const HomePage = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold">Welcome to BatiStock</h1>
    <nav className="mt-4">
      <ul className="space-y-2">
        <li><Link to="/login" className="text-indigo-600 hover:underline">Login</Link></li>
        <li><Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link></li>
        <li><Link to="/select-role" className="text-indigo-600 hover:underline">Select Role (Dev)</Link></li>
      </ul>
    </nav>
    <p className="mt-4 text-sm text-gray-600">
      This is the initial landing page. In a real app, this might redirect to login or a dashboard if authenticated.
    </p>
  </div>
);

// Import the new page components
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RoleSelectionPage from './pages/RoleSelectionPage';


// const RoleSelectionPage = () => ( // Placeholder removed
//   <div className="p-4">
//     <h1 className="text-xl font-semibold">Select Role Page</h1>
//     <ul className="mt-2 space-y-1">
//       <li><Link to="/admin/dashboard" className="text-blue-600 hover:underline">Admin Dashboard</Link></li>
//       <li><Link to="/pm/dashboard" className="text-blue-600 hover:underline">Project Manager Dashboard</Link></li>
//       <li><Link to="/sales/pos" className="text-blue-600 hover:underline">Sales POS</Link></li>
//       <li><Link to="/accountant/dashboard" className="text-blue-600 hover:underline">Accountant Dashboard</Link></li>
//     </ul>
//     <Link to="/" className="text-indigo-600 hover:underline mt-4 block">Go to Home</Link>
//   </div>
// );

// Placeholder Dashboard Layouts / Pages
import DashboardLayout from './layouts/DashboardLayout';

// Placeholder components for the actual page content
// import AdminDashboardContent from './pages/admin/AdminDashboardPage'; // This will be the page itself
import AdminDashboardPage from './pages/admin/AdminDashboardPage'; // Correct import for the page
const PmDashboardContent = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Project Manager Dashboard Content</h1><p>Actual PM components will go here.</p><Link to="/select-role" className="text-indigo-600 hover:underline mt-4 block">Back to Role Selection</Link></div>;
const AccountantDashboardContent = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Accountant Dashboard Content</h1><p>Actual accountant components will go here.</p><Link to="/select-role" className="text-indigo-600 hover:underline mt-4 block">Back to Role Selection</Link></div>;

// Sales POS page does not use DashboardLayout, so it's defined separately
const SalesPosPage = () => <div className="p-4"><h1 className="text-xl font-semibold">Sales POS Page</h1><p>Sales POS specific content will be here.</p><Link to="/select-role" className="text-indigo-600 hover:underline mt-4 block">Back to Role Selection</Link></div>;


import PmDashboardPage, { pmNavItems, pmSidebarSubtitle } from './pages/pm/PmDashboardPage'; // Import new page and its nav config

// Sample Nav Items for each role (will be moved to respective components later)
const adminNavItems = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'Staff Management', path: '#' },
  { name: 'App Settings', path: '#' },
  { name: 'System Logs', path: '#' },
  { name: 'Logout', path: '/select-role' },
];

// pmNavItems and pmSidebarSubtitle are now imported from PmDashboardPage.jsx
import AccountantDashboardPage, { accountantNavItems, accountantSidebarSubtitle } from './pages/accountant/AccountantDashboardPage'; // Import new page and its nav config

// accountantNavItems and accountantSidebarSubtitle are now imported

// Fallback for unmatched routes
const NotFoundPage = () => (
    <div className="p-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">404 - Page Not Found</h1>
        <p className="mt-2">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="text-indigo-600 hover:underline mt-4 block">Go to Home Page</Link>
    </div>
);


function App() {
  return (
    // The main div can be used for global layout if needed, or kept minimal
    // For now, Tailwind's default styling will apply from index.css if not overridden
    <div>
      {/* Optional: A global navigation bar could go here, outside the Routes */}
      {/* <nav>...</nav> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/select-role" element={<RoleSelectionPage />} />

        <Route
          path="/admin/dashboard"
          element={
            <DashboardLayout sidebarNavItems={adminNavItems} sidebarSubtitle="Admin Panel">
              <AdminDashboardPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/pm/dashboard"
          element={
            <DashboardLayout sidebarNavItems={pmNavItems} sidebarSubtitle={pmSidebarSubtitle}>
              <PmDashboardPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/accountant/dashboard"
          element={
            <DashboardLayout sidebarNavItems={accountantNavItems} sidebarSubtitle={accountantSidebarSubtitle}>
              <AccountantDashboardPage />
            </DashboardLayout>
          }
        />

        {/* Sales POS does not use the DashboardLayout */}
        <Route path="/sales/pos" element={<SalesPosPage />} />

        <Route path="*" element={<NotFoundPage />} /> {/* Catch-all for 404 */}
      </Routes>
    </div>
  );
}

export default App;
