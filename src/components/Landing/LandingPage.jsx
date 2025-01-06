import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-800 min-h-screen text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-5 bg-opacity-50">
        <h1 className="text-4xl font-bold">WorkFlowX</h1>
        <nav className="flex gap-4">
          <Link to="/login" className="text-lg hover:underline">
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-gray-200"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-10">
        <h2 className="text-5xl font-extrabold mb-6">Streamline Your Workflow</h2>
        <p className="text-lg mb-10">
          WorkFlowX is your go-to solution for managing tasks, teams, and projects.
          Built with precision and efficiency in mind, WorkFlowX helps you
          collaborate seamlessly.
        </p>
        <Link
          to="/signup"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-white text-gray-800 py-20 px-10">
        <h3 className="text-4xl font-bold text-center mb-10">Why WorkFlowX?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h4 className="text-2xl font-bold mb-3">Task Management</h4>
            <p>Organize and prioritize tasks to boost productivity.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h4 className="text-2xl font-bold mb-3">Team Collaboration</h4>
            <p>Seamless communication and collaboration with your team.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h4 className="text-2xl font-bold mb-3">Real-Time Updates</h4>
            <p>Stay informed with real-time notifications and updates.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 bg-opacity-50">
        <p className="text-lg">© {new Date().getFullYear()} WorkFlowX. Created by Spriha Shringi & Team.</p>
        <p className="text-sm mt-2">
          <a href="mailto:shringispriha@gmail.com" className="hover:underline">
            Contact Us
          </a>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
