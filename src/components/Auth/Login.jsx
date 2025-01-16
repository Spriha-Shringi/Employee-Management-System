import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [authing, setAuthing] = useState(false);

  const handleGoogleLogin = async () => {
    setAuthing(true);
    setError('');
    setSuccess('');

    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        setError('Please verify your email. Verification link sent.');
        return;
      }

      setSuccess('Login successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/admin'), 1500);
    } catch (err) {
      console.error('Google Login Error:', err.message);
      setError(err.message);
    } finally {
      setAuthing(false);
    }
  };

  const submitH = async (e) => {
    e.preventDefault();
    setError('');
    setAuthing(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        setError('Please verify your email. Verification link sent.');
        return;
      }

      setSuccess('Login successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/admin'), 1500);
    } catch (err) {
      console.error('Email Login Error:', err.message);
      setError(err.message);
    } finally {
      setAuthing(false);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left Content Section */}
      <div className="w-full lg:w-2/3 h-full bg-gradient-to-br from-blue-600 to-purple-800 text-white">
        <div className="w-full p-12 flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold mb-6">Welcome to WorkFlowX!</h1>
          <p className="text-lg mb-6">
            Whether you're looking to organize your tasks, collaborate with your team, or track real-time progress, WorkFlowX has everything you need to boost your productivity.
          </p>

          {/* Features Section */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-3">Organize Your Work</h4>
              <p>Keep tasks sorted and ensure priorities are met. Plan smarter with tools that help you stay on track.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-3">Collaborate Effortlessly</h4>
              <p>Connect with your team in real-time, share files, and work together towards common goals.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-3">Get Data-Driven Insights</h4>
              <p>Measure progress and gain insights with detailed analytics to make data-backed decisions.</p>
            </div>
          </div>

          {/* Call to Action for New Users */}
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold">New to WorkFlowX?</p>
            <Link to="/signup" className="mt-2 inline-block text-lg text-blue-500 hover:underline">
              Sign up today to get started!
            </Link>
          </div>

          {/* Login Reminder */}
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold">Already a member?</p>
            <p className="text-gray-300">Log in to continue where you left off!</p>
          </div>
        </div>
      </div>

      {/* Right Section (Login) */}
      <div className="w-full lg:w-1/3 flex items-center justify-center bg-white p-10">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
            Admin Log In to <span className="text-blue-600">WorkFlowX</span>
          </h2>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full mb-6 flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-500">or login with email</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <form
            onSubmit={submitH}
            className="flex flex-col items-center justify-center gap-6"
          >
            {/* Email Input */}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-gray-800 outline-none bg-gray-100 border border-gray-300 text-lg py-3 px-4 rounded-lg shadow-md placeholder-gray-500 focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="Enter your email"
            />

            {/* Password Input */}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-gray-800 outline-none bg-gray-100 border border-gray-300 text-lg py-3 px-4 rounded-lg shadow-md placeholder-gray-500 focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Enter your password"
            />

            {/* Login Button */}
            <button
              type="submit"
              className="w-full mt-4 text-white bg-green-500 hover:bg-green-600 transition-all text-lg py-3 px-5 rounded-lg shadow-lg"
            >
              {authing ? 'Logging In...' : 'Log In'}
            </button>
          </form>

          {/* Sign-Up Link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't have an admin account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              You are an employee, right?{' '}
              <Link to="/EmployeeLogin" className="text-blue-600 hover:underline">
                Employee Login
              </Link>
            </p>
          </div>

          {/* Footer Information */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm font-medium">
              © {new Date().getFullYear()} <span className="font-semibold text-blue-600">WorkFlowX</span>. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2">
  Created with ❤️ by <span className="font-semibold text-blue-600">Spriha Shringi & Team</span>
</p>

            <a 
              href="mailto:shringispriha@gmail.com" 
              className="text-blue-600 hover:text-blue-500 text-sm mt-2 inline-block underline font-medium transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
