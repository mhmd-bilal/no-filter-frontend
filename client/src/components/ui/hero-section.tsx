import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DoodleElements from "@/components/ui/doodle-elements";

export default function HeroSection() {
  return (
    <motion.section 
      id="home" 
      className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <DoodleElements />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          className="mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-handwritten font-bold text-pink-accent mb-4 animate-bounce-slow">
            No Filter
          </h1>
          <p className="text-xl md:text-2xl text-text-dark/80 max-w-2xl mx-auto leading-relaxed">
            Real beauty. Real reviews. Real talk. Your digital scrapbook for all things glow ✨
          </p>
        </motion.div>
        
        {/* Video Hero Placeholder */}
        <motion.div 
          className="relative mx-auto max-w-4xl mb-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="polaroid-card transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450" 
                alt="Beauty content creation" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center mt-4">
              <p className="font-handwritten text-lg text-text-dark">Welcome to my beauty journey! 💕</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button className="px-8 py-3 bg-pink-accent text-white rounded-full hover:bg-pink-accent/90 transition-colors font-medium">
            Start Reading
          </Button>
          <Button 
            variant="outline"
            className="px-8 py-3 border-2 border-pink-accent text-pink-accent rounded-full hover:bg-pink-accent hover:text-white transition-colors font-medium"
          >
            Join the Community
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
