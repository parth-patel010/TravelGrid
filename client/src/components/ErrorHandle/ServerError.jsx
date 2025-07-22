import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Custom/Navbar';
import Footer from '../Custom/Footer';

const ServerError = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black to-pink-900">
      <Navbar />

      <main className="flex flex-1 items-center justify-center w-full px-4 py-16">
        <div className="text-center max-w-3xl mx-auto relative">
          {/* Abstract geometric shapes in background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-60 h-60 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full mix-blend-screen opacity-20 blur-3xl top-0 -left-20"></div>
            <div className="absolute w-80 h-80 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mix-blend-screen opacity-20 blur-3xl -bottom-20 -right-20"></div>
          </div>

          {/* Server icon */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-pink-900 bg-opacity-30 rounded-2xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 text-pink-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center animate-pulse opacity-30">
              <div className="w-40 h-40 bg-pink-500 rounded-2xl blur-xl"></div>
            </div>
          </div>

          {/* Error code with animated text */}
          <h1 className="text-[8rem] font-bold leading-none mb-4 relative">
            <span className="text-gray-800">5</span>
            <span className="text-pink-600 animate-pulse">0</span>
            <span className="text-gray-800">0</span>
          </h1>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Server Error
          </h2>

          <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto">
            We're sorry, but something went wrong on our end. Our team has been notified and is working to fix the issue.
          </p>

          <div className="space-y-6 relative z-10">
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 max-w-md mx-auto">
              <p className="text-gray-300 mb-2">Things you can try:</p>
              <ul className="text-left text-gray-400 text-sm space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Refresh the page and try again
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Clear your browser cache and cookies
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Try again in a few minutes
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Page
              </button>
              <Link
                to="/"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>

          <div className="mt-10 text-gray-400">
            <p>Error Reference: <span className="font-mono text-pink-400">{generateErrorRef()}</span></p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Generate a random error reference ID
function generateErrorRef() {
  return `ERR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export default ServerError;