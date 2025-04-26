
import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="p-4">
        <div className="aspect-w-1 aspect-h-1">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={product.image}
            alt={product.name}
          />
        </div>
        <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
        <p className="mt-1 text-sm">{product.description}</p>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-xl font-bold">${product.price}</p>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;