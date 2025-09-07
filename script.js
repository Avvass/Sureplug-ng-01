// Sure Plug NG - JavaScript Functionality

// Product Data
const heroProducts = [
    {
        id: 1,
        name: "Apple AirPods 3rd Generation",
        price: "₦185,000",
        originalPrice: "₦210,000",
        image: "src/assets/airpods-3.jpg",
        badge: "HOT DEAL",
        rating: 4.8,
        reviews: 234,
        features: ["Spatial Audio", "Lightning Case", "6hrs Battery"]
    },
    {
        id: 2,
        name: "iPhone 16",
        price: "₦1,450,000",
        originalPrice: "₦1,600,000",
        image: "src/assets/iphone-16.jpg",
        badge: "NEW ARRIVAL",
        rating: 4.9,
        reviews: 187,
        features: ["A18 Chip", "48MP Camera", "Action Button"]
    },
    {
        id: 3,
        name: "Samsung Galaxy S24 Ultra",
        price: "₦1,680,000",
        originalPrice: "₦1,850,000",
        image: "src/assets/samsung-s24-ultra.jpg",
        badge: "BESTSELLER",
        rating: 4.7,
        reviews: 312,
        features: ["S Pen", "200MP Camera", "Titanium Build"]
    }
];

const smartphones = [
    { id: 1, name: "iPhone 16 Pro Max", price: "₦1,850,000", originalPrice: "₦2,000,000", image: "/placeholder.svg", badge: "Pro", rating: 4.9, storage: "256GB", color: "Natural Titanium" },
    { id: 2, name: "iPhone 15 Pro", price: "₦1,450,000", originalPrice: "₦1,600,000", image: "/placeholder.svg", badge: "Popular", rating: 4.8, storage: "128GB", color: "Blue Titanium" },
    { id: 3, name: "Samsung Galaxy S24 Ultra", price: "₦1,680,000", originalPrice: "₦1,850,000", image: "/placeholder.svg", badge: "S Pen", rating: 4.7, storage: "512GB", color: "Titanium Gray" },
    { id: 4, name: "Google Pixel 8 Pro", price: "₦890,000", originalPrice: "₦950,000", image: "/placeholder.svg", badge: "AI Camera", rating: 4.6, storage: "256GB", color: "Obsidian" }
];

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

const macbooks = [
    { id: 1, name: "MacBook Pro 16\" M3 Max", price: "₦4,200,000", originalPrice: "₦4,500,000", image: "/placeholder.svg", badge: "M3 Max", rating: 4.9, specs: "36GB RAM, 1TB SSD", color: "Space Black" },
    { id: 2, name: "MacBook Air 15\" M2", price: "₦2,100,000", originalPrice: "₦2,300,000", image: "/placeholder.svg", badge: "Popular", rating: 4.8, specs: "16GB RAM, 512GB SSD", color: "Midnight" },
    { id: 3, name: "MacBook Pro 14\" M3 Pro", price: "₦3,400,000", originalPrice: "₦3,700,000", image: "/placeholder.svg", badge: "Pro", rating: 4.8, specs: "18GB RAM, 512GB SSD", color: "Silver" }
];

