import { motion } from "framer-motion";

const categories = [
  {
    title: "The Truth Tea ☕",
    description: "Honest product reviews & real results",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    rotation: "-rotate-2"
  },
  {
    title: "Skin Deep 🌸",
    description: "Skincare routines & ingredient deep dives",
    image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    rotation: "rotate-1"
  },
  {
    title: "Glow Goals ✨",
    description: "Lifestyle tips & wellness for your glow",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    rotation: "-rotate-1"
  }
];

export default function CategoryGrid() {
  return (
    <motion.section 
      className="py-16 bg-white/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-handwritten font-bold text-center text-pink-accent mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          What's Your Vibe Today?
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`polaroid-card transform ${category.rotation} hover:rotate-0 transition-all duration-300 cursor-pointer`}
            >
              <img 
                src={category.image}
                alt={category.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="text-center mt-4">
                <h3 className="font-handwritten text-2xl font-bold text-pink-accent">
                  {category.title}
                </h3>
                <p className="text-text-dark/80 mt-2">
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
