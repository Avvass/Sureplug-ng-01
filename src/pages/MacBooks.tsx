import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Star, Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const allMacBooks = [
  // MacBook Pro M3/M4 Series (2024-2023)
  { id: 1, name: "MacBook Pro 16\" M3 Max", price: "₦4,200,000", originalPrice: "₦4,500,000", image: "/placeholder.svg", badge: "M3 Max", rating: 4.9, specs: "36GB RAM, 1TB SSD", color: "Space Black", year: "2023", series: "Pro" },
  { id: 2, name: "MacBook Pro 14\" M3 Pro", price: "₦3,400,000", originalPrice: "₦3,700,000", image: "/placeholder.svg", badge: "M3 Pro", rating: 4.8, specs: "18GB RAM, 512GB SSD", color: "Silver", year: "2023", series: "Pro" },
  { id: 3, name: "MacBook Pro 14\" M3", price: "₦2,800,000", originalPrice: "₦3,100,000", image: "/placeholder.svg", badge: "M3", rating: 4.8, specs: "16GB RAM, 512GB SSD", color: "Space Gray", year: "2023", series: "Pro" },
  
  // MacBook Air M2/M3 Series (2024-2022)
  { id: 4, name: "MacBook Air 15\" M3", price: "₦2,400,000", originalPrice: "₦2,600,000", image: "/placeholder.svg", badge: "M3", rating: 4.8, specs: "16GB RAM, 512GB SSD", color: "Midnight", year: "2024", series: "Air" },
  { id: 5, name: "MacBook Air 13\" M3", price: "₦1,950,000", originalPrice: "₦2,200,000", image: "/placeholder.svg", badge: "M3", rating: 4.7, specs: "16GB RAM, 256GB SSD", color: "Starlight", year: "2024", series: "Air" },
  { id: 6, name: "MacBook Air 15\" M2", price: "₦2,100,000", originalPrice: "₦2,300,000", image: "/placeholder.svg", badge: "Popular", rating: 4.8, specs: "16GB RAM, 512GB SSD", color: "Midnight", year: "2023", series: "Air" },
  { id: 7, name: "MacBook Air 13\" M2", price: "₦1,650,000", originalPrice: "₦1,850,000", image: "/placeholder.svg", badge: "Best Value", rating: 4.7, specs: "16GB RAM, 256GB SSD", color: "Silver", year: "2022", series: "Air" },
  
  // MacBook Pro M2 Series (2022-2023)
  { id: 8, name: "MacBook Pro 16\" M2 Max", price: "₦3,800,000", originalPrice: "₦4,100,000", image: "/placeholder.svg", badge: "M2 Max", rating: 4.7, specs: "32GB RAM, 1TB SSD", color: "Space Gray", year: "2023", series: "Pro" },
  { id: 9, name: "MacBook Pro 14\" M2 Max", price: "₦3,200,000", originalPrice: "₦3,500,000", image: "/placeholder.svg", badge: "M2 Max", rating: 4.7, specs: "32GB RAM, 512GB SSD", color: "Silver", year: "2023", series: "Pro" },
  { id: 10, name: "MacBook Pro 13\" M2", price: "₦1,850,000", originalPrice: "₦2,100,000", image: "/placeholder.svg", badge: "M2", rating: 4.6, specs: "16GB RAM, 256GB SSD", color: "Space Gray", year: "2022", series: "Pro" },
  
  // MacBook Pro M1 Series (2021-2022)
  { id: 11, name: "MacBook Pro 16\" M1 Max", price: "₦3,200,000", originalPrice: "₦3,500,000", image: "/placeholder.svg", badge: "M1 Max", rating: 4.6, specs: "32GB RAM, 1TB SSD", color: "Space Gray", year: "2021", series: "Pro" },
  { id: 12, name: "MacBook Pro 14\" M1 Pro", price: "₦2,650,000", originalPrice: "₦2,900,000", image: "/placeholder.svg", badge: "M1 Pro", rating: 4.6, specs: "16GB RAM, 512GB SSD", color: "Silver", year: "2021", series: "Pro" },
  { id: 13, name: "MacBook Pro 13\" M1", price: "₦1,450,000", originalPrice: "₦1,650,000", image: "/placeholder.svg", badge: "M1", rating: 4.5, specs: "16GB RAM, 256GB SSD", color: "Space Gray", year: "2020", series: "Pro" },
  
  // MacBook Air M1 Series (2020-2021)
  { id: 14, name: "MacBook Air 13\" M1", price: "₦1,250,000", originalPrice: "₦1,400,000", image: "/placeholder.svg", badge: "M1", rating: 4.5, specs: "16GB RAM, 256GB SSD", color: "Gold", year: "2020", series: "Air" },
  
  // Intel MacBooks (2019-2020)
  { id: 15, name: "MacBook Pro 16\" Intel i9", price: "₦2,100,000", originalPrice: "₦2,400,000", image: "/placeholder.svg", badge: "Intel", rating: 4.2, specs: "32GB RAM, 1TB SSD", color: "Space Gray", year: "2019", series: "Pro" },
  { id: 16, name: "MacBook Pro 13\" Intel i7", price: "₦1,650,000", originalPrice: "₦1,850,000", image: "/placeholder.svg", badge: "Intel", rating: 4.1, specs: "16GB RAM, 512GB SSD", color: "Silver", year: "2020", series: "Pro" },
  { id: 17, name: "MacBook Air 13\" Intel i5", price: "₦950,000", originalPrice: "₦1,150,000", image: "/placeholder.svg", badge: "Budget", rating: 4.0, specs: "8GB RAM, 256GB SSD", color: "Gold", year: "2020", series: "Air" },
  
  // Older Models (2017-2018)
  { id: 18, name: "MacBook Pro 15\" Intel i7 (2018)", price: "₦1,450,000", originalPrice: "₦1,650,000", image: "/placeholder.svg", badge: "Vintage", rating: 3.9, specs: "16GB RAM, 512GB SSD", color: "Space Gray", year: "2018", series: "Pro" },
  { id: 19, name: "MacBook Pro 13\" Intel i5 (2017)", price: "₦850,000", originalPrice: "₦1,050,000", image: "/placeholder.svg", badge: "Classic", rating: 3.8, specs: "8GB RAM, 256GB SSD", color: "Silver", year: "2017", series: "Pro" },
  { id: 20, name: "MacBook Air 13\" Intel i5 (2017)", price: "₦650,000", originalPrice: "₦850,000", image: "/placeholder.svg", badge: "Entry", rating: 3.7, specs: "8GB RAM, 128GB SSD", color: "Silver", year: "2017", series: "Air" },
  
  // Classic Models (2015-2016)
  { id: 21, name: "MacBook Pro 15\" Intel i7 (2016)", price: "₦950,000", originalPrice: "₦1,200,000", image: "/placeholder.svg", badge: "Refurbished", rating: 3.6, specs: "16GB RAM, 256GB SSD", color: "Space Gray", year: "2016", series: "Pro" },
  { id: 22, name: "MacBook Pro 13\" Intel i5 (2015)", price: "₦650,000", originalPrice: "₦850,000", image: "/placeholder.svg", badge: "Classic", rating: 3.5, specs: "8GB RAM, 128GB SSD", color: "Silver", year: "2015", series: "Pro" },
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
          <div>{product.specs}</div>
          <div>Color: {product.color}</div>
          <div>Year: {product.year} • {product.series}</div>
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

const MacBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allMacBooks);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts(allMacBooks);
    } else {
      const filtered = allMacBooks.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.series.toLowerCase().includes(query.toLowerCase()) ||
        product.year.toLowerCase().includes(query.toLowerCase()) ||
        product.color.toLowerCase().includes(query.toLowerCase()) ||
        product.specs.toLowerCase().includes(query.toLowerCase())
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
              <h1 className="text-3xl font-bold">MacBook Collection</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search MacBooks by model, year, specs, or color..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing {filteredProducts.length} of {allMacBooks.length} MacBooks
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
                No MacBooks found matching your search.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MacBooks;