const allMacBooks = [
    // Latest MacBook Pro Series
    { id: 1, name: "MacBook Pro 16\" M3 Max (2024)", price: "₦4,200,000", originalPrice: "₦4,500,000", image: "/placeholder.svg", badge: "M3 Max", rating: 4.9, specs: "36GB RAM, 1TB SSD", color: "Space Black", year: "2024", type: "Pro" },
    { id: 2, name: "MacBook Pro 14\" M3 Max (2024)", price: "₦3,800,000", originalPrice: "₦4,100,000", image: "/placeholder.svg", badge: "M3 Max", rating: 4.9, specs: "36GB RAM, 1TB SSD", color: "Silver", year: "2024", type: "Pro" },
    { id: 3, name: "MacBook Pro 16\" M3 Pro (2023)", price: "₦3,600,000", originalPrice: "₦3,900,000", image: "/placeholder.svg", badge: "M3 Pro", rating: 4.8, specs: "18GB RAM, 512GB SSD", color: "Space Gray", year: "2023", type: "Pro" },
    { id: 4, name: "MacBook Pro 14\" M3 Pro (2023)", price: "₦3,200,000", originalPrice: "₦3,500,000", image: "/placeholder.svg", badge: "M3 Pro", rating: 4.8, specs: "18GB RAM, 512GB SSD", color: "Silver", year: "2023", type: "Pro" },
    { id: 5, name: "MacBook Pro 16\" M2 Max (2023)", price: "₦3,200,000", originalPrice: "₦3,500,000", image: "/placeholder.svg", badge: "M2 Max", rating: 4.7, specs: "32GB RAM, 1TB SSD", color: "Space Gray", year: "2023", type: "Pro" },
    { id: 6, name: "MacBook Pro 14\" M2 Max (2023)", price: "₦2,800,000", originalPrice: "₦3,100,000", image: "/placeholder.svg", badge: "M2 Max", rating: 4.7, specs: "32GB RAM, 512GB SSD", color: "Silver", year: "2023", type: "Pro" },
    
    // MacBook Air Series
    { id: 7, name: "MacBook Air 15\" M3 (2024)", price: "₦2,400,000", originalPrice: "₦2,700,000", image: "/placeholder.svg", badge: "M3 Chip", rating: 4.8, specs: "16GB RAM, 512GB SSD", color: "Midnight", year: "2024", type: "Air" },
    { id: 8, name: "MacBook Air 13\" M3 (2024)", price: "₦2,000,000", originalPrice: "₦2,300,000", image: "/placeholder.svg", badge: "M3 Chip", rating: 4.8, specs: "16GB RAM, 512GB SSD", color: "Space Gray", year: "2024", type: "Air" },
    { id: 9, name: "MacBook Air 15\" M2 (2023)", price: "₦2,100,000", originalPrice: "₦2,400,000", image: "/placeholder.svg", badge: "M2 Chip", rating: 4.7, specs: "16GB RAM, 512GB SSD", color: "Starlight", year: "2023", type: "Air" },
    { id: 10, name: "MacBook Air 13\" M2 (2022)", price: "₦1,800,000", originalPrice: "₦2,100,000", image: "/placeholder.svg", badge: "M2 Chip", rating: 4.7, specs: "8GB RAM, 256GB SSD", color: "Silver", year: "2022", type: "Air" },
    { id: 11, name: "MacBook Air 13\" M1 (2020)", price: "₦1,400,000", originalPrice: "₦1,700,000", image: "/placeholder.svg", badge: "M1 Chip", rating: 4.6, specs: "8GB RAM, 256GB SSD", color: "Space Gray", year: "2020", type: "Air" },
    
    // Older MacBook Pro Models
    { id: 12, name: "MacBook Pro 16\" M1 Max (2021)", price: "₦2,800,000", originalPrice: "₦3,100,000", image: "/placeholder.svg", badge: "M1 Max", rating: 4.6, specs: "32GB RAM, 512GB SSD", color: "Space Gray", year: "2021", type: "Pro" },
    { id: 13, name: "MacBook Pro 14\" M1 Pro (2021)", price: "₦2,200,000", originalPrice: "₦2,500,000", image: "/placeholder.svg", badge: "M1 Pro", rating: 4.6, specs: "16GB RAM, 512GB SSD", color: "Silver", year: "2021", type: "Pro" },
    { id: 14, name: "MacBook Pro 13\" M1 (2020)", price: "₦1,600,000", originalPrice: "₦1,900,000", image: "/placeholder.svg", badge: "M1 Chip", rating: 4.5, specs: "8GB RAM, 256GB SSD", color: "Space Gray", year: "2020", type: "Pro" },
    
    // Intel-based MacBooks (Legacy)
    { id: 15, name: "MacBook Pro 16\" Intel i9 (2019)", price: "₦1,800,000", originalPrice: "₦2,100,000", image: "/placeholder.svg", badge: "Intel i9", rating: 4.3, specs: "16GB RAM, 512GB SSD", color: "Space Gray", year: "2019", type: "Pro" },
    { id: 16, name: "MacBook Pro 15\" Intel i7 (2018)", price: "₦1,400,000", originalPrice: "₦1,700,000", image: "/placeholder.svg", badge: "Intel i7", rating: 4.2, specs: "16GB RAM, 256GB SSD", color: "Silver", year: "2018", type: "Pro" },
    { id: 17, name: "MacBook Air 13\" Intel i5 (2017)", price: "₦800,000", originalPrice: "₦1,100,000", image: "/placeholder.svg", badge: "Intel i5", rating: 4.0, specs: "8GB RAM, 128GB SSD", color: "Silver", year: "2017", type: "Air" },
    { id: 18, name: "MacBook Pro 13\" Intel i5 (2016)", price: "₦750,000", originalPrice: "₦1,000,000", image: "/placeholder.svg", badge: "Intel i5", rating: 3.9, specs: "8GB RAM, 256GB SSD", color: "Space Gray", year: "2016", type: "Pro" },
    { id: 19, name: "MacBook 12\" Intel m5 (2016)", price: "₦650,000", originalPrice: "₦900,000", image: "/placeholder.svg", badge: "Ultra-thin", rating: 3.8, specs: "8GB RAM, 256GB SSD", color: "Gold", year: "2016", type: "MacBook" },
    { id: 20, name: "MacBook Air 11\" Intel i5 (2015)", price: "₦450,000", originalPrice: "₦700,000", image: "/placeholder.svg", badge: "Compact", rating: 3.7, specs: "4GB RAM, 128GB SSD", color: "Silver", year: "2015", type: "Air" }
];

