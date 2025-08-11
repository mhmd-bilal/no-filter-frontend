import { motion } from "framer-motion";

const categories = [
  {
    title: "Product Reviews",
    description: "In-depth analysis of skincare products and their effectiveness",
    image: "https://i.ibb.co/S71k95G8/hp1.jpg",
  },
  {
    title: "Skin Science",
    description: "Understanding ingredients and their impact on skin health",
    image: "https://i.ibb.co/hJ9BrPMK/hp2.jpg",
  },
  {
    title: "Skin Health",
    description: "Evidence-based approaches to maintaining healthy skin",
    image: "https://i.ibb.co/Q38Zv1Vd/hp3.jpg",
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
          Explore Skincare Topics
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                rotate: Math.random() * 6 - 3 // Random rotation between -3 and 3 degrees
              }}
              whileHover={{ 
                rotate: 0,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="polaroid-card transform cursor-pointer shadow-md hover:shadow-xl"
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
