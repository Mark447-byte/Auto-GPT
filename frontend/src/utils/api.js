// Basic API Utility
// In a real app, this would use fetch or a library like Axios to make actual HTTP requests.
// For now, it will mostly simulate calls and responses for the AuthContext.

const API_BASE_URL = '/api'; // Example: can be proxied by Vite dev server

// Helper to get token from localStorage
const getToken = () => localStorage.getItem('batiStockToken');

// Main function to simulate/make API calls
const request = async (endpoint, method = 'GET', data = null, requiresAuth = true) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
  };

  if (requiresAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    // If requiresAuth is true and no token, we might want to handle this,
    // but for now, ProtectedRoute handles redirection.
    // Or, the backend would return a 401.
  }

  const config = {
    method,
    headers,
  };

  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    config.body = JSON.stringify(data);
  }

  console.log(`[API Utility] Request: ${method} ${url}`, data ? `Data: ${JSON.stringify(data)}` : '');

  // --- SIMULATION LOGIC ---
  // This entire block would be replaced by actual fetch() and error handling
  if (endpoint === '/auth/signup' && method === 'POST') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email === "test@example.com" && data.password === "password123") {
          resolve({
            ok: true,
            status: 201,
            json: async () => ({
              token: "mock_signup_jwt_token_12345",
              user: { id: "user_" + Date.now(), username: data.username, email: data.email, role: "Salesperson" },
              message: "User created and logged in successfully."
            })
          });
        } else if (data.email === "exists@example.com") {
          resolve({ ok: false, status: 409, json: async () => ({ error: "User with this email already exists." }) });
        } else {
          resolve({ ok: false, status: 400, json: async () => ({ error: "Signup failed. Please try again.", details: {password: "Password too short (simulated)"} }) });
        }
      }, 500);
    });
  }

  if (endpoint === '/auth/login' && method === 'POST') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ((data.emailOrUsername === "admin@bati.com" || data.emailOrUsername === "admin") && data.password === "adminpass") {
          resolve({
            ok: true,
            status: 200,
            json: async () => ({
              token: "mock_admin_jwt_token_abcdef",
              user: { id: "admin001", username: "admin", email: "admin@bati.com", role: "Admin" }
            })
          });
        } else if ((data.emailOrUsername === "pm@bati.com" || data.emailOrUsername === "manager") && data.password === "pmpass") {
          resolve({
            ok: true,
            status: 200,
            json: async () => ({
              token: "mock_pm_jwt_token_ghijkl",
              user: { id: "pm001", username: "manager", email: "pm@bati.com", role: "Project Manager" }
            })
          });
        } else {
          resolve({ ok: false, status: 401, json: async () => ({ error: "Invalid credentials." }) });
        }
      }, 500);
    });
  }

  if (endpoint === '/auth/logout' && method === 'POST') {
     return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ok: true, status: 200, json: async () => ({ message: "Logged out successfully (simulated server response)"}) });
        }, 200);
     });
  }
  // --- END SIMULATION LOGIC ---

  // Placeholder for other endpoints if we were making real calls
  // For now, if not auth endpoint, return a generic error or success for testing
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.warn(`[API Utility] No simulation for ${method} ${url}. Returning generic success.`);
        resolve({ ok: true, status: 200, json: async () => ({ message: `Generic success for ${method} ${url}` }) });
      }, 200);
  });

  /*
  // REAL FETCH IMPLEMENTATION (for when backend is ready)
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      // Attempt to parse error response body
      const errorBody = await response.json().catch(() => ({ error: 'Failed to parse error response.' }));
      throw { status: response.status, body: errorBody };
    }
    if (response.status === 204) { // No Content
      return { ok: true, status: response.status, data: null };
    }
    const responseData = await response.json();
    return { ok: true, status: response.status, data: responseData };
  } catch (error) {
    console.error('[API Utility] Fetch error:', error);
    // Rethrow a structured error or a generic one
    throw error.body || { error: 'Network request failed or server error.' };
  }
  */
};

// Export methods
export const api = {
  get: (endpoint, requiresAuth = true) => request(endpoint, 'GET', null, requiresAuth),
  post: (endpoint, data, requiresAuth = true) => request(endpoint, 'POST', data, requiresAuth),
  put: (endpoint, data, requiresAuth = true) => request(endpoint, 'PUT', data, requiresAuth),
  del: (endpoint, requiresAuth = true) => request(endpoint, 'DELETE', null, requiresAuth), // 'delete' is a reserved keyword
  patch: (endpoint, data, requiresAuth = true) => request(endpoint, 'PATCH', data, requiresAuth),
};

// Example usage in another file:
// import { api } from './utils/api';
// try {
//   const { data } = await api.post('/auth/login', { email, password }, false); // requiresAuth = false for login/signup
//   // handle success with data
// } catch (error) {
//   // handle error (error.status, error.body)
// }
export default api;
