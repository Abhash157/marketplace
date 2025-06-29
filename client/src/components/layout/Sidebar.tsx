import React from 'react';
import { NavLink } from 'react-router-dom';

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { name: 'Wallet', icon: 'account_balance_wallet', path: '/wallet' },
    { name: 'Transactions', icon: 'receipt', path: '/transactions' },
    { name: 'Investments', icon: 'trending_up', path: '/investments' },
    { name: 'Settings', icon: 'settings', path: '/settings' },
  ];

  return (
    <aside 
      className={`fixed top-16 left-0 h-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-16'
      }`}
    >
      <div className="h-full overflow-y-auto">
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    } ${!isOpen && 'justify-center'}`
                  }
                >
                  <span className="material-icons-round text-xl">
                    {item.icon}
                  </span>
                  {isOpen && <span className="ml-3">{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Toggle button for mobile */}
      <div className="absolute bottom-4 right-0 transform translate-x-1/2">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none"
        >
          <span className="material-icons-round">
            {isOpen ? 'chevron_left' : 'chevron_right'}
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
