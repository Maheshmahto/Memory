import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-primary-600 font-bold text-2xl">Our Memory</div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/"
              className={`text-gray-700 hover:text-primary-600 transition-colors ${
                currentPath === '/' ? 'text-primary-600 font-semibold' : ''
              }`}
            >
              Memories
            </Link>
            <Link 
              to="/birthday"
              className={`text-gray-700 hover:text-primary-600 transition-colors ${
                currentPath === '/birthday' ? 'text-primary-600 font-semibold' : ''
              }`}
            >
              Birthday
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation Links */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <nav className="mt-4 flex flex-col space-y-4 pb-4">
              <Link 
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-gray-700 hover:text-primary-600 transition-colors py-2 text-left ${
                  currentPath === '/' ? 'text-primary-600 font-semibold' : ''
                }`}
              >
                Memories
              </Link>
              <Link 
                to="/birthday"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-gray-700 hover:text-primary-600 transition-colors py-2 text-left ${
                  currentPath === '/birthday' ? 'text-primary-600 font-semibold' : ''
                }`}
              >
                Birthday
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
