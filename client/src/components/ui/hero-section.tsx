import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DoodleElements from "@/components/ui/doodle-elements";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";

export default function HeroSection() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const handleCreatePost = () => {
    if (isAuthenticated) {
      setLocation('/create-post');
    } else {
      setLocation('/sign-in');
    }
  };

  return (
    <motion.section
      id="home"
      className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Grid Background */}
      <div
        className={cn(
          "absolute inset-0 z-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#f8d4e6_1px,transparent_1px),linear-gradient(to_bottom,#f8d4e6_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black/50"></div>

      <DoodleElements />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content - Left Side */}
          <motion.div
            className="text-left"
            initial={{ y: 50, opacity: 0 }}
            animate={{ 
              y: [0, -8, 0],
              opacity: 1 
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: { duration: 0.8, delay: 0.2 }
            }}
          >
            <h1 className="text-6xl md:text-8xl font-handwritten text-pink-accent mb-4">
              No Filter
            </h1>
            <p className="text-xl md:text-2xl text-text-dark/80 max-w-2xl leading-relaxed mb-8">
              Because beauty isn’t a standard to meet, it’s a story to tell, and yours deserves to be heard without filters or façades.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-start"
              initial={{ y: 90, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 2 }}
            >
              <Button className="px-8 py-3 bg-pink-accent text-white rounded-full hover:bg-pink-accent/90 transition-colors font-medium">
                Start Reading
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 border-2 border-pink-accent text-pink-accent rounded-full hover:bg-pink-accent hover:text-white transition-colors font-medium"
                onClick={handleCreatePost}
              >
                {isAuthenticated ? "Create a Post ✨" : "Sign in to Post"}
              </Button>
            </motion.div>
          </motion.div>

          {/* Polaroid - Right Side */}
          <motion.div
            className="relative lg:justify-self-end"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: [0, -6, 0]
            }}
            transition={{ 
              scale: { duration: 0.8, delay: 0.4 },
              opacity: { duration: 0.8, delay: 0.4 },
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
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
                <p className="font-handwritten text-lg text-text-dark">This might be you</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
