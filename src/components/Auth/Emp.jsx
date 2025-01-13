import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

const Emp = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Query Firestore only by email
      const employeesRef = collection(db, 'employees');
      const q = query(employeesRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const employeeDoc = querySnapshot.docs[0];
        const employeeData = {
          id: employeeDoc.id,
          ...employeeDoc.data()
        };

        // Check password locally
        if (employeeData.password === password) {
          // Store the complete employee data
          localStorage.setItem(
            'loggedInUser',
            JSON.stringify({
              role: 'employee',
              data: employeeData
            })
          );
          
          handleLogin(email, password);
          navigate('/employee');
        } else {
          setError('Invalid password. Please try again.');
        }
      } else {
        setError('Email not found. Please check your email address.');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('Login failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left Content Section */}
      <div className="w-full lg:w-2/3 h-full bg-gradient-to-br from-indigo-600 to-purple-800 text-white">
        <div className="w-full p-12 flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold mb-6">Welcome to WorkFlowX!</h1>
          <p className="text-lg mb-6">
            Access your personalized dashboard to manage tasks, track progress, and collaborate with your team effectively.
          </p>

          {/* Features Section */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-3">Track Your Tasks</h4>
              <p>Stay on top of your assignments and meet deadlines efficiently.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-3">Update Progress</h4>
              <p>Keep your team informed with real-time updates on task progress.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-3">View Performance</h4>
              <p>Monitor your performance metrics and task completion rates.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section (Login Form) */}
      <div className="w-full lg:w-1/3 flex items-center justify-center bg-white p-10">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
            Employee Login to <span className="text-blue-600">WorkFlowX</span>
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full text-gray-800 outline-none bg-gray-100 border border-gray-300 text-lg py-3 px-4 rounded-lg shadow-md placeholder-gray-500 focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full text-gray-800 outline-none bg-gray-100 border border-gray-300 text-lg py-3 px-4 rounded-lg shadow-md placeholder-gray-500 focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full text-gray-800 outline-none bg-gray-100 border border-gray-300 text-lg py-3 px-4 rounded-lg shadow-md placeholder-gray-500 focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-4 text-white ${
                loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
              } transition-all text-lg py-3 px-5 rounded-lg shadow-lg`}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Are you an admin?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Admin Login
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm font-medium">
              © {new Date().getFullYear()} <span className="font-semibold text-blue-600">WorkFlowX</span>. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Created with ❤️ by <span className="font-semibold text-blue-600">Spriha Shringi & Team</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emp;