import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';

// ProductDetailModal Component (inline for simplicity)
const ProductDetailModal = ({ isOpen, onClose, product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 pr-0 md:pr-6 mb-6 md:mb-0">
            <img src={product.image} alt={product.name} className="w-full rounded-lg" />
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="text-gray-500">By {product.company}</p>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex">
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star-half-alt text-yellow-400"></i>
              </div>
              <span className="ml-2 text-gray-600">{product.rating} rating</span>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold">Rs {product.price.toFixed(2)}</span>
              <span className="ml-2 text-green-600">In Stock</span>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-2">Description:</p>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {product.tags && product.tags.includes("Eco-friendly") && (
              <div className="flex items-center mb-6">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium mr-2">
                  Eco-friendly
                </span>
                <span className="text-sm text-gray-600">Saves ~0.5kg CO2 per use</span>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg">
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100" onClick={decreaseQuantity}>-</button>
                <span className="px-3">{quantity}</span>
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100" onClick={increaseQuantity}>+</button>
              </div>
              <button
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const BrowsePage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
 const featuredProducts = [
 {
    id: 1,
    name: "Reusable Bamboo Bottle",
    company: "EcoBags",
    price: 799,
    rating: 4.8,
    image: "/assets/products/one.jpeg",
    tags: ["Eco-friendly"],
    description: "Eco-friendly bamboo water bottle with stainless steel interior. Keeps drinks cold for 24 hours and hot for 12 hours. 100% biodegradable and sustainable."
  },
  {
    id: 2,
    name: "Smart Watch",
    company: "TechGadgets",
    price: 5499,
    rating: 4.5,
    image: "/assets/products/two.jpg",
    tags: ["Tech", "Audio"],
    description: "Premium wireless earbuds with noise cancellation and 30-hour battery life. Perfect for students on the go."
  },
  {
    id: 3,
    name: "Organic Cotton Tote",
    company: "GreenStyle",
    price: 699,
    rating: 4.9,
    image: "/assets/products/3-min.jpg",
    tags: ["Bags", "Eco-friendly"],
    description: "Stylish and durable organic cotton tote bag. Perfect alternative to plastic bags with reinforced handles."
  },
  {
    id: 4,
    name: "Vintage Camera",
    company: "RetroTech",
    price: 10499,
    rating: 4.7,
    image: "/assets/products/4-min.jpg",
    tags: ["Camera"],
    description: "Fully restored vintage film camera with modern features. Perfect for photography enthusiasts."
  },
  {
    id: 5,
    name: "Eco-Friendly Notebook Set",
    company: "GreenStationery Co.",
    price: 599,
    rating: 4.5,
    image: "/assets/products/4-min.jpg",
    tags: ["Stationery", "Eco-friendly"],
    description: "A set of recycled paper notebooks perfect for eco-conscious students and professionals."
  },
  {
    id: 6,
    name: "Study Desk Lamp",
    company: "BrightLite",
    price: 2299,
    rating: 4.6,
    image: "/assets/products/5-min.jpg",
    tags: ["Lighting", "Study"],
    description: "Adjustable LED desk lamp with touch controls and multiple brightness settings."
  },
  {
    id: 7,
    name: "Noise-Canceling Earbuds",
    company: "SoundZen",
    price: 5999,
    rating: 4.8,
    image: "/assets/products/7-min.jpg",
    tags: ["Audio"],
    description: "Wireless earbuds with active noise cancellation for focused studying or commuting."
  },
  {
    id: 8,
    name: "Reusable Bamboo Pen Set",
    company: "EcoInk",
    price: 399,
    rating: 4.3,
    image: "/assets/products/8-min.png",
    tags: ["Stationery", "Eco-friendly"],
    description: "Sustainable pen set made from bamboo, refillable and stylish."
  },
  {
    id: 9,
    name: "Portable Whiteboard Kit",
    company: "ThinkBoard",
    price: 999,
    rating: 4.6,
    image: "/assets/products/9-min.jpg",
    tags: ["Study"],
    description: "Compact whiteboard set with markers and eraser — great for brainstorming on the go."
  },
  {
    id: 10,
    name: "Focus Timer Clock",
    company: "TimeTrek",
    price: 699,
    rating: 4.2,
    image: "/assets/products/10.jpg",
    tags: ["Timer", "Study"],
    description: "Minimalist timer clock designed for Pomodoro technique and focused study sessions."
  },
  {
    id: 11,
    name: "Custom College Hoodie",
    company: "CampusThreads",
    price: 1999,
    rating: 4.7,
    image: "/assets/products/11-min.jpg",
    tags: ["Clothing"],
    description: "High-quality, customizable college hoodie with soft fleece and stylish fit."
  },
  {
    id: 12,
    name: "Mini Solar Power Bank",
    company: "SunCharge",
    price: 1999,
    rating: 4.5,
    image: "/assets/products/12-min.jpg",
    tags: ["Tech", "Power"],
    description: "Compact solar-powered power bank ideal for students on the move or during load-shedding."
  },
  {
    id: 13,
    name: "Ergonomic Study Chair",
    company: "SitWell",
    price: 13499,
    rating: 4.8,
    image: "/assets/products/Ergonomic Study Chair-min.jpeg",
    tags: ["Furniture", "Study"],
    description: "Comfortable, posture-supporting chair perfect for long study sessions."
  },
  {
    id: 14,
    name: "Handmade Pencil Case",
    company: "CraftEssence",
    price: 499,
    rating: 4.6,
    image: "/assets/products/Handmade Pencil Case-min.jpg",
    tags: ["Stationery", "Bags"],
    description: "Stylish handmade pencil case with natural fabrics and secure zip closure."
  },
  {
    id: 15,
    name: "Motivational Wall Posters",
    company: "InspireSpace",
    price: 399,
    rating: 4.5,
    image: "/assets/products/Motivational Wall Posters.jpg",
    tags: ["Decor"],
    description: "Set of 5 vibrant posters to keep your motivation high while studying."
  },
  {
    id: 17,
    name: "Laptop Cooling Pad",
    company: "CoolTech",
    price: 1899,
    rating: 4.4,
    image: "/assets/products/Laptop Cooling Pad-min-1.jpg",
    tags: ["Tech"],
    description: "USB-powered cooling pad to keep your laptop cool during heavy tasks."
  },
  {
    id: 18,
    name: "Cord Organizer Clips",
    company: "TidyDesk",
    price: 299,
    rating: 4.3,
    image: "/assets/products/Cord Organizer Clips.jpg",
    tags: ["Organizer"],
    description: "Keep all your charging cables and wires neatly organized on your desk."
  },
  {
    id: 19,
    name: "Sticky Note Set",
    company: "NoteNest",
    price: 249,
    rating: 4.6,
    image: "/assets/products/Sticky Note Set-min.jpg",
    tags: ["Stationery"],
    description: "Multicolor sticky notes for quick reminders, study marks, and creative ideas."
  },
  {
    id: 20,
    name: "Portable Phone Stand",
    company: "FlexHold",
    price: 349,
    rating: 4.5,
    image: "/assets/products/Portable Phone Stand-min.jpg",
    tags: ["Accessories"],
    description: "Compact and foldable phone stand ideal for online classes or video calls."
  },
  {
    id: 21,
    name: "Academic Flashcards Set",
    company: "SmartCards",
    price: 599,
    rating: 4.7,
    image: "/assets/products/Academic Flashcards Set.jpg",
    tags: ["Study"],
    description: "Reusable flashcards to boost memory and help with exam preparation."
  },
  {
    id: 22,
    name: "Hostel Essentials Kit",
    company: "UniBox",
    price: 4499,
    rating: 4.8,
    image: "/assets/products/Hostel Essentials Kit-min.jpg",
    tags: ["Accessories"],
    description: "Starter kit with all must-haves for new hostel students — bedding, toiletries, and more."
  },
  {
    id: 23,
    name: "Wireless Mouse",
    company: "CareerBoost",
    price: 699,
    rating: 4.6,
    image: "/assets/products/Wireless mouse-min.jpg",
    tags: ["Tech"],
    description: "Reliable wireless mouse with ergonomic design for everyday computing."
  },
  {
    id: 24,
    name: "USB Reading Light",
    company: "BrightBeam",
    price: 449,
    rating: 4.4,
    image: "/assets/products/USB Reading Light.jpg",
    tags: ["Lighting", "Study"],
    description: "Flexible and portable USB-powered light perfect for late-night studying."
  },
  {
    id: 25,
    name: "Noise-Isolating Headphones",
    company: "ClearWave",
    price: 4599,
    rating: 4.7,
    image: "/assets/products/Noise-Isolating Headphones.jpg",
    tags: ["Audio"],
    description: "Over-ear headphones designed to block distractions and enhance focus."
  }
];



 const categories = ['All', ...new Set(featuredProducts.flatMap(product => product.tags || []).filter(tag => tag !== ""))];

  const filteredProducts = featuredProducts.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' ||
      (product.tags && product.tags.includes(selectedCategory));

    return matchesSearch && matchesCategory;
  });

  // Open modal with product details
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // Add to cart handler (you can extend this to update cart state/store)
  const addToCart = (product, quantity) => {
    console.log('Add to cart:', product, 'Quantity:', quantity);
    // You can add your cart logic here
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
                              className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-800"
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
                              addToCart(product, 1);
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

      {/* Modal */}
      <ProductDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
        addToCart={addToCart}
      />
    </div>
  );
};

export default BrowsePage;