import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import MentorSection from '../../components/dashboard/MentorSection';

// Available mentors data
const availableMentors = [
  {
    id: 1,
    name: "Kritika Nepal",
    title: "Business Development Expert",
    description: "Former startup founder with 3 successful exits. Specializes in sustainable business models and growth strategies.",
    tags: ["Sustainability", "Marketing", "Funding", "Startups"],
    color: "blue",
    rating: 4.9,
    reviews: 142,
    image: "",
    contact: {
      email: "kritika@gmail.com",
      phone: "+977 9818847845",
      whatsapp: "9818847845",
      linkedin: "Kritika Nepal",
      linkedinUrl: "https://linkedin.com/",
      availability: "Mon-Wed, 9am-5pm EST"
    },
    available: true
  },
  {
    id: 2,
    name: "Samrat Rai",
    title: "CTO & Tech Advisor",
    description: "CTO at TechScale with 10+ years experience in product development, scaling tech teams, and modern architecture.",
    tags: ["Product Dev", "Tech Stack", "UI/UX", "Scaling"],
    color: "green",
    rating: 4.8,
    reviews: 98,
    image: "",
    contact: {
      email: "Samratraii@gmail.com",
      phone: "+977 9844026166",
      whatsapp: "+9844026166",
      linkedin: "Samrat Rai",
      linkedinUrl: "https://linkedin.com/",
      availability: "Tue-Thu, 10am-6pm PST"
    },
    available: true
  },
  {
    id: 3,
    name: "Sajal Paudel",
    title: "Venture Capital Partner",
    description: "Venture capitalist specializing in early-stage startups, financial planning, and investment strategies.",
    tags: ["Funding", "Financials", "Pitching", "VC"],
    color: "yellow",
    rating: 4.7,
    reviews: 117,
    image: "",
    contact: {
      email: "sajalpaudel55@gmail.com",
      phone: "+977 9706246912",
      whatsapp: "+9706246912",
      linkedin: "Sajal-Paudel",
      linkedinUrl: "https://linkedin.com/",
      availability: "Mon-Fri, 8am-4pm CST"
    },
    available: true
  }
];

// Unavailable mentors data (same structure, but available: false)
const unavailableMentors = [
  {
    id: 4,
    name: "Nisha Sharma",
    title: "Marketing Specialist",
    description: "Expert in digital marketing strategies and social media campaigns.",
    tags: ["Marketing", "Social Media", "SEO"],
    color: "purple",
    rating: 4.5,
    reviews: 54,
    image: "",
    contact: {
      email: "nisha@example.com",
      phone: "+977 9800000000",
      whatsapp: "9800000000",
      linkedin: "Nisha Sharma",
      linkedinUrl: "https://linkedin.com/",
      availability: "Currently unavailable"
    },
    available: false
  },
  {
    id: 5,
    name: "Ramesh Thapa",
    title: "Product Manager",
    description: "Experienced product manager with a background in tech startups.",
    tags: ["Product Management", "Agile", "Scrum"],
    color: "red",
    rating: 4.6,
    reviews: 78,
    image: "",
    contact: {
      email: "ramesh@example.com",
      phone: "+977 9811111111",
      whatsapp: "9811111111",
      linkedin: "Ramesh Thapa",
      linkedinUrl: "https://linkedin.com/",
      availability: "Currently unavailable"
    },
    available: false
  },
  {
    id: 6,
    name: "Anita Gurung",
    title: "Financial Advisor",
    description: "Specializes in personal finance and startup funding.",
    tags: ["Finance", "Investments", "Budgeting"],
    color: "pink",
    rating: 4.3,
    reviews: 66,
    image: "",
    contact: {
      email: "anita@example.com",
      phone: "+977 9822222222",
      whatsapp: "9822222222",
      linkedin: "Anita Gurung",
      linkedinUrl: "https://linkedin.com/",
      availability: "Currently unavailable"
    },
    available: false
  }, {
    id: 4,
    name: "Avash Sharma",
    title: "Marketing Specialist",
    description: "Expert in digital marketing strategies and social media campaigns.",
    tags: ["Marketing", "Social Media", "SEO"],
    color: "purple",
    rating: 4.5,
    reviews: 54,
    image: "",
    contact: {
      email: "nisha@example.com",
      phone: "+977 9800000000",
      whatsapp: "9800000000",
      linkedin: "Nisha Sharma",
      linkedinUrl: "https://linkedin.com/",
      availability: "Currently unavailable"
    },
    available: false
  },
  {
    id: 5,
    name: "Nirpa Thapa",
    title: "Product Manager",
    description: "Experienced product manager with a background in tech startups.",
    tags: ["Product Management", "Agile", "Scrum"],
    color: "red",
    rating: 4.6,
    reviews: 78,
    image: "",
    contact: {
      email: "ramesh@example.com",
      phone: "+977 9811111111",
      whatsapp: "9811111111",
      linkedin: "Ramesh Thapa",
      linkedinUrl: "https://linkedin.com/",
      availability: "Currently unavailable"
    },
    available: false
  },
  {
    id: 6,
    name: "Prashant Gurung",
    title: "Financial Advisor",
    description: "Specializes in personal finance and startup funding.",
    tags: ["Finance", "Investments", "Budgeting"],
    color: "pink",
    rating: 4.3,
    reviews: 66,
    image: "",
    contact: {
      email: "anita@example.com",
      phone: "+977 9822222222",
      whatsapp: "9822222222",
      linkedin: "Anita Gurung",
      linkedinUrl: "https://linkedin.com/",
      availability: "Currently unavailable"
    },
    available: false
  }
];

const MentorsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Combine all mentors for search and filtering, but separate display below
  const allMentors = [...availableMentors, ...unavailableMentors];
  const filteredMentors = allMentors.filter(mentor =>
    mentor.name.toLowerCase().includes(search.toLowerCase()) ||
    mentor.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  // Handlers
  const openModal = (mentor) => {
    setSelectedMentor(mentor);
    setShowModal(true);
  };
  const closeModal = () => {
    setSelectedMentor(null);
    setShowModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'md:ml-64'}`}>
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-4 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Meet Your Mentors</h1>

          <input
            type="text"
            placeholder="Search mentors by name or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md w-full mb-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Mentors</h2>
            <MentorSection 
              mentors={filteredMentors.filter(m => m.available)} 
              onRequestSession={openModal}
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Not Available Mentors</h2>
            <MentorSection 
              mentors={filteredMentors.filter(m => !m.available)} 
              onRequestSession={(mentor) => {
                // Open modal but show unavailable message
                setSelectedMentor(mentor);
                setShowModal(true);
              }} 
              unavailable={true}
            />
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
                    <h3 className="text-xl font-bold text-gray-800">
                      {selectedMentor.available ? "Contact Mentor" : "Mentor Not Available"}
                    </h3>
                    <button 
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 transition"
                    >
                      <i className="fas fa-times text-lg"></i>
                    </button>
                  </div>

                  {selectedMentor.available ? (
                    <>
                  
                      <p className="mb-4">{selectedMentor.description}</p>
                      <p>Availability: {selectedMentor.contact.availability}</p>
                      <p>Email: {selectedMentor.contact.email}</p>
                      <p>Phone: {selectedMentor.contact.phone}</p>
                      <p>
                        LinkedIn:{" "}
                        <a
                          href={selectedMentor.contact.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 underline"
                        >
                          {selectedMentor.contact.linkedin}
                        </a>
                      </p>
                    </>
                  ) : (
                    <p className="text-red-600 font-semibold">
                      This mentor is currently not available for sessions. Please check back later.
                    </p>
                  )}

                  <button 
                    onClick={closeModal}
                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-medium mt-6"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default MentorsPage;
