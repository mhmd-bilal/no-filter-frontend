import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Post() {
  const { slug } = useParams();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["/api/posts", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pink-light grid-overlay">
        <Navigation />
        <div className="pt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-24 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-pink-light grid-overlay">
        <Navigation />
        <div className="pt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-handwritten font-bold text-pink-accent mb-4">
            Post Not Found 😔
          </h1>
          <p className="text-text-dark/80 mb-8">
            This beauty post seems to have disappeared!
          </p>
          <Link href="/">
            <Button className="bg-pink-accent text-white rounded-full hover:bg-pink-accent/90">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-light grid-overlay">
      <Navigation />
      
      <motion.article 
        className="pt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Button */}
        <Link href="/">
          <Button 
            variant="ghost" 
            className="mb-6 text-pink-accent hover:text-pink-accent/80 hover:bg-pink-primary/20 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Button>
        </Link>

        {/* Post Header */}
        <motion.div 
          className="polaroid-card mb-8 transform -rotate-1"
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: -1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {post.imageUrl && (
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg mb-6"
            />
          )}
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-handwritten font-bold text-pink-accent mb-4">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-lg text-text-dark/80 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}
            
            <div className="flex justify-center items-center space-x-6 text-sm text-text-dark/60">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Beauty Blogger</span>
              </div>
              {post.createdAt && (
                <span>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Post Content */}
        <motion.div 
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div 
            className="text-text-dark leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-12 p-8 bg-white/70 backdrop-blur-sm rounded-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-handwritten font-bold text-pink-accent mb-4">
            Loved this post? 💕
          </h3>
          <p className="text-text-dark/80 mb-6">
            Share your thoughts and connect with our beauty community!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-pink-accent text-white rounded-full hover:bg-pink-accent/90">
              Share on Instagram
            </Button>
            <Button 
              variant="outline" 
              className="border-pink-accent text-pink-accent rounded-full hover:bg-pink-accent hover:text-white"
            >
              Save for Later
            </Button>
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
}
