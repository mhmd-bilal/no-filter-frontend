import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import PolaroidCard from "@/components/ui/polaroid-card";

interface PostsGridProps {
  showAll?: boolean;
}

export default function PostsGrid({ showAll = true }: PostsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = showAll ? 12 : 6;

  const { data: posts, isLoading } = useQuery({
    queryKey: ["/api/posts", { 
      limit: showAll ? 50 : postsPerPage,
      offset: currentPage * postsPerPage 
    }],
  });

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const filteredPosts = selectedCategory === "all" 
    ? posts 
    : posts?.filter((post: any) => post.categoryId === parseInt(selectedCategory));

  const displayedPosts = showAll 
    ? filteredPosts 
    : filteredPosts?.slice(0, postsPerPage);

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="masonry-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="masonry-item">
                <div className="polaroid-card animate-pulse">
                  <div className="w-full h-48 bg-pink-primary/20 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-6 bg-pink-primary/20 rounded-lg w-3/4 mx-auto"></div>
                    <div className="h-4 bg-pink-primary/20 rounded-lg w-full"></div>
                    <div className="h-4 bg-pink-primary/20 rounded-lg w-2/3 mx-auto"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section 
      className="py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-4xl font-handwritten font-bold text-pink-accent mb-4 md:mb-0">
            Latest from the Scrapbook
          </h2>
          
          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-pink-accent text-white"
                  : "bg-white text-text-dark hover:bg-pink-primary/20"
              }`}
            >
              All
            </Button>
            {categories?.map((category: any) => (
              <Button
                key={category.id}
                size="sm"
                onClick={() => setSelectedCategory(category.id.toString())}
                className={`rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id.toString()
                    ? "bg-pink-accent text-white"
                    : "bg-white text-text-dark hover:bg-pink-primary/20"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="masonry-grid">
          {displayedPosts?.map((post: any, index: number) => (
            <motion.article 
              key={post.id}
              className="masonry-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/post/${post.slug}`}>
                <PolaroidCard
                  title={post.title}
                  excerpt={post.excerpt}
                  imageUrl={post.imageUrl}
                  readTime={post.readTime}
                  category="Reviews" // This could be dynamic based on categoryId
                  rotation={index % 3 === 0 ? 'rotate-2' : index % 3 === 1 ? '-rotate-1' : 'rotate-1'}
                />
              </Link>
            </motion.article>
          ))}
        </div>
        
        {showAll && filteredPosts && filteredPosts.length > postsPerPage && (
          <div className="text-center mt-12">
            <Button 
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-8 py-3 bg-pink-accent text-white rounded-full hover:bg-pink-accent/90 transition-colors font-medium"
            >
              Load More Posts
            </Button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
