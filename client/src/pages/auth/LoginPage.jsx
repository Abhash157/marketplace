import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="flex items-center mb-6">
            <img src="/assets/logo.png" alt="Logo" className="h-10 mr-2" />
            <h1 className="text-2xl font-bold text-indigo-700">Tech Connect</h1>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>

          <button
            className="w-full py-2 mb-4 border flex items-center justify-center space-x-2 border-gray-300 rounded-md text-sm hover:bg-gray-100"
            onClick={() => alert('Google login coming soon!')}
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            <span>Log in with Google</span>
          </button>

          <div className="text-center text-gray-400 text-sm mb-4">or login with email</div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Your Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Keep me logged in
              </label>
              <a href="#" className="text-indigo-600 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm font-medium disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Log in'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-100 to-indigo-200 items-center justify-center p-8 relative">
        <div className="max-w-md text-center">
          <img src="/assets/illustration.jpg" alt="Login illustration" className="w-full mb-6" />
          <h3 className="text-xl font-bold text-indigo-900 mb-2">New Update Available</h3>
          <p className="text-gray-700 text-sm mb-4">We have added some new awesome features</p>
          <button className="px-4 py-2 bg-white text-indigo-700 border border-indigo-700 rounded hover:bg-indigo-50 text-sm">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
