import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react";
import airpodsImage from "@/assets/airpods-3.jpg";
import iphoneImage from "@/assets/iphone-16.jpg";
import samsungImage from "@/assets/samsung-s24-ultra.jpg";

const heroProducts = [
  {
    id: 1,
    name: "Apple AirPods 3rd Generation",
    price: "₦185,000",
    originalPrice: "₦210,000",
    image: airpodsImage,
    badge: "HOT DEAL",
    rating: 4.8,
    reviews: 234,
    features: ["Spatial Audio", "Lightning Case", "6hrs Battery"],
  },
  {
    id: 2,
    name: "iPhone 16",
    price: "₦1,450,000",
    originalPrice: "₦1,600,000",
    image: iphoneImage,
    badge: "NEW ARRIVAL",
    rating: 4.9,
    reviews: 187,
    features: ["A18 Chip", "48MP Camera", "Action Button"],
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    price: "₦1,680,000",
    originalPrice: "₦1,850,000",
    image: samsungImage,
    badge: "BESTSELLER",
    rating: 4.7,
    reviews: 312,
    features: ["S Pen", "200MP Camera", "Titanium Build"],
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
    setIsAutoPlaying(false);
  };

  const handleAddToCart = (productName: string) => {
    // This will trigger login/signup modal in the future
    alert(`Login required to add ${productName} to cart`);
  };

  return (
    <section id="home" className="relative min-h-[80vh] hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Trusted by 10,000+ Customers in Abuja
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Premium Tech
                <br />
                <span className="text-yellow-300">Gadgets & More</span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-lg">
                Discover the latest smartphones, MacBooks, and accessories at unbeatable prices. 
                Located in the heart of Abuja with trusted delivery.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-brand-primary hover:bg-white/90 font-semibold px-8 py-4 rounded-xl"
              >
                Shop Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl"
              >
                Our Locations
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-white/70">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-white/70">Store Locations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm text-white/70">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Carousel */}
          <div className="relative">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              {/* Hot Deal Stamp */}
              <div className="absolute -top-4 -right-4 z-20">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-4 py-2 rounded-full transform rotate-12 shadow-lg animate-pulse">
                  {heroProducts[currentSlide].badge}
                </div>
              </div>

              {/* Product Display */}
              <div className="text-center space-y-6">
                <div className="relative w-80 h-64 mx-auto">
                  <img
                    src={heroProducts[currentSlide].image}
                    alt={heroProducts[currentSlide].name}
                    className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    {heroProducts[currentSlide].name}
                  </h3>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(heroProducts[currentSlide].rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white/70 text-sm">
                      ({heroProducts[currentSlide].reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-3xl font-bold text-white">
                      {heroProducts[currentSlide].price}
                    </span>
                    <span className="text-lg text-white/60 line-through">
                      {heroProducts[currentSlide].originalPrice}
                    </span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2">
                    {heroProducts[currentSlide].features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-white/20 text-white text-xs px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleAddToCart(heroProducts[currentSlide].name)}
                    className="bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold px-8 py-3 rounded-xl w-full max-w-sm mx-auto flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </Button>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Slide Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {heroProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;