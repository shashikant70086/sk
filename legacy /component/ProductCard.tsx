import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@shared/types";

interface ProductCardProps {
  product: Product;
  delay?: number;
}

export default function ProductCard({ product, delay = 0 }: ProductCardProps) {
  const { name, price, image } = product;
  
  return (
    <Card className="product-card animate-slide-up overflow-hidden border border-border" style={{ animationDelay: `${delay}s` }}>
      <CardContent className="p-6 flex flex-col items-center">
        <img src={image} alt={name} className="w-32 h-32 object-contain mb-4" />
        <h3 className="text-lg font-medium mb-1">{name}</h3>
        <p className="text-xl font-semibold text-primary">${price.toFixed(2)}</p>
        <Button className="mt-4 w-full bg-primary hover:bg-primary/90 transition-colors">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
