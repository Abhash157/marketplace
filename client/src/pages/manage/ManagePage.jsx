import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';

const AdminProductManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Initialize with sample products
  useEffect(() => {
    const sampleProducts = [
      {
        id: 1,
        name: "Reusable Bamboo Bottle",
        company: "EcoBags",
        price: 799,
        rating: 4.8,
        image: "/assets/products/one.jpeg",
        tags: ["Eco-friendly"],
        description: "Eco-friendly bamboo water bottle with stainless steel interior."
      },
      {
        id: 2,
        name: "Smart Watch",
        company: "TechGadgets",
        price: 5499,
        rating: 4.5,
        image: "/assets/products/two.jpg",
        tags: ["Tech", "Audio"],
        description: "Premium wireless earbuds with noise cancellation."
      },
      {
    id: 3,
    name: "Organic Cotton Tote",
    company: "GreenStyle",
    price: 699,
    rating: 4.9,
    image: "/assets/products/3-min.jpg",
    tags: ["Bags", "Eco-friendly"],
    description: "Stylish and durable organic cotton tote bag. Perfect alternative to plastic bags with reinforced handles. Price: $18.99"
  },
  {
    id: 4,
    name: "Vintage Camera",
    company: "RetroTech",
    price: 10499,
    rating: 4.7,
    image: "/assets/products/4-min.jpg",
    tags: ["Camera"],
    description: "Fully restored vintage film camera with modern features. Perfect for photography enthusiasts. Price: $89.99"
  },
  {
    id: 5,
    name: "Eco-Friendly Notebook Set",
    company: "GreenStationery Co.",
    price: 599,
    rating: 4.5,
    image: "/assets/products/4-min.jpg",
    tags: ["Stationery", "Eco-friendly"],
    description: "A set of recycled paper notebooks perfect for eco-conscious students and professionals. Price: $14.99"
  },
  {
    id: 6,
    name: "Study Desk Lamp",
    company: "BrightLite",
    price: 2299,
    rating: 4.6,
    image: "/assets/products/5-min.jpg",
    tags: ["Lighting", "Study"],
    description: "Adjustable LED desk lamp with touch controls and multiple brightness settings. Price: $29.99"
  },
  {
    id: 7,
    name: "Noise-Canceling Earbuds",
    company: "SoundZen",
    price: 5999,
    rating: 4.8,
    image: "/assets/products/7-min.jpg",
    tags: ["Audio"],
    description: "Wireless earbuds with active noise cancellation for focused studying or commuting. Price: $59.99"
  },
  {
    id: 8,
    name: "Reusable Bamboo Pen Set",
    company: "EcoInk",
    price: 399,
    rating: 4.3,
    image: "/assets/products/8-min.png",
    tags: ["Stationery", "Eco-friendly"],
    description: "Sustainable pen set made from bamboo, refillable and stylish. Price: $9.99"
  },
  {
    id: 9,
    name: "Portable Whiteboard Kit",
    company: "ThinkBoard",
    price: 999,
    rating: 4.6,
    image: "/assets/products/9-min.jpg",
    tags: ["Study"],
    description: "Compact whiteboard set with markers and eraser — great for brainstorming on the go. Price: $24.99"
  },
  {
    id: 10,
    name: "Focus Timer Clock",
    company: "TimeTrek",
    price: 699,
    rating: 4.2,
    image: "/assets/products/10.jpg",
    tags: ["Timer", "Study"],
    description: "Minimalist timer clock designed for Pomodoro technique and focused study sessions. Price: $17.99"
  },
  {
    id: 11,
    name: "Custom College Hoodie",
    company: "CampusThreads",
    price: 1999,
    rating: 4.7,
    image: "/assets/products/11-min.jpg",
    tags: ["Clothing"],
    description: "High-quality, customizable college hoodie with soft fleece and stylish fit. Price: $39.99"
  },
  {
    id: 12,
    name: "Mini Solar Power Bank",
    company: "SunCharge",
    price: 1999,
    rating: 4.5,
    image: "/assets/products/12-min.jpg",
    tags: ["Tech", "Power"],
    description: "Compact solar-powered power bank ideal for students on the move or during load-shedding. Price: $22.99"
  },
    ];
    setProducts(sampleProducts);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

 
  const openProductModal = (product = null) => {
    setCurrentProduct(product || {
      id: '',
      name: '',
      company: '',
      price: 0,
      rating: 0,
      image: '',
      tags: [],
      description: ''
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: value
    });
  };

  // Handle tag changes
  const handleTagChange = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const tags = options.map(option => option.value);
    setCurrentProduct({
      ...currentProduct,
      tags
    });
  };

  // Add or update product
  const saveProduct = () => {
    if (currentProduct.id) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === currentProduct.id ? currentProduct : p
      ));
    } else {
      // Add new product
      const newProduct = {
        ...currentProduct,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
      };
      setProducts([...products, newProduct]);
    }
    closeModal();
  };

  // Delete product
  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Filter products based on search
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Tag options
  const tagOptions = ['Eco-friendly', 'Tech', 'Audio', 'Bags', 'Stationery', 'Study', 
                      'Camera', 'Lighting', 'Power', 'Furniture', 'Decor', 'Organizer', 
                      'Accessories', 'Clothing'];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'md:ml-64'}`}>
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-4 md:p-6 overflow-x-auto">
          <div className="container mx-auto">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
                <p className="text-gray-600">Manage your product inventory</p>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => openProductModal()}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
                >
                  <i className="fas fa-plus mr-2"></i> Add New Product
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                
                <div className="flex items-center">
                  
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProducts.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        No products found
                      </td>
                    </tr>
                  ) : (
                    currentProducts.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img 
                                className="h-10 w-10 rounded-md object-cover" 
                                src={product.image} 
                                alt={product.name} 
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/40?text=Image';
                                  e.target.onerror = null;
                                }}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500 line-clamp-1 max-w-xs">{product.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.company}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Rs {product.price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-900 mr-1">{product.rating}</span>
                            <i className="fas fa-star text-yellow-400"></i>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {product.tags.map((tag, index) => (
                              <span 
                                key={index} 
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openProductModal(product)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                        <span className="font-medium">
                          {Math.min(indexOfLastItem, filteredProducts.length)}
                        </span>{' '}
                        of <span className="font-medium">{filteredProducts.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <i className="fas fa-chevron-left"></i>
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === page
                                ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">
                {currentProduct.id ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={currentProduct.company}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs)</label>
                  <input
                    type="number"
                    name="price"
                    value={currentProduct.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter price"
                    min="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={currentProduct.rating}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter rating (0-5)"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={currentProduct.image}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter image URL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <select
                  multiple
                  value={currentProduct.tags}
                  onChange={handleTagChange}
                  className="w-full p-2 border border-gray-300 rounded-lg min-h-[100px]"
                >
                  {tagOptions.map((tag, index) => (
                    <option key={index} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple tags</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={currentProduct.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product description"
                  rows="3"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProduct}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  {currentProduct.id ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductManagement;