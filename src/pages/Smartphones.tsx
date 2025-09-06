import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Star, Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const allIPhones = [
  // iPhone 16 Series
  { id: 1, name: "iPhone 16 Pro Max", price: "₦1,850,000", originalPrice: "₦2,000,000", image: "/placeholder.svg", badge: "Pro", rating: 4.9, storage: "256GB", color: "Natural Titanium", series: "16" },
  { id: 2, name: "iPhone 16 Pro", price: "₦1,650,000", originalPrice: "₦1,800,000", image: "/placeholder.svg", badge: "Pro", rating: 4.9, storage: "128GB", color: "Desert Titanium", series: "16" },
  { id: 3, name: "iPhone 16 Plus", price: "₦1,250,000", originalPrice: "₦1,400,000", image: "/placeholder.svg", badge: "Plus", rating: 4.8, storage: "256GB", color: "Pink", series: "16" },
  { id: 4, name: "iPhone 16", price: "₦1,050,000", originalPrice: "₦1,200,000", image: "/placeholder.svg", badge: "New", rating: 4.8, storage: "128GB", color: "Ultramarine", series: "16" },
  
  // iPhone 15 Series
  { id: 5, name: "iPhone 15 Pro Max", price: "₦1,650,000", originalPrice: "₦1,800,000", image: "/placeholder.svg", badge: "Pro", rating: 4.8, storage: "256GB", color: "Blue Titanium", series: "15" },
  { id: 6, name: "iPhone 15 Pro", price: "₦1,450,000", originalPrice: "₦1,600,000", image: "/placeholder.svg", badge: "Pro", rating: 4.8, storage: "128GB", color: "White Titanium", series: "15" },
  { id: 7, name: "iPhone 15 Plus", price: "₦1,050,000", originalPrice: "₦1,200,000", image: "/placeholder.svg", badge: "Plus", rating: 4.7, storage: "256GB", color: "Yellow", series: "15" },
  { id: 8, name: "iPhone 15", price: "₦850,000", originalPrice: "₦950,000", image: "/placeholder.svg", badge: "Popular", rating: 4.7, storage: "128GB", color: "Blue", series: "15" },
  
  // iPhone 14 Series
  { id: 9, name: "iPhone 14 Pro Max", price: "₦1,350,000", originalPrice: "₦1,500,000", image: "/placeholder.svg", badge: "Pro", rating: 4.7, storage: "256GB", color: "Deep Purple", series: "14" },
  { id: 10, name: "iPhone 14 Pro", price: "₦1,150,000", originalPrice: "₦1,300,000", image: "/placeholder.svg", badge: "Pro", rating: 4.7, storage: "128GB", color: "Gold", series: "14" },
  { id: 11, name: "iPhone 14 Plus", price: "₦750,000", originalPrice: "₦850,000", image: "/placeholder.svg", badge: "Plus", rating: 4.6, storage: "256GB", color: "Purple", series: "14" },
  { id: 12, name: "iPhone 14", price: "₦650,000", originalPrice: "₦750,000", image: "/placeholder.svg", badge: "Popular", rating: 4.6, storage: "128GB", color: "Midnight", series: "14" },
  
  // iPhone 13 Series
  { id: 13, name: "iPhone 13 Pro Max", price: "₦1,050,000", originalPrice: "₦1,200,000", image: "/placeholder.svg", badge: "Pro", rating: 4.6, storage: "256GB", color: "Sierra Blue", series: "13" },
  { id: 14, name: "iPhone 13 Pro", price: "₦850,000", originalPrice: "₦950,000", image: "/placeholder.svg", badge: "Pro", rating: 4.6, storage: "128GB", color: "Graphite", series: "13" },
  { id: 15, name: "iPhone 13", price: "₦550,000", originalPrice: "₦650,000", image: "/placeholder.svg", badge: "Best Value", rating: 4.5, storage: "128GB", color: "Pink", series: "13" },
  { id: 16, name: "iPhone 13 Mini", price: "₦450,000", originalPrice: "₦550,000", image: "/placeholder.svg", badge: "Compact", rating: 4.5, storage: "128GB", color: "Blue", series: "13" },
  
  // iPhone 12 Series
  { id: 17, name: "iPhone 12 Pro Max", price: "₦750,000", originalPrice: "₦850,000", image: "/placeholder.svg", badge: "Pro", rating: 4.4, storage: "256GB", color: "Pacific Blue", series: "12" },
  { id: 18, name: "iPhone 12 Pro", price: "₦650,000", originalPrice: "₦750,000", image: "/placeholder.svg", badge: "Pro", rating: 4.4, storage: "128GB", color: "Gold", series: "12" },
  { id: 19, name: "iPhone 12", price: "₦450,000", originalPrice: "₦550,000", image: "/placeholder.svg", badge: "5G Ready", rating: 4.3, storage: "64GB", color: "Purple", series: "12" },
  { id: 20, name: "iPhone 12 Mini", price: "₦350,000", originalPrice: "₦450,000", image: "/placeholder.svg", badge: "Compact", rating: 4.3, storage: "64GB", color: "Green", series: "12" }
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
          <div>Storage: {product.storage}</div>
          <div>Color: {product.color}</div>
          <div>Series: iPhone {product.series}</div>
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

const Smartphones = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allIPhones);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts(allIPhones);
    } else {
      const filtered = allIPhones.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.series.toLowerCase().includes(query.toLowerCase()) ||
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
              <h1 className="text-3xl font-bold">iPhone Collection</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search iPhones by model, series, or color..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing {filteredProducts.length} of {allIPhones.length} iPhones
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
                No iPhones found matching your search.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Smartphones;