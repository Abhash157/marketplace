import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-6 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white font-bold" >
            TC
          </div>
          <span className="text-lg font-bold text-purple-800">Tech Connect</span>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-purple-600">About</a>
          <a href="#" className="text-gray-600 hover:text-purple-600">Terms</a>
          <a href="#" className="text-gray-600 hover:text-purple-600">Privacy</a>
          <a href="#" className="text-gray-600 hover:text-purple-600">Contact</a>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-purple-600"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-gray-600 hover:text-purple-600"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-gray-600 hover:text-purple-600"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-gray-600 hover:text-purple-600"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-gray-500">
        © 2023 UniConnect. All rights reserved. Made with ❤️ for student entrepreneurs.
      </div>
    </footer>
  );
};

export default Footer;