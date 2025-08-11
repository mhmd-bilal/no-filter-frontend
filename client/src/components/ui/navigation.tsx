import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/search-bar";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };

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
          <Link to="/">
            <div className="flex items-center space-x-4 cursor-pointer">
              <h1 className="text-2xl font-handwritten font-bold text-pink-accent">No Filter</h1>
              <div className="w-4 h-4 doodle-star animate-tilt"></div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-pink-accent transition-colors">Home</Link>
            <Link to="/truth-tea" className="hover:text-pink-accent transition-colors">The Truth Tea</Link>
            <Link to="/skin-deep" className="hover:text-pink-accent transition-colors">Skin Deep</Link>
            <Link to="/glow-goals" className="hover:text-pink-accent transition-colors">Glow Goals</Link>
            
            <SearchBar />
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user?.profileImageUrl ? (
                  <img 
                    src={user.profileImageUrl} 
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-pink-accent"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
                    <span className="text-pink-accent font-medium">
                      {user?.username?.[0] || 'U'}
                    </span>
                  </div>
                )}
                <span className="hidden sm:inline text-pink-accent font-medium">
                  {user?.username || 'Beauty Lover'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-pink-accent hover:text-pink-accent/80 hover:bg-pink-primary/20 rounded-full"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/sign-in">
                  <Button 
                    variant="ghost"
                    className="px-4 py-2 text-pink-accent hover:bg-pink-primary/20 rounded-lg transition-colors"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button 
                    className="px-4 py-2 bg-pink-accent text-white rounded-lg hover:bg-pink-accent/90 transition-colors"
                  >
                    Sign Up
                  </Button>
                </Link>
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
              <Link to="/" className="hover:text-pink-accent transition-colors">Home</Link>
              <Link to="/truth-tea" className="hover:text-pink-accent transition-colors">The Truth Tea</Link>
              <Link to="/skin-deep" className="hover:text-pink-accent transition-colors">Skin Deep</Link>
              <Link to="/glow-goals" className="hover:text-pink-accent transition-colors">Glow Goals</Link>
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
