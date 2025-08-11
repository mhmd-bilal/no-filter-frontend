import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/search-bar";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <motion.nav 
      className="fixed top-0 w-full z-50 nav-sticky border-b border-pink-primary/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-4 cursor-pointer">
              <h1 className="text-2xl font-handwritten font-bold text-pink-accent">No Filter</h1>
              <div className="w-4 h-4 doodle-star animate-tilt"></div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-pink-accent transition-colors">Home</a>
            <a href="#truth-tea" className="hover:text-pink-accent transition-colors">The Truth Tea</a>
            <a href="#skin-deep" className="hover:text-pink-accent transition-colors">Skin Deep</a>
            <a href="#glow-goals" className="hover:text-pink-accent transition-colors">Glow Goals</a>
            
            <SearchBar />
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user?.profileImageUrl && (
                  <img 
                    src={user.profileImageUrl} 
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="hidden sm:inline text-pink-accent font-medium">
                  {user?.firstName || 'Beauty Lover'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = '/api/logout'}
                  className="text-pink-accent hover:text-pink-accent/80 hover:bg-pink-primary/20 rounded-full"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => window.location.href = '/api/login'}
                  className="px-4 py-2 text-pink-accent hover:bg-pink-primary/20 rounded-lg transition-colors"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => window.location.href = '/api/login'}
                  className="px-4 py-2 bg-pink-accent text-white rounded-lg hover:bg-pink-accent/90 transition-colors"
                >
                  Sign Up
                </Button>
              </>
            )}
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden py-4 border-t border-pink-primary/20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              <a href="#home" className="hover:text-pink-accent transition-colors">Home</a>
              <a href="#truth-tea" className="hover:text-pink-accent transition-colors">The Truth Tea</a>
              <a href="#skin-deep" className="hover:text-pink-accent transition-colors">Skin Deep</a>
              <a href="#glow-goals" className="hover:text-pink-accent transition-colors">Glow Goals</a>
              <div className="pt-2">
                <SearchBar />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
