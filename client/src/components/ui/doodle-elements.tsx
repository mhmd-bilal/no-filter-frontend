import { motion } from "framer-motion";

export default function DoodleElements() {
  return (
    <>
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-[25%] left-[30%] w-6 h-6 doodle-heart"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.2 }}
      />
      <motion.div 
        className="absolute top-[28%] right-[35%] w-5 h-5 doodle-star"
        animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.2 }}
      />
      <motion.div 
        className="absolute bottom-[20%] left-[25%] w-4 h-4 doodle-heart"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        whileHover={{ scale: 1.2 }}
      />
      <motion.div 
        className="absolute top-[45%] right-[10%] w-6 h-6 doodle-star"
        animate={{ rotate: [0, -15, 15, 0], y: [0, -7, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        whileHover={{ scale: 1.2 }}
      />
      <motion.div 
        className="absolute bottom-[15%] right-[32%] w-5 h-5 doodle-heart"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        whileHover={{ scale: 1.2 }}
      />
    </>
  );
}
