import React, { useState } from 'react';

const MentorSection = ({ mentors }) => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleRequestSession = (mentor) => {
    setSelectedMentor(mentor);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMentor(null);
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
                <button 
                  onClick={() => handleRequestSession(mentor)}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Request Session
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact Modal */}
      {showModal && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Contact Mentor</h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div>
                  <h3 className="font-bold text-gray-800">{selectedMentor.name}</h3>
                  <p className="text-sm text-gray-500">{selectedMentor.title}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedMentor.contact.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedMentor.contact.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Availability</p>
                  <p className="font-medium">{selectedMentor.contact.availability}</p>
                </div>
              </div>
              
              <button 
                onClick={closeModal}
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorSection;