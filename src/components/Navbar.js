import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 bg-indigo-600 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-2xl font-bold">
              BookVerse
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`text-white px-3 py-2 rounded-md text-sm font-medium  ${
                  location.pathname === '/' ? 'bg-gray-900' : ''
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`text-white px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/about' ? 'bg-gray-900' : ''
                }`}
              >
                About
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            {/* Hamburger button */}
            <button
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
              aria-label="Toggle menu"
              onClick={toggleMobileMenu}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          {!localStorage.getItem('token') ? (
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Link
                  to="/login"
                  className={`text-white px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/login' ? 'bg-gray-900' : ''
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`text-white px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/signup' ? 'bg-gray-900' : ''
                  }`}
                >
                  Signup
                </Link>
              </div>
            </div>
          ) : (
            <button
              className="text-white px-3 py-2 rounded-md text-sm font-medium "
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`text-white block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/' ? 'bg-gray-900' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-white block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/about' ? 'bg-gray-900' : ''
              }`}
            >
              About
            </Link>
          </div>
          {!localStorage.getItem('token') && (
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/login"
                className={`text-white px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/login' ? 'bg-gray-900' : ''
                  }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`text-white px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/signup' ? 'bg-gray-900' : ''
                  }`}
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
