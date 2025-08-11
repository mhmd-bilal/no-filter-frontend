import { Badge } from "@/components/ui/badge";

interface PolaroidCardProps {
  title: string;
  excerpt?: string;
  imageUrl?: string;
  readTime?: string;
  category?: string;
  rotation?: string;
  className?: string;
}

export default function PolaroidCard({
  title,
  excerpt,
  imageUrl,
  readTime = "5 min read",
  category,
  rotation = "rotate-2",
  className = ""
}: PolaroidCardProps) {
  return (
    <div className={`polaroid-card transform ${rotation} hover:rotate-0 transition-all duration-300 cursor-pointer ${className}`}>
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <div className="text-center">
        <h3 className="font-handwritten text-xl font-bold text-pink-accent mb-2">
          {title}
        </h3>
        {excerpt && (
          <p className="text-text-dark/80 text-sm mt-2 mb-3">
            {excerpt}
          </p>
        )}
        <div className="flex justify-center items-center space-x-2">
          {category && (
            <Badge className="text-xs bg-pink-primary/20 text-pink-accent px-2 py-1 rounded-full">
              {category}
            </Badge>
          )}
          <span className="text-xs text-text-dark/60">
            {readTime}
          </span>
        </div>
      </div>
    </div>
  );
}
