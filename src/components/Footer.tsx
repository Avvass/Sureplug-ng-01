import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, MessageCircle, Clock, Shield, Truck, CreditCard } from "lucide-react";

const Footer = () => {
  const whatsappLink = "https://wa.me/2348122085587";
  
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SP</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-primary">Sure Plug NG</h3>
                <p className="text-xs text-muted-foreground">Premium Tech Store</p>
              </div>
            </div>
            
            <p className="text-muted-foreground">
              Your trusted partner for premium gadgets, smartphones, and accessories in Abuja. 
              We bring you authentic products with competitive prices and excellent service.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="w-4 h-4 text-brand-success" />
                <span>Authentic Products</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="w-4 h-4 text-brand-success" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CreditCard className="w-4 h-4 text-brand-success" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-brand-success" />
                <span>Quick Support</span>
              </div>
            </div>
          </div>

          {/* Store Locations */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Store Locations</h4>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h5 className="font-medium text-brand-primary">Banex Plaza</h5>
                <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 text-brand-primary" />
                  <div>
                    <p>Banex Plaza, Wuse 2</p>
                    <p>Abuja, FCT, Nigeria</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-brand-primary">Heart Plaza</h5>
                <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 text-brand-primary" />
                  <div>
                    <p>Heart Plaza</p>
                    <p>Abuja-Keffi Expressway</p>
                    <p>Abuja, FCT, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium text-brand-primary">Store Hours</h5>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>11:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-primary" />
                <div>
                  <p className="font-medium">+234 812 208 5587</p>
                  <p className="text-sm text-muted-foreground">Call or WhatsApp</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-primary" />
                <div>
                  <p className="font-medium">info@sureplugng.com</p>
                  <p className="text-sm text-muted-foreground">Email Support</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </Button>
              
              <Button variant="outline" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            
            <div className="grid grid-cols-1 gap-3">
              <a href="#home" className="text-muted-foreground hover:text-brand-primary transition-colors">
                Home
              </a>
              <a href="#phones" className="text-muted-foreground hover:text-brand-primary transition-colors">
                Smartphones
              </a>
              <a href="#laptops" className="text-muted-foreground hover:text-brand-primary transition-colors">
                MacBooks
              </a>
              <a href="#airpods" className="text-muted-foreground hover:text-brand-primary transition-colors">
                AirPods
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-brand-primary transition-colors">
                Contact
              </a>
            </div>

            <div className="space-y-3">
              <h5 className="font-medium text-brand-primary">Delivery Partner</h5>
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-brand-secondary" />
                <span className="font-medium">Bolt Delivery</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Fast and reliable delivery across Abuja
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © 2024 Sure Plug NG. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Authorized retailer of Apple, Samsung, and other premium brands
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-brand-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-brand-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-brand-primary transition-colors">
                Return Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;