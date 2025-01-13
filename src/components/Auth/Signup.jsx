import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';

const Signup = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [authing, setAuthing] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setAuthing(true);

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      setAuthing(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      setSuccess('Sign-up successful! A verification email has been sent.');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login
    } catch (err) {
      console.error('Sign-Up Error:', err.message);
      setError(err.message);
    } finally {
      setAuthing(false);
    }
  };

  return (
    <div className="flex h-screen w-screen" style={{ background: 'linear-gradient(to bottom, #6A11CB, #2575FC)' }}>
      <div className="w-full flex items-center justify-center bg-white p-10">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
            Admin Sign Up for <span className="text-blue-600">WorkFlowX</span>
          </h2>
          <form onSubmit={handleSignup} className="flex flex-col items-center justify-center gap-6">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-gray-800 bg-gray-100 border border-gray-300 text-lg py-3 px-4 rounded-lg shadow-md"
              type="email"
              placeholder="Enter your email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-gray-800 bg-gray-100 border border-gray-300 text-lg py-3 px-4 rounded-lg shadow-md"
              type="password"
              placeholder="Create a password"
            />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full text-gray-800 bg-gray-100 border border-gray-300 text-lg py-3 px-4 rounded-lg shadow-md"
              type="password"
              placeholder="Confirm your password"
            />
            <button
              type="submit"
              disabled={authing}
              className={`w-full text-white ${authing ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-lg py-3 px-5 rounded-lg shadow-lg`}
            >
              {authing ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
          {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
