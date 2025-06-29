import React from 'react';

const FeaturedProducts = ({ 
  products = [
    {
      id: 1,
      name: 'Sample Product',
      image: 'https://via.placeholder.com/300',
      tags: [],
      price: 0,
      description: 'Product description',
      seller: 'Sample Seller'
    }
  ], 
  openProductModal = (product) => console.log('Open product:', product), 
  addToCart = (product) => console.log('Add to cart:', product) 
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Featured Products</h2>
        <a href="#" className="text-purple-600 text-sm font-medium">View All</a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div 
            key={product.id} 
            className="product-card bg-white rounded-xl shadow-sm overflow-hidden transition duration-300 cursor-pointer"
            onClick={() => openProductModal(product)}
          >
            <div className="relative">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              {product.tags && product.tags.includes("Eco-friendly") && (
                <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                  Eco-friendly
                </div>
              )}
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
    </div>
  );
};

export default FeaturedProducts;