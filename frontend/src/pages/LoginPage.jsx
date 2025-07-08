import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, setError, isAuthenticated, user } = useAuth(); // Added isAuthenticated and user
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on role after successful login
      // The `from` location helps redirect back to the originally intended page if they were unauthed.
      const from = location.state?.from?.pathname || getDefaultDashboardByRole(user.role);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location.state]);

  const getDefaultDashboardByRole = (role) => {
    switch (role) {
      case 'Admin':
        return '/admin/dashboard';
      case 'Project Manager':
        return '/pm/dashboard';
      case 'Accountant':
        return '/accountant/dashboard';
      case 'Salesperson':
        return '/sales/pos';
      default:
        return '/select-role'; // Fallback
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors before new attempt
    try {
      await login(emailOrUsername, password);
      // Navigation will be handled by useEffect above, or can be explicit here too
      // For example, after successful login, AuthContext updates isAuthenticated & user,
      // which then triggers the useEffect to navigate.
      // Or, if login() itself returns user data:
      // const loggedInUser = await login(emailOrUsername, password);
      // if (loggedInUser.role === 'Admin') navigate('/admin/dashboard'); else ...
      // For now, relying on useEffect is fine.
    } catch (err) {
      // Error is already set in AuthContext's login function,
      // but if login itself threw an error that wasn't caught and set in AuthContext:
      console.error("Login page error:", err);
      // setError("Failed to login. Please check your credentials."); // Could set a generic one here too
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center min-h-screen py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to BatiStock
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
            <div>
              <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700">
                Email address or Username
              </label>
              <div className="mt-1">
                <input
                  id="emailOrUsername"
                  name="emailOrUsername"
                  type="text"
                  autoComplete="username email" // Allow both
                  required
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label> */}
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
