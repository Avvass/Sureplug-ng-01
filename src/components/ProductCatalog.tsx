import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Smartphone, Laptop, Headphones } from "lucide-react";

// Sample product data - in a real app, this would come from an API
const smartphones = [
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    price: "₦1,850,000",
    originalPrice: "₦2,000,000",
    image: "/placeholder.svg",
    badge: "Pro",
    rating: 4.9,
    storage: "256GB",
    color: "Natural Titanium"
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: "₦1,450,000",
    originalPrice: "₦1,600,000",
    image: "/placeholder.svg",
    badge: "Popular",
    rating: 4.8,
    storage: "128GB",
    color: "Blue Titanium"
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    price: "₦1,680,000",
    originalPrice: "₦1,850,000",
    image: "/placeholder.svg",
    badge: "S Pen",
    rating: 4.7,
    storage: "512GB",
    color: "Titanium Gray"
  },
  {
    id: 4,
    name: "Google Pixel 8 Pro",
    price: "₦890,000",
    originalPrice: "₦950,000",
    image: "/placeholder.svg",
    badge: "AI Camera",
    rating: 4.6,
    storage: "256GB",
    color: "Obsidian"
  },
];

const macbooks = [
  {
    id: 1,
    name: "MacBook Pro 16\" M3 Max",
    price: "₦4,200,000",
    originalPrice: "₦4,500,000",
    image: "/placeholder.svg",
    badge: "M3 Max",
    rating: 4.9,
    specs: "36GB RAM, 1TB SSD",
    color: "Space Black"
  },
  {
    id: 2,
    name: "MacBook Air 15\" M2",
    price: "₦2,100,000",
    originalPrice: "₦2,300,000",
    image: "/placeholder.svg",
    badge: "Popular",
    rating: 4.8,
    specs: "16GB RAM, 512GB SSD",
    color: "Midnight"
  },
  {
    id: 3,
    name: "MacBook Pro 14\" M3 Pro",
    price: "₦3,400,000",
    originalPrice: "₦3,700,000",
    image: "/placeholder.svg",
    badge: "Pro",
    rating: 4.8,
    specs: "18GB RAM, 512GB SSD",
    color: "Silver"
  },
];

const airpods = [
  {
    id: 1,
    name: "AirPods Pro (2nd Gen)",
    price: "₦285,000",
    originalPrice: "₦320,000",
    image: "/placeholder.svg",
    badge: "Pro",
    rating: 4.8,
    feature: "Active Noise Cancellation",
    battery: "Up to 6hrs"
  },
  {
    id: 2,
    name: "AirPods 3rd Generation",
    price: "₦185,000",
    originalPrice: "₦210,000",
    image: "/placeholder.svg",
    badge: "Popular",
    rating: 4.7,
    feature: "Spatial Audio",
    battery: "Up to 6hrs"
  },
  {
    id: 3,
    name: "AirPods Max",
    price: "₦650,000",
    originalPrice: "₦720,000",
    image: "/placeholder.svg",
    badge: "Premium",
    rating: 4.6,
    feature: "Over-ear Design",
    battery: "Up to 20hrs"
  },
];

const ProductCard = ({ product, type }: { product: any; type: string }) => {
  const handleAddToCart = () => {
    alert(`Login required to add ${product.name} to cart`);
  };

  return (
    <Card className="product-card group">
      <CardHeader className="p-4">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <Badge className="absolute top-2 left-2 bg-brand-accent text-white">
              {product.badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">
          {product.name}
        </CardTitle>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-2">
            ({product.rating})
          </span>
        </div>

        <div className="space-y-1 text-sm text-muted-foreground mb-3">
          {type === 'phone' && (
            <>
              <div>Storage: {product.storage}</div>
              <div>Color: {product.color}</div>
            </>
          )}
          {type === 'laptop' && (
            <>
              <div>{product.specs}</div>
              <div>Color: {product.color}</div>
            </>
          )}
          {type === 'airpods' && (
            <>
              <div>{product.feature}</div>
              <div>Battery: {product.battery}</div>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xl font-bold text-brand-primary">
            {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProductCatalog = () => {
  return (
    <div className="py-16 space-y-16">
      {/* Smartphones Section */}
      <section id="phones" className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Smartphone className="w-8 h-8 text-brand-primary mr-3" />
            <h2 className="text-3xl font-bold">Premium Smartphones</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the latest iPhone, Samsung Galaxy, and Google Pixel devices 
            with authentic warranty and competitive prices.
          </p>
        </div>
        
        <div className="category-grid">
          {smartphones.map((product) => (
            <ProductCard key={product.id} product={product} type="phone" />
          ))}
        </div>
      </section>

      {/* MacBooks Section */}
      <section id="laptops" className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Laptop className="w-8 h-8 text-brand-primary mr-3" />
            <h2 className="text-3xl font-bold">MacBook Collection</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From MacBook Air to MacBook Pro, find the perfect Apple laptop 
            for your creative and professional needs.
          </p>
        </div>
        
        <div className="category-grid">
          {macbooks.map((product) => (
            <ProductCard key={product.id} product={product} type="laptop" />
          ))}
        </div>
      </section>

      {/* AirPods Section */}
      <section id="airpods" className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Headphones className="w-8 h-8 text-brand-primary mr-3" />
            <h2 className="text-3xl font-bold">AirPods & Audio</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience premium audio with the complete AirPods lineup, 
            from wireless earbuds to over-ear headphones.
          </p>
        </div>
        
        <div className="category-grid">
          {airpods.map((product) => (
            <ProductCard key={product.id} product={product} type="airpods" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductCatalog;