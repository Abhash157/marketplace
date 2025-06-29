import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null); // For modal toggle

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return setError("Passwords don't match");

    setError('');
    setIsLoading(true);

    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account. ' + (err.response?.data?.message || err.message));
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 className="text-lg font-semibold mb-2">{modalContent.title}</h2>
            <p className="text-sm text-gray-700 mb-4">{modalContent.body}</p>
            <button
              onClick={() => setModalContent(null)}
              className="mt-2 text-sm px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Create a new account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                sign in to your existing account
              </Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-t-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
              <input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-b-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            {/* Terms and Privacy */}
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our{' '}
              <button
                type="button"
                onClick={() =>
                  setModalContent({
                    title: 'Terms of Service',
                    body: 'These are basic placeholder terms. You agree not to misuse the platform. All user activity is monitored for security.',
                  })
                }
                className="text-indigo-600 hover:underline"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={() =>
                  setModalContent({
                    title: 'Privacy Policy',
                    body: 'We collect your data to improve your experience. Your data is safe with us and will not be shared without consent.',
                  })
                }
                className="text-indigo-600 hover:underline"
              >
                Privacy Policy
              </button>
              .
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex md:w-1/2 h-64 md:h-auto">
        <img
          src="/assets/hero.jpeg"
          alt="Register illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
