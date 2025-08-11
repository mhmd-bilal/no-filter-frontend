import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/lib/api";
import type { Post } from "@/lib/api";

interface PolaroidCardProps {
  title: string;
  content: string;
  imageUrl?: string;
  username: string;
  createdAt: string;
  rotation?: string;
}

function PolaroidCard({ title, content, imageUrl, username, createdAt, rotation }: PolaroidCardProps) {
  const date = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className={`h-full hover:shadow-lg transition-shadow overflow-hidden ${rotation}`}>
      <CardContent className="p-6">
        {imageUrl && (
          <div className="mb-4 w-full h-48 overflow-hidden rounded-lg">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <CardTitle className="mb-2">{title}</CardTitle>
        <p className="text-gray-600 mb-4 line-clamp-2">{content}</p>
        <div className="flex justify-between items-center">
          <Badge variant="secondary">@{username}</Badge>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
      </CardContent>
    </Card>
  );
}

interface PostsGridProps {
  showAll?: boolean;
}

export default function PostsGrid({ showAll = true }: PostsGridProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = showAll ? 12 : 6;

  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent>
                  <div className="w-full h-48 bg-pink-primary/20 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-6 bg-pink-primary/20 rounded-lg w-3/4"></div>
                    <div className="h-4 bg-pink-primary/20 rounded-lg w-full"></div>
                    <div className="h-4 bg-pink-primary/20 rounded-lg w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!posts.length) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-gray-600">No posts found</p>
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
            Latest Posts
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, showAll ? posts.length : postsPerPage).map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/post/${post.id}`}>
                <PolaroidCard
                  title={post.title}
                  content={post.content}
                  imageUrl={post.imageUrl}
                  username={post.username}
                  createdAt={post.createdAt}
                  rotation={index % 3 === 0 ? 'rotate-2' : index % 3 === 1 ? '-rotate-1' : 'rotate-1'}
                />
              </Link>
            </motion.article>
          ))}
        </div>
        
        {!showAll && posts.length > postsPerPage && (
          <div className="mt-8 text-center">
            <Link to="/home">
              <Button variant="outline">View All Posts</Button>
            </Link>
          </div>
        )}

        {showAll && posts.length > postsPerPage && (
          <div className="mt-8 flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage * postsPerPage + postsPerPage >= posts.length}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
