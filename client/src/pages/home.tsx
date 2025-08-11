import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Plus } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import PostsGrid from "@/components/ui/posts-grid";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  
  const { data: myPosts } = useQuery({
    queryKey: ["/api/my-posts"],
    enabled: !!user,
  });

  return (
    <div className="min-h-screen bg-pink-light grid-overlay font-sans text-text-dark">
      <Navigation />
      
      {/* Welcome Header */}
      <motion.section 
        className="pt-24 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-handwritten font-bold text-pink-accent mb-4">
              Welcome back! ✨
            </h1>
            <p className="text-xl text-text-dark/80">
              Ready to share your beauty journey with the world?
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link href="/create">
              <Button className="px-8 py-3 bg-pink-accent text-white rounded-full hover:bg-pink-accent/90 transition-colors font-medium flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Post
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* My Posts Section */}
      {myPosts && myPosts.length > 0 && (
        <motion.section 
          className="py-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-handwritten font-bold text-pink-accent mb-8">
              Your Beauty Posts 💄
            </h2>
            <div className="masonry-grid">
              {myPosts?.map((post: any, index: number) => (
                <motion.article 
                  key={post.id}
                  className="masonry-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/post/${post.slug}`}>
                    <div className={`polaroid-card transform ${index % 3 === 0 ? 'rotate-2' : index % 3 === 1 ? '-rotate-1' : 'rotate-1'} hover:rotate-0 cursor-pointer`}>
                      {post.imageUrl && (
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <div className="text-center">
                        <h3 className="font-handwritten text-xl font-bold text-pink-accent mb-2">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-text-dark/80 text-sm mb-3">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex justify-center items-center space-x-2">
                          <span className="text-xs bg-pink-primary/20 text-pink-accent px-2 py-1 rounded-full">
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                          <span className="text-xs text-text-dark/60">
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* All Posts */}
      <PostsGrid showAll={true} />
    </div>
  );
}