const airpods = [
    { id: 1, name: "AirPods Pro (2nd Gen)", price: "₦285,000", originalPrice: "₦320,000", image: "/placeholder.svg", badge: "Pro", rating: 4.8, feature: "Active Noise Cancellation", battery: "Up to 6hrs" },
    { id: 2, name: "AirPods 3rd Generation", price: "₦185,000", originalPrice: "₦210,000", image: "/placeholder.svg", badge: "Popular", rating: 4.7, feature: "Spatial Audio", battery: "Up to 6hrs" },
    { id: 3, name: "AirPods Max", price: "₦650,000", originalPrice: "₦720,000", image: "/placeholder.svg", badge: "Premium", rating: 4.6, feature: "Over-ear Design", battery: "Up to 20hrs" }
];

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

// Global State
let currentSlide = 0;
let isAutoPlaying = true;
let autoPlayInterval;
let mobileMenuOpen = false;

// Filtered product arrays for search
let filteredIPhones = [...allIPhones];
let filteredSamsung = [...allSamsungDevices];
let filteredMacBooks = [...allMacBooks];
let filteredAirPods = [...allAirPods];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeLucideIcons();
    setupEventListeners();
    startAutoPlay();
    populateProductGrids();
    showPage('home-page');
});

// Initialize Lucide icons
function initializeLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuOpen = !mobileMenuOpen;
            mobileNav.classList.toggle('active', mobileMenuOpen);
            
            // Update icon
            const icon = mobileMenuToggle.querySelector('i');
            icon.setAttribute('data-lucide', mobileMenuOpen ? 'x' : 'menu');
            lucide.createIcons();
        });
    }

    // Close mobile menu when clicking nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuOpen = false;
            mobileNav.classList.remove('active');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const icon = mobileMenuToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // Smooth scrolling for hash links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Modal close functionality
    const modal = document.getElementById('auth-modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// Carousel Functions
function startAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
    
    autoPlayInterval = setInterval(() => {
        if (isAutoPlaying) {
            nextSlide();
        }
    }, 5000);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroProducts.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + heroProducts.length) % heroProducts.length;
    isAutoPlaying = false;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    isAutoPlaying = false;
    updateCarousel();
}

function updateCarousel() {
    const product = heroProducts[currentSlide];
    
    // Update image
    const carouselImage = document.getElementById('carousel-image');
    if (carouselImage) {
        carouselImage.src = product.image;
        carouselImage.alt = product.name;
    }
    
    // Update title
    const carouselTitle = document.getElementById('carousel-title');
    if (carouselTitle) {
        carouselTitle.textContent = product.name;
    }
    
    // Update rating
    const carouselStars = document.getElementById('carousel-stars');
    if (carouselStars) {
        const starsHtml = Array.from({length: 5}, (_, i) => {
            const starClass = i < Math.floor(product.rating) ? 'star filled' : 'star';
            return `<i data-lucide="star" class="${starClass}"></i>`;
        }).join('');
        carouselStars.innerHTML = starsHtml;
    }
    
    // Update reviews
    const carouselReviews = document.getElementById('carousel-reviews');
    if (carouselReviews) {
        carouselReviews.textContent = `(${product.reviews} reviews)`;
    }
    
    // Update prices
    const carouselPrice = document.getElementById('carousel-price');
    if (carouselPrice) {
        carouselPrice.textContent = product.price;
    }
    
    const carouselOriginalPrice = document.getElementById('carousel-original-price');
    if (carouselOriginalPrice) {
        carouselOriginalPrice.textContent = product.originalPrice;
    }
    
    // Update features
    const carouselFeatures = document.getElementById('carousel-features');
    if (carouselFeatures) {
        const featuresHtml = product.features.map(feature => 
            `<span class="feature-tag">${feature}</span>`
        ).join('');
        carouselFeatures.innerHTML = featuresHtml;
    }
    
    // Update deal stamp
    const dealText = document.querySelector('.deal-text');
    if (dealText) {
        dealText.textContent = product.badge;
    }
    
    // Update indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
    
    // Reinitialize Lucide icons
    lucide.createIcons();
}

// Product Grid Functions
function populateProductGrids() {
    // Home page grids
    populateGrid('smartphones-grid', smartphones, 'phone');
    populateGrid('macbooks-grid', macbooks, 'laptop');
    populateGrid('airpods-grid', airpods, 'airpods');
    
    // Full page grids
    populateGrid('smartphones-full-grid', filteredIPhones, 'phone');
    populateGrid('samsung-full-grid', filteredSamsung, 'phone');
    populateGrid('macbooks-full-grid', filteredMacBooks, 'laptop');
    populateGrid('airpods-full-grid', filteredAirPods, 'airpods');
    
    updateResultsCounts();
}

function populateGrid(gridId, products, type) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    grid.innerHTML = products.map(product => createProductCard(product, type)).join('');
    lucide.createIcons();
}

function createProductCard(product, type) {
    const specs = getProductSpecs(product, type);
    
    return `
        <div class="product-card">
            <div class="card-header">
                <img src="${product.image}" alt="${product.name}" class="card-image">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            
            <div class="card-content">
                <h3>${product.name}</h3>
                
                <div class="product-rating">
                    <div class="stars">
                        ${Array.from({length: 5}, (_, i) => {
                            const starClass = i < Math.floor(product.rating) ? 'star filled' : 'star';
                            return `<i data-lucide="star" class="${starClass}"></i>`;
                        }).join('')}
                    </div>
                    <span>(${product.rating})</span>
                </div>

                <div class="product-specs">
                    ${specs}
                </div>

                <div class="product-price">
                    <span class="current-price">${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                </div>

                <button class="btn btn-cart" onclick="handleAddToCart('${product.name}')">
                    <i data-lucide="shopping-cart"></i>
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    `;
}

