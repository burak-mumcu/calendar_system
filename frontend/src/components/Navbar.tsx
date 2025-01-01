import React, { useEffect, useState } from 'react';
import { User, LogOut,X,Menu } from 'lucide-react';
import { getEntityURL } from '../lib/api';
import axios from 'axios';
import { NavbarProps, IUser } from '../lib/types';

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const isAdmin = localStorage.getItem('role') === 'admin'
  const [user, setUser] = useState<IUser | null>(null);
  const isAuthenticated = localStorage.getItem('token');
  
  useEffect(() => {
    getUser();
  }, []);
  
  const getUser = async () => {
    if (isAuthenticated) {
      const entityURL = getEntityURL(['auth', 'me']);
      const response = await axios.get(entityURL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response?.data) {
        setUser(response.data);
        localStorage.setItem('role', response?.data?.role);
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-blue-600">
              KLU Takvimi
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {isAdmin ? (<a href="/calendar" className="text-gray-700 hover:text-blue-600">
              Takvim ekle
            </a>) : ''}

            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <a className="flex items-center text-gray-700 hover:text-blue-600">
                  <User className="h-5 w-5 mr-1" />
                  {user.name}
                </a>
                <button
                  onClick={onLogout}
                  className="flex items-center text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Çıkış
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <a
                  href="/login"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600"
                >
                  Giriş
                </a>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
            {isAdmin ? (<a href="/calendar" className="text-gray-700 hover:text-blue-600">
              Takvim ekle
            </a>) : ''}


              {isAuthenticated && user ? (
                <>
                  <a href="/profile" className="flex items-center text-gray-700 hover:text-blue-600">
                    <User className="h-5 w-5 mr-1" />
                    {user.name}
                  </a>
                  <button
                    onClick={onLogout}
                    className="flex items-center text-red-600 hover:text-red-700"
                  >
                    <LogOut className="h-5 w-5 mr-1" />
                    Çıkış
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="text-gray-700 hover:text-blue-600">
                    Giriş
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
