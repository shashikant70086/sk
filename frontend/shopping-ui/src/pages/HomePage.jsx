import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ChatArea from '../components/ChatArea';
import ModeDropdown from '../components/ModeDropdown';
import LoginWithGoogle from '../components/LoginWithGoogle';
import TopBar from '../components/TopBar';
import PromptInput from '../components/PromptInput';

const HomePage = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'How can I assist you today?' },
  ]);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Smartwatch',
      price: 199.99,
      description: 'A sleek and modern smartwatch.',
      image: '/Smartwatch.jpg',
    },
    {
      id: 2,
      name: 'Headphones',
      price: 149.99,
      description: 'High-quality noise-cancelling headphones.',
      image: '/Headphones.jpg',
    },
    {
      id: 3,
      name: 'Smart Speaker',
      price: 99.99,
      description: 'A smart speaker with voice assistant.',
      image: '/SmartSpeaker.jpg',
    },
  ]);

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
  };
    const handleSendMessage = (newMessage) => {
        setMessages([...messages, { role: 'user', content: newMessage }]);
    };

    const handleSendPrompt = (prompt) => {
        if (prompt.trim() !== "") {
          handleSendMessage(prompt);
        }
      };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">      
      <TopBar className="bg-blue-900" />
      <div className="flex flex-1">
        {/* Product List (Left Side) */}
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4">
            AI-Powered Adaptive Shopping Agent
          </h2>
          <ModeDropdown value="Full AI Purchase" />
          <div className="mt-6 space-y-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          <div className="mt-8">
            <LoginWithGoogle />
          </div>
        </div>
        {/* Chat Area (Right Side) */}
        <div className="w-1/2 p-6 flex flex-col justify-between">
          <div className="flex-1">
            <ChatArea messages={messages} />
          </div>
          <div className="mt-4">
            <PromptInput handleSubmit={handleSendPrompt} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;