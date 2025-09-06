import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Star, Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const allAirPods = [
  // Latest AirPods Pro and 3rd Gen
  { id: 1, name: "AirPods Pro (2nd Gen)", price: "₦285,000", originalPrice: "₦320,000", image: "/placeholder.svg", badge: "Pro", rating: 4.8, feature: "Active Noise Cancellation", battery: "Up to 6hrs", color: "White", gen: "2nd Gen Pro" },
  { id: 2, name: "AirPods 3rd Generation", price: "₦185,000", originalPrice: "₦210,000", image: "/placeholder.svg", badge: "Popular", rating: 4.7, feature: "Spatial Audio", battery: "Up to 6hrs", color: "White", gen: "3rd Gen" },
  
  // AirPods Max
  { id: 3, name: "AirPods Max", price: "₦650,000", originalPrice: "₦720,000", image: "/placeholder.svg", badge: "Premium", rating: 4.6, feature: "Over-ear Design", battery: "Up to 20hrs", color: "Space Gray", gen: "Max" },
  { id: 4, name: "AirPods Max", price: "₦650,000", originalPrice: "₦720,000", image: "/placeholder.svg", badge: "Premium", rating: 4.6, feature: "Over-ear Design", battery: "Up to 20hrs", color: "Silver", gen: "Max" },
  { id: 5, name: "AirPods Max", price: "₦650,000", originalPrice: "₦720,000", image: "/placeholder.svg", badge: "Premium", rating: 4.6, feature: "Over-ear Design", battery: "Up to 20hrs", color: "Sky Blue", gen: "Max" },
  { id: 6, name: "AirPods Max", price: "₦650,000", originalPrice: "₦720,000", image: "/placeholder.svg", badge: "Premium", rating: 4.6, feature: "Over-ear Design", battery: "Up to 20hrs", color: "Pink", gen: "Max" },
  { id: 7, name: "AirPods Max", price: "₦650,000", originalPrice: "₦720,000", image: "/placeholder.svg", badge: "Premium", rating: 4.6, feature: "Over-ear Design", battery: "Up to 20hrs", color: "Green", gen: "Max" },
  
  // AirPods Pro 1st Gen
  { id: 8, name: "AirPods Pro (1st Gen)", price: "₦220,000", originalPrice: "₦260,000", image: "/placeholder.svg", badge: "Pro", rating: 4.5, feature: "Active Noise Cancellation", battery: "Up to 4.5hrs", color: "White", gen: "1st Gen Pro" },
  
  // AirPods 2nd Generation
  { id: 9, name: "AirPods (2nd Gen) with Charging Case", price: "₦145,000", originalPrice: "₦170,000", image: "/placeholder.svg", badge: "Classic", rating: 4.4, feature: "Hey Siri", battery: "Up to 5hrs", color: "White", gen: "2nd Gen" },
  { id: 10, name: "AirPods (2nd Gen) with Wireless Charging Case", price: "₦165,000", originalPrice: "₦190,000", image: "/placeholder.svg", badge: "Wireless", rating: 4.4, feature: "Wireless Charging", battery: "Up to 5hrs", color: "White", gen: "2nd Gen" },
  
  // AirPods 1st Generation
  { id: 11, name: "AirPods (1st Gen)", price: "₦115,000", originalPrice: "₦140,000", image: "/placeholder.svg", badge: "Original", rating: 4.2, feature: "W1 Chip", battery: "Up to 5hrs", color: "White", gen: "1st Gen" },
  
  // Special Editions and Accessories
  { id: 12, name: "AirPods Pro (2nd Gen) with MagSafe", price: "₦295,000", originalPrice: "₦330,000", image: "/placeholder.svg", badge: "MagSafe", rating: 4.8, feature: "MagSafe Charging", battery: "Up to 6hrs", color: "White", gen: "2nd Gen Pro" },
  { id: 13, name: "AirPods 3 with Lightning Case", price: "₦185,000", originalPrice: "₦210,000", image: "/placeholder.svg", badge: "Lightning", rating: 4.7, feature: "Lightning Charging", battery: "Up to 6hrs", color: "White", gen: "3rd Gen" },
  { id: 14, name: "AirPods 3 with MagSafe Case", price: "₦195,000", originalPrice: "₦220,000", image: "/placeholder.svg", badge: "MagSafe", rating: 4.7, feature: "MagSafe Charging", battery: "Up to 6hrs", color: "White", gen: "3rd Gen" },
  
  // Refurbished and Previous Models
  { id: 15, name: "AirPods Pro (1st Gen) - Refurbished", price: "₦185,000", originalPrice: "₦220,000", image: "/placeholder.svg", badge: "Refurbished", rating: 4.3, feature: "Noise Cancellation", battery: "Up to 4.5hrs", color: "White", gen: "1st Gen Pro" },
  { id: 16, name: "AirPods (2nd Gen) - Refurbished", price: "₦115,000", originalPrice: "₦145,000", image: "/placeholder.svg", badge: "Refurbished", rating: 4.2, feature: "Hey Siri", battery: "Up to 5hrs", color: "White", gen: "2nd Gen" }
];

const ProductCard = ({ product }: { product: any }) => {
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
          <div>{product.feature}</div>
          <div>Battery: {product.battery}</div>
          <div>Generation: {product.gen}</div>
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

const AirPodsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allAirPods);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts(allAirPods);
    } else {
      const filtered = allAirPods.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.gen.toLowerCase().includes(query.toLowerCase()) ||
        product.feature.toLowerCase().includes(query.toLowerCase()) ||
        product.color.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">AirPods & Audio Collection</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search AirPods by model, generation, or features..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing {filteredProducts.length} of {allAirPods.length} AirPods models
          </p>

          {/* Products Grid */}
          <div className="category-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No AirPods found matching your search.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AirPodsPage;