function getProductSpecs(product, type) {
    switch(type) {
        case 'phone':
            return `
                <div>Storage: ${product.storage}</div>
                <div>Color: ${product.color}</div>
                ${product.series ? `<div>Series: ${product.series}</div>` : ''}
            `;
        case 'laptop':
            return `
                <div>${product.specs}</div>
                <div>Color: ${product.color}</div>
                ${product.year ? `<div>Year: ${product.year}</div>` : ''}
            `;
        case 'airpods':
            return `
                <div>${product.feature}</div>
                <div>Battery: ${product.battery}</div>
                <div>Generation: ${product.gen}</div>
            `;
        default:
            return '';
    }
}

// Search Functions
function searchProducts(category) {
    const searchId = `${category}-search`;
    const searchInput = document.getElementById(searchId);
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase().trim();
    
    switch(category) {
        case 'smartphones':
            filteredIPhones = query === '' ? [...allIPhones] : allIPhones.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.series.toLowerCase().includes(query) ||
                product.color.toLowerCase().includes(query)
            );
            populateGrid('smartphones-full-grid', filteredIPhones, 'phone');
            updateNoResults('smartphones', filteredIPhones.length === 0);
            break;
            
        case 'samsung':
            filteredSamsung = query === '' ? [...allSamsungDevices] : allSamsungDevices.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.series.toLowerCase().includes(query) ||
                product.color.toLowerCase().includes(query)
            );
            populateGrid('samsung-full-grid', filteredSamsung, 'phone');
            updateNoResults('samsung', filteredSamsung.length === 0);
            break;
            
        case 'macbooks':
            filteredMacBooks = query === '' ? [...allMacBooks] : allMacBooks.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.specs.toLowerCase().includes(query) ||
                product.color.toLowerCase().includes(query) ||
                product.year.toLowerCase().includes(query)
            );
            populateGrid('macbooks-full-grid', filteredMacBooks, 'laptop');
            updateNoResults('macbooks', filteredMacBooks.length === 0);
            break;
            
        case 'airpods':
            filteredAirPods = query === '' ? [...allAirPods] : allAirPods.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.gen.toLowerCase().includes(query) ||
                product.feature.toLowerCase().includes(query) ||
                product.color.toLowerCase().includes(query)
            );
            populateGrid('airpods-full-grid', filteredAirPods, 'airpods');
            updateNoResults('airpods', filteredAirPods.length === 0);
            break;
    }
    
    updateResultsCounts();
}

function updateNoResults(category, show) {
    const noResults = document.getElementById(`${category}-no-results`);
    if (noResults) {
        noResults.style.display = show ? 'block' : 'none';
    }
}

function updateResultsCounts() {
    updateResultsCount('smartphones', filteredIPhones.length, allIPhones.length, 'iPhones');
    updateResultsCount('samsung', filteredSamsung.length, allSamsungDevices.length, 'Samsung devices');
    updateResultsCount('macbooks', filteredMacBooks.length, allMacBooks.length, 'MacBooks');
    updateResultsCount('airpods', filteredAirPods.length, allAirPods.length, 'AirPods models');
}

function updateResultsCount(category, filtered, total, itemName) {
    const countElement = document.getElementById(`${category}-count`);
    if (countElement) {
        countElement.textContent = `Showing ${filtered} of ${total} ${itemName}`;
    }
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Reset search if navigating to a product page
    if (pageId !== 'home-page') {
        const category = pageId.replace('-page', '');
        const searchInput = document.getElementById(`${category}-search`);
        if (searchInput) {
            searchInput.value = '';
            // Trigger search to reset results
            searchProducts(category);
        }
    }
}

// Modal Functions
function handleAddToCart(productName) {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function showLogin() {
    alert('Login functionality would be implemented here. This would redirect to a login page or show a login form.');
    closeModal();
}

function showSignup() {
    alert('Signup functionality would be implemented here. This would redirect to a signup page or show a signup form.');
    closeModal();
}

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
    }).format(price);
}

// Export functions for global access
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
window.handleAddToCart = handleAddToCart;
window.closeModal = closeModal;
window.showLogin = showLogin;
window.showSignup = showSignup;
window.showPage = showPage;
window.searchProducts = searchProducts;