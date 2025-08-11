import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { z } from "zod";
import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Link } from "wouter";

const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title too long"),
  excerpt: z.string().max(500, "Excerpt too long").optional(),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  categoryId: z.number().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  readTime: z.string().default("5 min read"),
});

type CreatePostForm = z.infer<typeof createPostSchema>;

export default function CreatePost() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, authLoading, toast]);

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const form = useForm<CreatePostForm>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      published: false,
      featured: false,
      readTime: "5 min read",
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (data: CreatePostForm) => {
      const response = await apiRequest("POST", "/api/posts", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success! ✨",
        description: "Your beauty post has been created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/my-posts"] });
      setLocation(`/post/${data.slug}`);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CreatePostForm) => {
    createPostMutation.mutate({
      ...data,
      categoryId: data.categoryId || undefined,
      imageUrl: data.imageUrl || undefined,
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-pink-light grid-overlay">
        <Navigation />
        <div className="pt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-pink-primary/20 rounded-full w-24"></div>
            <div className="h-12 bg-pink-primary/20 rounded-lg w-3/4"></div>
            <div className="h-32 bg-pink-primary/20 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-light grid-overlay">
      <Navigation />
      
      <motion.div 
        className="pt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
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
            Back to Home
          </Button>
        </Link>

        <Card className="polaroid-card transform -rotate-1">
          <CardHeader>
            <CardTitle className="text-4xl font-handwritten font-bold text-pink-accent text-center">
              Share Your Beauty Story ✨
            </CardTitle>
            <p className="text-center text-text-dark/80">
              Create a new post for the No Filter community
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-pink-accent font-medium">
                  Post Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., My Holy Grail Skincare Routine"
                  className="rounded-lg border-pink-primary/30 focus:ring-pink-accent focus:border-pink-accent"
                  {...form.register("title")}
                />
                {form.formState.errors.title && (
                  <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
                )}
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-pink-accent font-medium">
                  Short Description
                </Label>
                <Textarea
                  id="excerpt"
                  placeholder="A brief description of your post..."
                  className="rounded-lg border-pink-primary/30 focus:ring-pink-accent focus:border-pink-accent"
                  rows={3}
                  {...form.register("excerpt")}
                />
                {form.formState.errors.excerpt && (
                  <p className="text-sm text-red-500">{form.formState.errors.excerpt.message}</p>
                )}
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-pink-accent font-medium flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Cover Image URL
                </Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="rounded-lg border-pink-primary/30 focus:ring-pink-accent focus:border-pink-accent"
                  {...form.register("imageUrl")}
                />
                {form.formState.errors.imageUrl && (
                  <p className="text-sm text-red-500">{form.formState.errors.imageUrl.message}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="text-pink-accent font-medium">Category</Label>
                <Select 
                  value={form.watch("categoryId")?.toString() || ""} 
                  onValueChange={(value) => form.setValue("categoryId", parseInt(value))}
                >
                  <SelectTrigger className="rounded-lg border-pink-primary/30 focus:ring-pink-accent">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category: any) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Read Time */}
              <div className="space-y-2">
                <Label htmlFor="readTime" className="text-pink-accent font-medium">
                  Read Time
                </Label>
                <Input
                  id="readTime"
                  placeholder="5 min read"
                  className="rounded-lg border-pink-primary/30 focus:ring-pink-accent focus:border-pink-accent"
                  {...form.register("readTime")}
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content" className="text-pink-accent font-medium">
                  Content *
                </Label>
                <Textarea
                  id="content"
                  placeholder="Share your beauty journey, tips, product reviews..."
                  className="rounded-lg border-pink-primary/30 focus:ring-pink-accent focus:border-pink-accent min-h-[300px]"
                  {...form.register("content")}
                />
                {form.formState.errors.content && (
                  <p className="text-sm text-red-500">{form.formState.errors.content.message}</p>
                )}
              </div>

              {/* Switches */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={form.watch("published")}
                    onCheckedChange={(checked) => form.setValue("published", checked)}
                  />
                  <Label htmlFor="published" className="text-pink-accent font-medium">
                    Publish immediately
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={form.watch("featured")}
                    onCheckedChange={(checked) => form.setValue("featured", checked)}
                  />
                  <Label htmlFor="featured" className="text-pink-accent font-medium">
                    Featured post
                  </Label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={createPostMutation.isPending}
                  className="flex-1 bg-pink-accent text-white rounded-full hover:bg-pink-accent/90 transition-colors font-medium"
                >
                  {createPostMutation.isPending ? "Creating..." : "Create Post ✨"}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.setValue("published", false);
                    form.handleSubmit(onSubmit)();
                  }}
                  disabled={createPostMutation.isPending}
                  className="flex-1 border-pink-accent text-pink-accent rounded-full hover:bg-pink-accent hover:text-white transition-colors font-medium"
                >
                  Save as Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
