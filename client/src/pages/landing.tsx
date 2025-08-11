import { motion } from "framer-motion";
import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/ui/hero-section";
import CategoryGrid from "@/components/ui/category-grid";
import PostsGrid from "@/components/ui/posts-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DoodleElements from "@/components/ui/doodle-elements";

export default function Landing() {
  return (
    <div className="min-h-screen bg-pink-light grid-overlay font-sans text-text-dark">
      <Navigation />
      <HeroSection />
      <CategoryGrid />
      <PostsGrid showAll={false} />
      
      {/* Newsletter Signup */}
      <motion.section 
        className="py-16 bg-white/70 backdrop-blur-sm"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <DoodleElements />
            
            <h2 className="text-4xl font-handwritten font-bold text-pink-accent mb-4">
              Join the Beauty Squad! 💕
            </h2>
            <p className="text-lg text-text-dark/80 mb-8 max-w-2xl mx-auto">
              Get weekly beauty tips, honest reviews, and exclusive content straight to your inbox. No spam, just glow! ✨
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-1 rounded-full border-pink-primary/30 bg-white focus:ring-pink-accent focus:border-transparent"
              />
              <Button 
                className="px-8 py-3 bg-pink-accent text-white rounded-full hover:bg-pink-accent/90 transition-colors font-medium whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm text-text-dark/60 mt-4">
              Join 10,000+ beauty lovers who trust our recommendations 🌸
            </p>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-text-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-handwritten text-2xl font-bold text-pink-primary mb-4">No Filter</h3>
              <p className="text-gray-300">Your authentic beauty companion for real reviews and honest advice.</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-pink-primary hover:text-pink-accent transition-colors">Instagram</a>
                <a href="#" className="text-pink-primary hover:text-pink-accent transition-colors">TikTok</a>
                <a href="#" className="text-pink-primary hover:text-pink-accent transition-colors">YouTube</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-pink-primary mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-pink-accent transition-colors">The Truth Tea</a></li>
                <li><a href="#" className="hover:text-pink-accent transition-colors">Skin Deep</a></li>
                <li><a href="#" className="hover:text-pink-accent transition-colors">Glow Goals</a></li>
                <li><a href="#" className="hover:text-pink-accent transition-colors">Product Reviews</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-pink-primary mb-4">About</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-pink-accent transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-pink-accent transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-pink-accent transition-colors">Collaborate</a></li>
                <li><a href="#" className="hover:text-pink-accent transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-pink-primary mb-4">Connect</h4>
              <p className="text-gray-300 mb-4">Share your beauty journey with us!</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">#NoFilterBeauty</p>
                <p className="text-sm text-gray-400">hello@nofilterbeauty.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 No Filter Beauty Blog. Made with 💕 for the beauty community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
