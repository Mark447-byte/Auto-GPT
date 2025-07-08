import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For BatiStock logo link & navigate
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

// Reusable Sidebar component that can be part of DashboardLayout or imported
const Sidebar = ({ title, subtitle, navItems, onLinkClick, onLogout }) => ( // Added onLogout
  <aside className="w-64 bg-gray-800 text-white p-6 space-y-2 hidden md:block print:hidden"> {/* print:hidden to hide on print */}
    <Link to="/" className="text-2xl font-bold text-white block mb-1">BatiStock</Link>
    {subtitle && <span className="text-sm text-gray-400 block mb-3">{subtitle}</span>}
    <nav>
      {navItems.map((item) =>
        item.name === 'Logout' ? (
          <button
            key={item.name}
            onClick={onLogout}
            className="w-full text-left block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            {item.name}
          </button>
        ) : (
          <Link
            key={item.name}
            to={item.path}
            onClick={onLinkClick} // For closing mobile menu if needed
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            {item.name}
          </Link>
        )
      )}
    </nav>
  </aside>
);

function DashboardLayout({ children, sidebarNavItems, sidebarSubtitle }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout(); // Clears context and localStorage
    navigate('/login'); // Redirect to login page
    if(isMobileMenuOpen) closeMobileMenu(); // Close mobile menu if open
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <Sidebar
        title="BatiStock"
        subtitle={sidebarSubtitle}
        navItems={sidebarNavItems}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar for Mobile Nav Toggle and Page Title */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center print:hidden"> {/* print:hidden */}
          <div>
            {/* Placeholder for dynamic page title if needed */}
            {/* <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1> */}
          </div>
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-200"
            onClick={toggleMobileMenu}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 z-30 md:hidden print:hidden"
            onClick={toggleMobileMenu} // Close on overlay click
            role="dialog"
            aria-modal="true"
        >
          <aside
            className="fixed top-0 left-0 w-64 bg-gray-800 text-white p-6 space-y-2 h-full z-40"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sidebar
          >
            <div className="flex justify-between items-center mb-3">
                <Link to="/" className="text-2xl font-bold text-white">BatiStock</Link>
                <button onClick={toggleMobileMenu} className="p-2 text-white" aria-label="Close menu">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            {subtitle && <span className="text-sm text-gray-400 block mb-3">{sidebarSubtitle}</span>}
            <nav>
              {sidebarNavItems.map((item) =>
                item.name === 'Logout' ? (
                  <button
                    key={item.name}
                    onClick={handleLogout} // Use the main handleLogout which also closes menu
                    className="w-full text-left block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={closeMobileMenu} // Close menu on regular link click
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
