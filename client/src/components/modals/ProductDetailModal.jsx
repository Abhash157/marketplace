import React, { useState } from 'react';

const ProductDetailModal = ({ isOpen, onClose, product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  
  if (!isOpen || !product) return null;

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
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
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
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
              <span className="ml-2 text-gray-600">4.8 (124 reviews)</span>
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold">RS {product.price.toFixed(2)}</span>
              <span className="ml-2 text-green-600">In Stock</span>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-2">Description:</p>
              <p className="text-gray-600">
                {product.description}
              </p>
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
                <button 
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="px-3">{quantity}</span>
                <button 
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <button 
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                onClick={() => addToCart(product)}
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

export default ProductDetailModal;