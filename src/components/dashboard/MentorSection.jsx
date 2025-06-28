import React from 'react';

const MentorSection = ({ mentors }) => {
  const getColorClasses = (color) => {
    switch(color) {
      case 'blue':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-800'
        };
      case 'green':
        return {
          bg: 'bg-green-100',
          text: 'text-green-600',
          badge: 'bg-green-100 text-green-800'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-600',
          badge: 'bg-yellow-100 text-yellow-800'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Available Mentors</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map(mentor => {
          const colorClasses = getColorClasses(mentor.color);
          return (
            <div key={mentor.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-16 h-16 rounded-full ${colorClasses.bg} flex items-center justify-center`}>
                    <i className={`fas fa-user-tie ${colorClasses.text} text-2xl`}></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{mentor.name}</h3>
                    <p className="text-sm text-gray-500">{mentor.title}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{mentor.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className={`${colorClasses.badge} text-xs px-2 py-1 rounded`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                  Request Session
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MentorSection;