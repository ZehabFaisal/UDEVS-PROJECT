const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const request = async (path, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

export const registerUser = (userData) =>
  request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

export const loginUser = (userData) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

export const fetchJobs = () => request('/api/jobs?limit=10');