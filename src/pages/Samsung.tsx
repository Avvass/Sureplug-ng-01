import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Star, Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const allSamsungDevices = [
  // Galaxy S Series
  { id: 1, name: "Samsung Galaxy S24 Ultra", price: "₦1,680,000", originalPrice: "₦1,850,000", image: "/placeholder.svg", badge: "S Pen", rating: 4.7, storage: "512GB", color: "Titanium Gray", series: "Galaxy S" },
  { id: 2, name: "Samsung Galaxy S24+", price: "₦1,250,000", originalPrice: "₦1,400,000", image: "/placeholder.svg", badge: "Plus", rating: 4.6, storage: "256GB", color: "Marble Gray", series: "Galaxy S" },
  { id: 3, name: "Samsung Galaxy S24", price: "₦950,000", originalPrice: "₦1,100,000", image: "/placeholder.svg", badge: "AI Phone", rating: 4.6, storage: "128GB", color: "Cobalt Violet", series: "Galaxy S" },
  { id: 4, name: "Samsung Galaxy S23 Ultra", price: "₦1,450,000", originalPrice: "₦1,600,000", image: "/placeholder.svg", badge: "S Pen", rating: 4.6, storage: "512GB", color: "Phantom Black", series: "Galaxy S" },
  { id: 5, name: "Samsung Galaxy S23+", price: "₦1,050,000", originalPrice: "₦1,200,000", image: "/placeholder.svg", badge: "Plus", rating: 4.5, storage: "256GB", color: "Green", series: "Galaxy S" },
  { id: 6, name: "Samsung Galaxy S23", price: "₦750,000", originalPrice: "₦850,000", image: "/placeholder.svg", badge: "Popular", rating: 4.5, storage: "128GB", color: "Phantom Black", series: "Galaxy S" },
  { id: 7, name: "Samsung Galaxy S22 Ultra", price: "₦1,150,000", originalPrice: "₦1,300,000", image: "/placeholder.svg", badge: "S Pen", rating: 4.4, storage: "256GB", color: "Burgundy", series: "Galaxy S" },
  { id: 8, name: "Samsung Galaxy S22+", price: "₦850,000", originalPrice: "₦950,000", image: "/placeholder.svg", badge: "Plus", rating: 4.4, storage: "256GB", color: "Pink Gold", series: "Galaxy S" },
  { id: 9, name: "Samsung Galaxy S22", price: "₦650,000", originalPrice: "₦750,000", image: "/placeholder.svg", badge: "Best Value", rating: 4.3, storage: "128GB", color: "Phantom White", series: "Galaxy S" },
  
  // Galaxy Fold Series
  { id: 10, name: "Samsung Galaxy Z Fold 6", price: "₦2,850,000", originalPrice: "₦3,100,000", image: "/placeholder.svg", badge: "Foldable", rating: 4.5, storage: "512GB", color: "Navy", series: "Galaxy Fold" },
  { id: 11, name: "Samsung Galaxy Z Fold 5", price: "₦2,450,000", originalPrice: "₦2,700,000", image: "/placeholder.svg", badge: "Foldable", rating: 4.4, storage: "256GB", color: "Phantom Black", series: "Galaxy Fold" },
  { id: 12, name: "Samsung Galaxy Z Fold 4", price: "₦1,950,000", originalPrice: "₦2,200,000", image: "/placeholder.svg", badge: "Foldable", rating: 4.3, storage: "256GB", color: "Graygreen", series: "Galaxy Fold" },
  { id: 13, name: "Samsung Galaxy Z Fold 3", price: "₦1,450,000", originalPrice: "₦1,650,000", image: "/placeholder.svg", badge: "S Pen Support", rating: 4.2, storage: "256GB", color: "Phantom Silver", series: "Galaxy Fold" },
  
  // Galaxy Flip Series
  { id: 14, name: "Samsung Galaxy Z Flip 6", price: "₦1,650,000", originalPrice: "₦1,800,000", image: "/placeholder.svg", badge: "Compact", rating: 4.4, storage: "256GB", color: "Yellow", series: "Galaxy Flip" },
  { id: 15, name: "Samsung Galaxy Z Flip 5", price: "₦1,350,000", originalPrice: "₦1,500,000", image: "/placeholder.svg", badge: "Compact", rating: 4.3, storage: "256GB", color: "Mint", series: "Galaxy Flip" },
  { id: 16, name: "Samsung Galaxy Z Flip 4", price: "₦1,050,000", originalPrice: "₦1,200,000", image: "/placeholder.svg", badge: "Compact", rating: 4.2, storage: "128GB", color: "Graphite", series: "Galaxy Flip" },
  { id: 17, name: "Samsung Galaxy Z Flip 3", price: "₦750,000", originalPrice: "₦900,000", image: "/placeholder.svg", badge: "Popular", rating: 4.1, storage: "128GB", color: "Cream", series: "Galaxy Flip" },
  
  // Galaxy Note Series
  { id: 18, name: "Samsung Galaxy Note 20 Ultra", price: "₦950,000", originalPrice: "₦1,100,000", image: "/placeholder.svg", badge: "S Pen", rating: 4.3, storage: "256GB", color: "Mystic Bronze", series: "Galaxy Note" },
  { id: 19, name: "Samsung Galaxy Note 20", price: "₦650,000", originalPrice: "₦750,000", image: "/placeholder.svg", badge: "S Pen", rating: 4.2, storage: "128GB", color: "Mystic Gray", series: "Galaxy Note" },
  
  // Galaxy A Series
  { id: 20, name: "Samsung Galaxy A55", price: "₦450,000", originalPrice: "₦520,000", image: "/placeholder.svg", badge: "Mid-range", rating: 4.2, storage: "128GB", color: "Iceblue", series: "Galaxy A" },
  { id: 21, name: "Samsung Galaxy A35", price: "₦350,000", originalPrice: "₦400,000", image: "/placeholder.svg", badge: "Popular", rating: 4.1, storage: "128GB", color: "Lilac", series: "Galaxy A" },
  { id: 22, name: "Samsung Galaxy A25", price: "₦250,000", originalPrice: "₦300,000", image: "/placeholder.svg", badge: "Budget", rating: 4.0, storage: "128GB", color: "Blue Black", series: "Galaxy A" }
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
          <div>Series: {product.series}</div>
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

const Samsung = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allSamsungDevices);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts(allSamsungDevices);
    } else {
      const filtered = allSamsungDevices.filter(product =>
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
              <h1 className="text-3xl font-bold">Samsung Galaxy Collection</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search Samsung devices by model, series, or color..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing {filteredProducts.length} of {allSamsungDevices.length} Samsung devices
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
                No Samsung devices found matching your search.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Samsung;