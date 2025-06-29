import React, { useState } from 'react';

const MentorSection = ({ mentors }) => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState({}); // Track copied status for each contact type

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-800',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        badge: 'bg-green-100 text-green-800',
        button: 'bg-green-600 hover:bg-green-700'
      },
      yellow: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600',
        badge: 'bg-yellow-100 text-yellow-800',
        button: 'bg-yellow-600 hover:bg-yellow-700'
      },
      default: {
        bg: 'bg-gray-100',
        text: 'text-gray-600',
        badge: 'bg-gray-100 text-gray-800',
        button: 'bg-gray-600 hover:bg-gray-700'
      }
    };
    
    return colors[color] || colors.default;
  };

  const handleRequestSession = (mentor) => {
    setSelectedMentor(mentor);
    setShowModal(true);
    setCopied({}); // Reset copied status
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMentor(null);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied({[type]: true});
    setTimeout(() => setCopied(prev => ({...prev, [type]: false})), 2000);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Mentors</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map(mentor => {
          const colorClasses = getColorClasses(mentor.color);
          return (
            <div 
              key={mentor.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-16 h-16 rounded-full ${colorClasses.bg} flex items-center justify-center`}>
                    {mentor.image ? (
                      <img 
                        src={mentor.image} 
                        alt={mentor.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <i className={`fas fa-user-tie ${colorClasses.text} text-2xl`}></i>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{mentor.name}</h3>
                    <p className="text-sm text-gray-500">{mentor.title}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400 mr-1">
                        <i className="fas fa-star"></i>
                      </span>
                      <span className="text-gray-600 text-sm">
                        {mentor.rating} ({mentor.reviews} reviews)
                      </span>
                    </div>
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
                  className={`w-full ${colorClasses.button} text-white py-2 rounded-lg transition flex items-center justify-center`}
                >
                  <i className="fas fa-comments mr-2"></i>
                  Request Session
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact Modal */}
      {showModal && selectedMentor && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Contact Mentor</h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-6 pb-4 border-b">
                <div className={`w-20 h-20 rounded-full ${getColorClasses(selectedMentor.color).bg} flex items-center justify-center`}>
                  {selectedMentor.image ? (
                    <img 
                      src={selectedMentor.image} 
                      alt={selectedMentor.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <i className={`fas fa-user-tie ${getColorClasses(selectedMentor.color).text} text-3xl`}></i>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-xl">{selectedMentor.name}</h3>
                  <p className="text-gray-600">{selectedMentor.title}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400 mr-1">
                      <i className="fas fa-star"></i>
                    </span>
                    <span className="text-gray-600 text-sm">
                      {selectedMentor.rating} ({selectedMentor.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <i className="fas fa-clock text-gray-500 mr-2"></i>
                    Availability
                  </h4>
                  <p className="font-medium">{selectedMentor.contact.availability}</p>
                </div>
                
                <h4 className="font-semibold text-gray-700 mb-2">Contact Methods</h4>
                
                {/* Email */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <i className="fas fa-envelope text-purple-600"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedMentor.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <a 
                      href={`mailto:${selectedMentor.contact.email}`}
                      className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition"
                      title="Send Email"
                    >
                      <i className="fas fa-paper-plane text-blue-600"></i>
                    </a>
                    <button 
                      onClick={() => handleCopy(selectedMentor.contact.email, 'email')}
                      className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
                      title="Copy Email"
                    >
                      {copied.email ? (
                        <i className="fas fa-check text-green-500"></i>
                      ) : (
                        <i className="fas fa-copy text-gray-600"></i>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <i className="fas fa-phone text-green-600"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedMentor.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <a 
                      href={`tel:${selectedMentor.contact.phone.replace(/[^\d+]/g, '')}`}
                      className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition"
                      title="Call"
                    >
                      <i className="fas fa-phone-alt text-blue-600"></i>
                    </a>
                    <button 
                      onClick={() => handleCopy(selectedMentor.contact.phone, 'phone')}
                      className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
                      title="Copy Phone"
                    >
                      {copied.phone ? (
                        <i className="fas fa-check text-green-500"></i>
                      ) : (
                        <i className="fas fa-copy text-gray-600"></i>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* WhatsApp */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <i className="fab fa-whatsapp text-green-600 text-lg"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">WhatsApp</p>
                      <p className="font-medium">{selectedMentor.contact.whatsapp}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <a 
                      href={`https://wa.me/${selectedMentor.contact.whatsapp.replace(/[^\d]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition"
                      title="Chat on WhatsApp"
                    >
                      <i className="fab fa-whatsapp text-green-600"></i>
                    </a>
                    <button 
                      onClick={() => handleCopy(selectedMentor.contact.whatsapp, 'whatsapp')}
                      className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
                      title="Copy WhatsApp"
                    >
                      {copied.whatsapp ? (
                        <i className="fas fa-check text-green-500"></i>
                      ) : (
                        <i className="fas fa-copy text-gray-600"></i>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* LinkedIn */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <i className="fab fa-linkedin-in text-blue-700"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">LinkedIn</p>
                      <p className="font-medium">{selectedMentor.contact.linkedin}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <a 
                      href={selectedMentor.contact.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition"
                      title="View Profile"
                    >
                      <i className="fab fa-linkedin-in text-blue-700"></i>
                    </a>
                    <button 
                      onClick={() => handleCopy(selectedMentor.contact.linkedinUrl, 'linkedin')}
                      className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
                      title="Copy Link"
                    >
                      {copied.linkedin ? (
                        <i className="fas fa-check text-green-500"></i>
                      ) : (
                        <i className="fas fa-copy text-gray-600"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={closeModal}
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
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

