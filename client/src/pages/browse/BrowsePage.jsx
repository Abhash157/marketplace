import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';

const BrowsePage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  
 const featuredProducts = [
  {
    id: 1,
    name: "Reusable Bamboo Bottle",
    company: "EcoBags",
    price: 24.99,
    rating: 4.8,
     image: "/assets/products/one.jpg",
    tags: ["Eco-friendly"]
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    company: "TechGadgets",
    price: 59.99,
    rating: 4.5,
    image: "/assets/products/two.jpg",
    tags: ["Tech", "Audio"]
  },
  {
    id: 3,
    name: "Organic Cotton Tote",
    company: "GreenStyle",
    price: 18.99,
    rating: 4.9,
    image: "/assets/products/3-min.jpg",
    tags: ["Bags", "Eco-friendly"]
  },
  {
    id: 4,
    name: "Vintage Camera",
    company: "RetroTech",
    price: 89.99,
    rating: 4.7,
    image: "/assets/products/4-min.jpg",
    tags: ["Camera"]
  },
  {
    id: 5,
    name: "Eco-Friendly Notebook Set",
    company: "GreenStationery Co.",
    price: 14.99,
    rating: 4.5,
    image: "/assets/products/4-min.jpg",
    tags: ["Stationery", "Eco-friendly"]
  },
  {
    id: 6,
    name: "Study Desk Lamp",
    company: "BrightLite",
    price: 29.99,
    rating: 4.6,
    image: "/assets/products/5-min.jpg",
    tags: ["Lighting", "Study"]
  },
  {
    id: 7,
    name: "Noise-Canceling Earbuds",
    company: "SoundZen",
    price: 59.99,
    rating: 4.8,
    image: "/assets/products/7-min.jpg",
    tags: ["Audio"]
  },
  {
    id: 8,
    name: "Reusable Bamboo Pen Set",
    company: "EcoInk",
    price: 9.99,
    rating: 4.3,
    image: "/assets/products/8-min.jpg",
    tags: ["Stationery", "Eco-friendly"]
  },
  {
    id: 9,
    name: "Portable Whiteboard Kit",
    company: "ThinkBoard",
    price: 24.99,
    rating: 4.6,
    image: "https://m.media-amazon.com/images/I/618A0OmuIFL._AC_SL1500_.jpg",
    tags: ["Study"]
  },
  {
    id: 10,
    name: "Focus Timer Clock",
    company: "TimeTrek",
    price: 17.99,
    rating: 4.2,
    image: "https://hackaday.com/wp-content/uploads/2021/10/pomodoro-800.png?w=800",
    tags: ["Timer", "Study"]
  },
  {
    id: 11,
    name: "Custom College Hoodie",
    company: "CampusThreads",
    price: 39.99,
    rating: 4.7,
    image: "https://i.etsystatic.com/28034476/r/il/f3144d/5505635872/il_fullxfull.5505635872_7fdc.jpg",
    tags: ["Clothing"]
  },
  {
    id: 12,
    name: "Mini Solar Power Bank",
    company: "SunCharge",
    price: 22.99,
    rating: 4.5,
    image: "https://images-cdn.ubuy.com.sa/634004b13bc2bd6a95629d4b-ubuy-online-shopping.jpg",
    tags: ["Tech", "Power"]
  },
  {
    id: 13,
    name: "Ergonomic Study Chair",
    company: "SitWell",
    price: 129.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1585559602038-35057c43fefb?auto=format&fit=crop&w=500&q=80",
    tags: ["Furniture", "Study"]
  },
  {
    id: 14,
    name: "Handmade Pencil Case",
    company: "CraftEssence",
    price: 12.49,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1611078489795-5c7f1e88eab6?auto=format&fit=crop&w=500&q=80",
    tags: ["Stationery", "Bags"]
  },
  {
    id: 15,
    name: "Motivational Wall Posters",
    company: "InspireSpace",
    price: 9.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1587574293340-b9d9b8438453?auto=format&fit=crop&w=500&q=80",
    tags: ["Decor"]
  },
  {
    id: 17,
    name: "Laptop Cooling Pad",
    company: "CoolTech",
    price: 25.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1587202372775-9890ef238fb1?auto=format&fit=crop&w=500&q=80",
    tags: ["Tech"]
  },
  {
    id: 18,
    name: "Cord Organizer Clips",
    company: "TidyDesk",
    price: 6.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1581089781785-603411fa81f5?auto=format&fit=crop&w=500&q=80",
    tags: ["Organizer"]
  },
  {
    id: 19,
    name: "Sticky Note Set",
    company: "NoteNest",
    price: 4.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1583416759374-a394d7ddbcc5?auto=format&fit=crop&w=500&q=80",
    tags: ["Stationery"]
  },
  {
    id: 20,
    name: "Portable Phone Stand",
    company: "FlexHold",
    price: 7.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1598327105662-845c1e64c5d3?auto=format&fit=crop&w=500&q=80",
    tags: ["Accessories"]
  },
  {
    id: 21,
    name: "Academic Flashcards Set",
    company: "SmartCards",
    price: 11.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1599064656878-90afba9e81f6?auto=format&fit=crop&w=500&q=80",
    tags: ["Study"]
  },
  {
    id: 22,
    name: "Hostel Essentials Kit",
    company: "UniBox",
    price: 49.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1592928303705-7f847b27a4e3?auto=format&fit=crop&w=500&q=80",
    tags: ["Accessories"]
  },
  {
    id: 23,
    name: "Wireless Mouse",
    company: "CareerBoost",
    price: 5.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=500&q=80",
    tags: ["Tech"]
  },
  {
    id: 24,
    name: "USB Reading Light",
    company: "BrightBeam",
    price: 8.49,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1587033851617-74a976e3f888?auto=format&fit=crop&w=500&q=80",
    tags: ["Lighting", "Study"]
  },
  {
    id: 25,
    name: "Noise-Isolating Headphones",
    company: "ClearWave",
    price: 49.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1580894908360-7b1b71db10f6?auto=format&fit=crop&w=500&q=80",
    tags: ["Audio"]
  }
];



  // Extract unique categories
  const categories = ['All', ...new Set(featuredProducts.flatMap(product => 
    product.tags ? product.tags : []
  ).filter(tag => tag !== ""))];

  // Filter products based on search and category
  const filteredProducts = featuredProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'All' || 
      (product.tags && product.tags.includes(selectedCategory));
    
    return matchesSearch && matchesCategory;
  });

  // Handlers for product actions
  const openProductModal = (product) => {
    console.log('Open product modal:', product);
    // In a real app, you might set state for a modal or navigate to product page
  };

  const addToCart = (product) => {
    console.log('Add to cart:', product);
    // In a real app, you would dispatch to your cart store
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'md:ml-64'}`}>
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-4 md:p-8">
          <div className="container mx-auto">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full p-4 pl-12 pr-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedCategory === 'All' ? 'All Products' : selectedCategory}
                  <span className="text-gray-500 text-base font-normal ml-2">
                    ({filteredProducts.length} products)
                  </span>
                </h2>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-700">No products found</h3>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <div 
                      key={product.id} 
                      className="product-card bg-white rounded-xl shadow-sm overflow-hidden transition duration-300 hover:shadow-md cursor-pointer"
                      onClick={() => openProductModal(product)}
                    >
<div className="relative">
  <img 
    src={product.image} 
    alt={product.name} 
    className="w-full h-48 object-cover"
  />
  <div className="absolute top-2 right-2 flex flex-wrap justify-end gap-1">
    {product.tags && product.tags.map((tag, index) => (
      <div 
        key={index}
        className={`text-xs px-2 py-1 rounded-full font-medium ${
          tag === "Eco-friendly" ? 'bg-gray-100 text-gray-800'  :
          tag === "TechGadgets" ? 'bg-gray-100 text-gray-800'  :
          
          'bg-gray-100 text-gray-800' // Default style
        }`}
      >
        {tag}
      </div>
    ))}
  </div>
</div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-800">{product.name}</h3>
                            <p className="text-sm text-gray-500">By {product.company}</p>
                          </div>
                          <div className="flex items-center">
                            <i className="fas fa-star text-yellow-400"></i>
                            <span className="ml-1 text-sm">{product.rating}</span>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="font-bold text-gray-800">Rs {product.price.toFixed(2)}</span>
                          <button 
                            className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrowsePage;