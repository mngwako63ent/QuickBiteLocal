/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  ExternalLink, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Menu as MenuIcon, 
  X,
  ChevronRight,
  Filter,
  Flame,
  UtensilsCrossed,
  Heart,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Vendor {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  priceRange: string;
  distance: string;
  isOpen: boolean;
  isVerified: boolean;
  tags: string[];
  category: string;
  location: string;
  menuItems: string[];
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  isSpecial?: boolean;
}

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface FoodItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  vendor_name: string;
  views: number;
}

// --- Mock Data ---
const VENDORS: Vendor[] = [
  {
    id: '1',
    name: "Mama's Kota & Wings",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 124,
    priceRange: "R",
    distance: "1.2km away",
    isOpen: true,
    isVerified: true,
    tags: ["Responds Fast", "Student Favorite"],
    category: "Kota",
    location: "Soweto",
    menuItems: ["The Ultimate Kota", "6-Wing Combo", "Chips", "Polony"]
  },
  {
    id: '2',
    name: "The Burger Joint",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800",
    rating: 4.5,
    reviews: 89,
    priceRange: "RR",
    distance: "2.3km away",
    isOpen: true,
    isVerified: true,
    tags: ["Top Rated", "Late Night"],
    category: "Burgers",
    location: "Braamfontein",
    menuItems: ["Gourmet Beef Burger", "Cheese Burger", "Fries", "Milkshake"]
  },
  {
    id: '3',
    name: "Soweto Braai Master",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 256,
    priceRange: "RR",
    distance: "3.5km away",
    isOpen: false,
    isVerified: true,
    tags: ["Verified", "Family Choice"],
    category: "Braai",
    location: "Soweto",
    menuItems: ["Family Braai Platter", "Chuck", "Wors", "Pap", "Chakalaka"]
  },
  {
    id: '4',
    name: "Crispy Chicken Hub",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c8d08f58?auto=format&fit=crop&q=80&w=800",
    rating: 4.3,
    reviews: 56,
    priceRange: "R",
    distance: "0.8km away",
    isOpen: true,
    isVerified: false,
    tags: ["Budget Friendly"],
    category: "Chicken",
    location: "Sandton",
    menuItems: ["Crispy Chicken Bucket", "Chicken Wings", "Coleslaw"]
  }
];

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: "The Ultimate Kota",
    price: 45,
    description: "Quarter loaf with chips, polony, cheese, egg, and special sauce.",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=400",
    isSpecial: true
  },
  {
    id: 'm2',
    name: "6-Wing Combo",
    price: 65,
    description: "6 spicy wings served with a side of crispy fries.",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 'm3',
    name: "Family Braai Platter",
    price: 180,
    description: "Chuck, wors, wings, pap, and chakalaka for 4 people.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400",
    isSpecial: true
  }
];

// --- Components ---

const Navbar = ({ onLoginClick, user, onLogout, onLogoClick }: { onLoginClick: () => void; user: User | null; onLogout: () => void; onLogoClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); onLogoClick(); }} className="flex items-center gap-2 group">
          <div className="bg-brand-red p-1.5 rounded-lg group-hover:bg-red-600 transition-colors">
            <UtensilsCrossed className="text-white w-6 h-6" />
          </div>
          <span className={`text-2xl font-extrabold font-display tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            QuickBite<span className="text-brand-orange">Local</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Browse', 'Top Rated', 'Student Deals', 'Vendors', 'About'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              className={`text-sm font-semibold hover:text-brand-orange transition-colors ${isScrolled ? 'text-slate-600' : 'text-white/90'}`}
            >
              {item}
            </a>
          ))}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className={`text-sm font-bold ${isScrolled ? 'text-slate-900' : 'text-white'}`}>Hi, {user.name}</span>
                <button onClick={onLogout} className={`text-sm font-semibold ${isScrolled ? 'text-slate-900' : 'text-white'} opacity-70 hover:opacity-100`}>Logout</button>
              </div>
            ) : (
              <button onClick={onLoginClick} className={`text-sm font-semibold ${isScrolled ? 'text-slate-900' : 'text-white'}`}>Login</button>
            )}
            <button className="bg-brand-red hover:bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-red-500/30">
              List Your Business
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
          <MenuIcon className={isScrolled ? 'text-slate-900' : 'text-white'} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-10">
              <a href="#" onClick={(e) => { e.preventDefault(); onLogoClick(); setIsMobileMenuOpen(false); }} className="text-2xl font-extrabold font-display text-slate-900">
                QuickBite<span className="text-brand-orange">Local</span>
              </a>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-slate-900" />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {['Browse', 'Top Rated', 'Student Deals', 'Vendors', 'About'].map((item) => (
                <a key={item} href="#" className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">{item}</a>
              ))}
              {user ? (
                <div className="flex flex-col gap-4">
                  <span className="text-xl font-bold text-slate-800">Hi, {user.name}</span>
                  <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="text-left text-xl font-bold text-slate-400">Logout</button>
                </div>
              ) : (
                <button onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }} className="text-left text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">Login</button>
              )}
              <button className="bg-brand-red text-white w-full py-4 rounded-2xl text-lg font-bold mt-4 shadow-xl">
                List Your Business
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ 
  searchQuery, 
  setSearchQuery, 
  locationQuery, 
  setLocationQuery, 
  openNowOnly, 
  setOpenNowOnly 
}: { 
  searchQuery: string; 
  setSearchQuery: (q: string) => void; 
  locationQuery: string; 
  setLocationQuery: (q: string) => void;
  openNowOnly: boolean;
  setOpenNowOnly: (o: boolean) => void;
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('qb_recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  const addToRecent = (query: string) => {
    if (!query) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 3);
    setRecentSearches(updated);
    localStorage.setItem('qb_recent_searches', JSON.stringify(updated));
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationQuery("My Current Location");
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get your location. Please enter it manually.");
        }
      );
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        addToRecent(transcript);
      };
      recognition.start();
    } else {
      alert("Voice search is not supported in your browser.");
    }
  };

  const popularTags = ["Kota", "Wings", "Burgers", "Braai", "Pap & Wors"];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=80&w=1920" 
          alt="Fast Food Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-brand-yellow text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
              Local Food Discovery
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 font-display">
              Find The Best <span className="text-brand-orange">Local Fast Food</span> Near You.
            </h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Browse real menus from trusted local vendors in your area. From street-side Kotas to gourmet local burgers.
            </p>
          </motion.div>

          {/* Search & Filters */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 mb-6 relative z-20"
            >
              <div className="flex items-center gap-3 px-4 w-full md:w-auto flex-1 relative group">
                <MapPin className="text-brand-red w-5 h-5 flex-shrink-0" />
                <input 
                  type="text" 
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="Enter your location (e.g. Soweto)..." 
                  className="w-full py-3 outline-none text-slate-700 font-medium"
                />
                {locationQuery ? (
                  <button onClick={() => setLocationQuery('')} className="p-1 hover:bg-slate-100 rounded-full">
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                ) : (
                  <button 
                    onClick={handleUseMyLocation}
                    className="p-1.5 hover:bg-slate-100 rounded-full text-brand-red transition-colors"
                    title="Use my current location"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
              <div className="flex items-center gap-3 px-4 w-full md:w-auto flex-1 relative">
                <Search className="text-slate-400 w-5 h-5 flex-shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addToRecent(searchQuery)}
                  placeholder="Gourmet Beef Burger" 
                  className="w-full py-3 outline-none text-slate-700 font-medium"
                />
                <div className="flex items-center gap-1">
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="p-1 hover:bg-slate-100 rounded-full">
                      <X className="w-4 h-4 text-slate-400" />
                    </button>
                  )}
                  <button 
                    onClick={handleVoiceSearch}
                    className="p-1.5 hover:bg-slate-100 rounded-full text-brand-red transition-colors"
                    title="Voice search"
                  >
                    <Smartphone className="w-4 h-4 rotate-0" /> {/* Using Smartphone as a mic-like icon placeholder */}
                  </button>
                </div>
              </div>
              <button 
                onClick={() => addToRecent(searchQuery)}
                className="bg-brand-red hover:bg-red-600 text-white w-full md:w-auto px-8 py-4 rounded-xl md:rounded-full font-bold transition-all flex items-center justify-center gap-2"
              >
                Explore Food
              </button>
            </motion.div>

            {/* Recent Searches Dropdown */}
            <AnimatePresence>
              {isSearchFocused && recentSearches.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-10 overflow-hidden"
                >
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">Recent Searches</p>
                  <div className="space-y-1">
                    {recentSearches.map((s, i) => (
                      <button 
                        key={i}
                        onClick={() => { setSearchQuery(s); setIsSearchFocused(false); }}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 flex items-center gap-3 text-slate-700 font-semibold transition-colors"
                      >
                        <Clock className="w-4 h-4 text-slate-300" />
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Popular:</span>
            {popularTags.map((tag) => (
              <button 
                key={tag}
                onClick={() => { setSearchQuery(tag); addToRecent(tag); }}
                className="text-white/80 hover:text-white text-sm font-semibold transition-colors hover:underline"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Quick Filters */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <button 
              onClick={() => setOpenNowOnly(!openNowOnly)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all border-2 ${openNowOnly ? 'bg-brand-red border-brand-red text-white shadow-lg shadow-red-500/30' : 'glass-morphism border-white/20 text-white hover:bg-white hover:text-slate-900'}`}
            >
              <Clock className="w-4 h-4" />
              Open Now
            </button>
            {[
              { icon: <UtensilsCrossed className="w-4 h-4" />, label: "Under R50" },
              { icon: <TrendingUp className="w-4 h-4" />, label: "Late Night" },
              { icon: <Filter className="w-4 h-4" />, label: "More Filters" }
            ].map((filter, i) => (
              <button key={i} className="glass-morphism border-2 border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-white hover:text-slate-900 transition-all">
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function VendorCard({ vendor }: { vendor: Vendor; key?: React.Key }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white rounded-3xl overflow-hidden food-card-shadow group cursor-pointer border border-slate-100"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={vendor.image} 
          alt={vendor.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {vendor.isOpen ? (
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Open Now</span>
          ) : (
            <span className="bg-slate-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Closed</span>
          )}
          {vendor.isVerified && (
            <span className="bg-brand-orange text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Verified
            </span>
          )}
        </div>
        <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-brand-red transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-red transition-colors">{vendor.name}</h3>
          <div className="flex items-center gap-1 bg-brand-yellow/20 text-brand-orange px-2 py-0.5 rounded-lg">
            <Star className="w-4 h-4 fill-brand-orange" />
            <span className="text-sm font-bold">{vendor.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
          <span className="font-bold text-slate-900">{vendor.priceRange}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {vendor.distance}</span>
          <span>{vendor.reviews} reviews</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {vendor.tags.map((tag, i) => (
            <span key={i} className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedVendors = ({ vendors, onClearFilters }: { vendors: Vendor[]; onClearFilters: () => void }) => {
  return (
    <section id="browse" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2 block">Discovery</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-display">
              {vendors.length === VENDORS.length ? 'Trending Near You' : `Found ${vendors.length} Vendors`}
            </h2>
          </div>
          {vendors.length !== VENDORS.length && (
            <button 
              onClick={onClearFilters}
              className="text-brand-red font-bold flex items-center gap-2 hover:underline"
            >
              Clear all filters
            </button>
          )}
          <button className="text-brand-red font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View all vendors <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {vendors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-slate-100">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No vendors found</h3>
            <p className="text-slate-500 mb-8">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={onClearFilters}
              className="bg-brand-red text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-red-500/20"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const VendorProfileMockup = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2 block">Vendor Spotlight</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 font-display">Experience Local Flavors</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Every vendor on QuickBite Local is a real person with a real passion for food. We bring their kitchen to your screen.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <MessageCircle className="text-emerald-500" />, title: "Direct WhatsApp Ordering", desc: "No middleman. Talk directly to the vendor." },
                { icon: <ShieldCheck className="text-brand-red" />, title: "Verified Hygiene Standards", desc: "We check for health certificates and hygiene badges." },
                { icon: <TrendingUp className="text-brand-orange" />, title: "Real-time Menu Updates", desc: "Always know what's cooking today." }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="bg-slate-50 p-3 rounded-2xl h-fit">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{feature.title}</h4>
                    <p className="text-slate-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mockup UI */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-slate-900 rounded-[3rem] p-4 shadow-2xl border-[8px] border-slate-800 max-w-[400px] mx-auto">
              <div className="bg-white rounded-[2.5rem] h-[700px] overflow-y-auto no-scrollbar">
                {/* Mobile App Header */}
                <div className="relative h-48">
                  <img src={VENDORS[0].image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-white text-2xl font-bold">{VENDORS[0].name}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-xs">
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-brand-yellow text-brand-yellow" /> 4.8</span>
                      <span>•</span>
                      <span>1.2km away</span>
                    </div>
                  </div>
                </div>

                {/* Mobile App Content */}
                <div className="p-6">
                  <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
                    <span className="bg-brand-red text-white px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap">Today's Special</span>
                    <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap">Combos</span>
                    <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap">Drinks</span>
                  </div>

                  <h4 className="font-bold text-slate-900 mb-4">Popular Items</h4>
                  <div className="space-y-4">
                    {MENU_ITEMS.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors">
                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h5 className="font-bold text-sm text-slate-900">{item.name}</h5>
                            <span className="text-brand-red font-bold text-sm">R{item.price}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <button className="bg-emerald-500 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </button>
                    <button className="bg-brand-red text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" /> Call Vendor
                    </button>
                  </div>
                  <button className="w-full mt-3 border-2 border-slate-100 text-slate-600 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" /> View on Maps
                  </button>
                </div>
              </div>
            </div>
            
            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -right-4 top-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
            >
              <div className="bg-brand-yellow p-2 rounded-full">
                <ShieldCheck className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Health Rating</p>
                <p className="text-sm font-bold text-slate-900">Hygiene Certified</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -left-8 bottom-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
            >
              <div className="bg-brand-red p-2 rounded-full">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Community</p>
                <p className="text-sm font-bold text-slate-900">500+ Local Fans</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TrustSection = () => {
  return (
    <section className="py-24 bg-brand-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-16 font-display">Real Vendors. Real Food.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Today", value: "150+", icon: <Clock className="w-8 h-8" /> },
            { label: "Verified Vendors", value: "1.2k", icon: <CheckCircle2 className="w-8 h-8" /> },
            { label: "Daily Visitors", value: "5k+", icon: <Users className="w-8 h-8" /> },
            { label: "Food Categories", value: "24", icon: <UtensilsCrossed className="w-8 h-8" /> }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-white">
              <div className="bg-white/10 p-4 rounded-2xl mb-4">
                {stat.icon}
              </div>
              <span className="text-4xl font-black mb-1">{stat.value}</span>
              <span className="text-white/70 font-bold uppercase text-xs tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LocalFavorites = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2 block">Community Picks</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-display">Local Favorites</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Student Budget Picks", desc: "The best meals under R50 for the hungry scholar.", img: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=600" },
            { title: "Late Night Cravings", desc: "Open past midnight. Because hunger doesn't sleep.", img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=600" },
            { title: "Hidden Gems", desc: "Small vendors with massive flavor you haven't tried yet.", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600" }
          ].map((item, i) => (
            <div key={i} className="relative group rounded-3xl overflow-hidden h-80">
              <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm mb-4">{item.desc}</p>
                <button className="text-brand-yellow font-bold flex items-center gap-2 text-sm">
                  Explore Now <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TopRatedFood = ({ items, onFoodClick }: { items: FoodItem[]; onFoodClick: (id: number) => void }) => {
  return (
    <section id="top-rated" className="py-24 bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-red/10 blur-3xl rounded-full translate-x-1/2"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm mb-2 block">Most Viewed</span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white font-display">Top Rated Bites</h2>
          </div>
          <p className="text-white/60 max-w-md text-right hidden md:block">
            These are the most popular food items being discovered by our community right now.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -10 }}
              onClick={() => onFoodClick(item.id)}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 bg-brand-yellow text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
                  <Flame className="w-3 h-3" /> {item.views} Views
                </div>
              </div>
              <div className="p-6">
                <p className="text-brand-orange text-[10px] font-bold uppercase tracking-widest mb-1">{item.vendor_name}</p>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-yellow transition-colors">{item.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black text-white">R{item.price}</span>
                  <button className="bg-white/10 hover:bg-brand-red text-white p-2 rounded-xl transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 font-display">Hungry? Discover Your Next Bite.</h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Join thousands of locals discovering the best street food and small takeaway businesses in their neighborhood.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-brand-red hover:bg-red-600 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all shadow-xl hover:shadow-red-500/30">
              Browse Vendors
            </button>
            <button className="bg-white hover:bg-slate-100 text-slate-900 px-10 py-5 rounded-2xl text-lg font-bold transition-all">
              List Your Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-50 pt-24 pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-brand-red p-1.5 rounded-lg">
                <UtensilsCrossed className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold font-display tracking-tight text-slate-900">
                QuickBite<span className="text-brand-orange">Local</span>
              </span>
            </div>
            <p className="text-slate-500 max-w-sm mb-8">
              Connecting local food lovers with the best street food and small takeaway vendors in their community. Not a delivery app, but a discovery platform.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'Facebook', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-brand-red hover:border-brand-red transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">For Hungry People</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-brand-red transition-colors">Browse Vendors</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Top Rated Food</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Student Deals</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">How it Works</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">For Vendors</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-brand-red transition-colors">List Your Business</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Vendor Dashboard</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Pricing Plans</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Success Stories</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
          <p>© 2024 QuickBite Local. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
            <a href="#" className="hover:text-slate-600">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LoginModal = ({ isOpen, onClose, onLoginSuccess }: { isOpen: boolean; onClose: () => void; onLoginSuccess: (user: User) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/login' : '/api/signup';
    const body = isLogin ? { email, password } : { email, password, name };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.success) {
        onLoginSuccess(data.user);
        onClose();
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 font-display">
                  {isLogin ? 'Welcome Back' : 'Join QuickBite'}
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm font-bold mb-6 flex items-center gap-2">
                  <X className="w-4 h-4" /> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-brand-red outline-none px-6 py-4 rounded-2xl font-semibold transition-all"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-brand-red outline-none px-6 py-4 rounded-2xl font-semibold transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-brand-red outline-none px-6 py-4 rounded-2xl font-semibold transition-all"
                  />
                </div>

                <button 
                  disabled={loading}
                  className="w-full bg-brand-red hover:bg-red-600 text-white py-5 rounded-2xl text-lg font-bold transition-all shadow-xl hover:shadow-red-500/30 mt-4 flex items-center justify-center gap-2"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-slate-500 font-medium">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-brand-red font-bold ml-2 hover:underline"
                  >
                    {isLogin ? 'Sign Up' : 'Login'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [topRatedItems, setTopRatedItems] = useState<FoodItem[]>([]);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [openNowOnly, setOpenNowOnly] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('qb_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Load search preferences
    const savedSearch = localStorage.getItem('qb_search_prefs');
    if (savedSearch) {
      const prefs = JSON.parse(savedSearch);
      setSearchQuery(prefs.searchQuery || '');
      setLocationQuery(prefs.locationQuery || '');
      setOpenNowOnly(prefs.openNowOnly || false);
    }
    
    fetchTopRated();
  }, []);

  // Save search preferences when they change
  useEffect(() => {
    localStorage.setItem('qb_search_prefs', JSON.stringify({
      searchQuery,
      locationQuery,
      openNowOnly
    }));
  }, [searchQuery, locationQuery, openNowOnly]);

  const fetchTopRated = async () => {
    try {
      const response = await fetch('/api/food/top-rated');
      const data = await response.json();
      if (data.success) {
        setTopRatedItems(data.items);
      }
    } catch (err) {
      console.error('Failed to fetch top rated items');
    }
  };

  const handleFoodClick = async (id: number) => {
    try {
      await fetch(`/api/food/${id}/view`, { method: 'POST' });
      fetchTopRated(); // Refresh to show updated views
    } catch (err) {
      console.error('Failed to increment view');
    }
  };

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem('qb_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('qb_user');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setOpenNowOnly(false);
  };

  // Filtering Logic
  const filteredVendors = VENDORS.filter(vendor => {
    const matchesSearch = !searchQuery || 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.menuItems.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = !locationQuery || 
      vendor.location.toLowerCase().includes(locationQuery.toLowerCase());
    
    const matchesOpen = !openNowOnly || vendor.isOpen;

    return matchesSearch && matchesLocation && matchesOpen;
  });

  return (
    <div className="min-h-screen bg-white selection:bg-brand-red/20 selection:text-brand-red">
      <Navbar 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        user={user}
        onLogout={handleLogout}
        onLogoClick={clearFilters}
      />
      <main>
        <Hero 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
          openNowOnly={openNowOnly}
          setOpenNowOnly={setOpenNowOnly}
        />
        <FeaturedVendors vendors={filteredVendors} onClearFilters={clearFilters} />
        <TopRatedFood items={topRatedItems} onFoodClick={handleFoodClick} />
        <VendorProfileMockup />
        <TrustSection />
        <LocalFavorites />
        <FinalCTA />
      </main>
      <Footer />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
