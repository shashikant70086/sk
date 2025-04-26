import { useState } from "react";
import { Button } from "@/components/ui/button";
import ModeSelector from "@/components/ModeSelector";
import ChatInterface from "@/components/ChatInterface";
import ProductsSection from "@/components/ProductsSection";
import { Product } from "@shared/types";
import { FaGoogle } from "react-icons/fa";

// Sample product data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Smartwatch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=200&h=200"
  },
  {
    id: "2",
    name: "Headphones",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=200&h=200"
  },
  {
    id: "3",
    name: "Smart Speaker",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=200&h=200"
  }
];

export default function Home() {
  const [mode, setMode] = useState("full-ai");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column: Title, Mode, Products */}
        <div className="space-y-8 animate-fade-in">
          {/* Hero Section */}
          <div className="space-y-2">
            <h1 className="text-4xl font-light leading-tight">
              AI-Powered<br />
              <span className="font-semibold">Adaptive Shopping</span><br />
              Agent
            </h1>
          </div>
          
          {/* Mode Selector */}
          <ModeSelector value={mode} onChange={setMode} />
          
          {/* Products Section */}
          <ProductsSection products={sampleProducts} />
          
          {/* Login Button */}
          <div className="flex justify-center pt-2">
            <Button 
              variant="outline" 
              className="bg-card hover:bg-card/90 text-foreground font-medium py-6 px-6 rounded-lg border border-border transition-colors flex items-center"
            >
              <FaGoogle className="mr-2" />
              Login with Google
            </Button>
          </div>
        </div>
        
        {/* Right Column: Chat Interface */}
        <div className="h-full">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}
