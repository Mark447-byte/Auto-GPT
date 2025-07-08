import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, loading, error, setError, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [signupSuccess, setSignupSuccess] = useState(false);

  useEffect(() => {
    // If user is already authenticated (e.g. after successful signup which also logs in), redirect.
    if (isAuthenticated && user) {
      // No 'from' location state on signup, so directly go to default dashboard or select-role
      const defaultDashboard = getDefaultDashboardByRole(user.role);
      navigate(defaultDashboard, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Helper function to determine default dashboard based on role
  const getDefaultDashboardByRole = (role) => {
    switch (role) {
      case 'Admin':
        return '/admin/dashboard';
      case 'Project Manager':
        return '/pm/dashboard';
      case 'Accountant':
        return '/accountant/dashboard';
      case 'Salesperson':
        return '/sales/pos'; // Assuming Salesperson is a role handled by AuthContext
      default:
        return '/select-role'; // Fallback if role is undefined or not matched
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors
    setSignupSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    try {
      const response = await signup(username, email, password);
      // AuthContext's signup simulation logs in user and sets isAuthenticated
      // The useEffect above will handle redirection.
      // If signup didn't log in, we'd navigate to /login here.
      setSignupSuccess(true); // To show a success message before redirect by useEffect
      console.log("Signup successful (simulated):", response);
      // Navigation is handled by useEffect reacting to isAuthenticated change
    } catch (err) {
      // Error is set in AuthContext's signup function
      console.error("Signup page error:", err);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center min-h-screen py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your BatiStock account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <p>{error}</p>
              </div>
            )}
            {signupSuccess && !error && ( // Show success only if no error and signup attempt was made
              <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                <p>Signup successful! Redirecting...</p>
              </div>
            )}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || signupSuccess} // Disable if loading or if successfully signed up (awaiting redirect)
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
