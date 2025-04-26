import { ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@shared/types";

interface ProductsSectionProps {
  products: Product[];
}

export default function ProductsSection({ products }: ProductsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">Products</h2>
        <a href="#" className="text-primary hover:text-primary/80 flex items-center transition-colors">
          <span>View recommended products</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            delay={0.1 * (index + 1)} 
          />
        ))}
      </div>
    </div>
  );
}
