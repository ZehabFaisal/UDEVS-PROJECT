import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'candidate',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const Handle_Submit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Error! Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email.toLowerCase() === formData.email.toLowerCase());
    if (existingUser) {
      alert("This email already exists.");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Congratulations! Account created successfully.");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-3xl shadow-md mt-10 sm:mt-15 sm:mb-10">
        <div className="flex justify-center">
          <FaUser className="text-white bg-blue-600 w-10 h-10 p-2 rounded" />
        </div>
        <h2 className="text-3xl font-bold text-center underline"> Create Your Account </h2>
        <p className="text-center text-gray-500"> Start your recruitment journey with Recruiter-AI! </p>
        {
          error && (
            <div className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded">
              {error}
            </div>
          )
        }

        <form className="space-y-4" onSubmit={Handle_Submit}>
          <div>
            <label className="text-sm mb-1 block"> Full Name </label>
            <div className="flex border items-center px-3 py-2 rounded">
              <FaUser className="text-blue-600 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="outline-none w-full"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm mb-1 block"> Email Address </label>
            <div className="flex border items-center px-3 py-2 rounded">
              <FaEnvelope className="text-blue-600 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="outline-none w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm mb-1 block"> Password </label>
            <div className="flex border items-center px-3 py-2 rounded">
              <FaLock className="text-blue-600 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                className="outline-none w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm mb-1 block"> Confirm Password </label>
            <div className="flex border items-center px-3 py-2 rounded">
              <FaLock className="text-blue-600 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                className="outline-none w-full"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm mb-1 block"> Role </label>
            <div className="flex border items-center px-3 py-2 rounded">
              <select
                name="role"
                className="outline-none w-full"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="candidate"> Candidate </option>
                <option value="recruiter"> Recruiter </option>
                <option value="admin"> Admin </option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-40 ml-28 mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4
            py-2 rounded-3xl cursor-pointer font-bold hover:font-extrabold disabled:opacity-60"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-md">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-600 hover:underline active:font-bold active:text-red-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
