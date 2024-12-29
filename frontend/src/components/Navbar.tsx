import React, { useEffect, useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { getEntityURL } from '../lib/api';
import axios from 'axios';
import {NavbarProps,IUser }from '../lib/types'



const Navbar: React.FC<NavbarProps> = ({onLogout }) => {
  const [user,setUser] = useState<IUser | null>(null);
  const isAuthenticated = localStorage.getItem('token');
  
  useEffect(() => {
    getUser()
  },[])
  
  const getUser = async () => {
    if(isAuthenticated){
      const entityURL = getEntityURL(["auth", "me"]);
      const response = await axios.get(entityURL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });      
      if(response?.data){
        setUser(response.data)
        localStorage.setItem('role',response?.data?.role);
        }
    }
    
  }

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
            <a href="/" className="text-gray-700 hover:text-blue-600">
              Ana Sayfa
            </a>
            <a href="/about" className="text-gray-700 hover:text-blue-600">
              Hakkımızda
            </a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600">
              İletişim
            </a>
            
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
              <a href="/" className="text-gray-700 hover:text-blue-600">
                Ana Sayfa
              </a>
              <a href="/about" className="text-gray-700 hover:text-blue-600">
                Hakkımızda
              </a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600">
                İletişim
              </a>
              
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
                  <a
                    href="/login"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Giriş
                  </a>
                  <a
                    href="/register"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center"
                  >
                    Kayıt Ol
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