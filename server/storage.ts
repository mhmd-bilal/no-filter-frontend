import {
  users,
  posts,
  categories,
  tags,
  postTags,
  type User,
  type UpsertUser,
  type Post,
  type InsertPost,
  type Category,
  type InsertCategory,
  type Tag,
  type InsertTag,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, like, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Post operations
  getPosts(options?: { published?: boolean; categoryId?: number; search?: string; limit?: number; offset?: number }): Promise<Post[]>;
  getPost(slug: string): Promise<Post | undefined>;
  getPostsByAuthor(authorId: string): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post>;
  deletePost(id: number): Promise<void>;
  
  // Tag operations
  getTags(): Promise<Tag[]>;
  createTag(tag: InsertTag): Promise<Tag>;
  addTagToPost(postId: number, tagId: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).orderBy(categories.name);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const slug = category.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const [newCategory] = await db
      .insert(categories)
      .values({ ...category, slug })
      .returning();
    return newCategory;
  }

  // Post operations
  async getPosts(options: { published?: boolean; categoryId?: number; search?: string; limit?: number; offset?: number } = {}): Promise<Post[]> {
    const { published = true, categoryId, search, limit = 50, offset = 0 } = options;
    
    let query = db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        content: posts.content,
        excerpt: posts.excerpt,
        imageUrl: posts.imageUrl,
        categoryId: posts.categoryId,
        authorId: posts.authorId,
        published: posts.published,
        featured: posts.featured,
        readTime: posts.readTime,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .where(
        and(
          published !== undefined ? eq(posts.published, published) : undefined,
          categoryId ? eq(posts.categoryId, categoryId) : undefined,
          search ? or(
            like(posts.title, `%${search}%`),
            like(posts.content, `%${search}%`),
            like(posts.excerpt, `%${search}%`)
          ) : undefined
        )
      )
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);

    return await query;
  }

  async getPost(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post;
  }

  async getPostsByAuthor(authorId: string): Promise<Post[]> {
    return await db
      .select()
      .from(posts)
      .where(eq(posts.authorId, authorId))
      .orderBy(desc(posts.createdAt));
  }

  async createPost(post: InsertPost): Promise<Post> {
    const slug = post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') + '-' + Date.now();
    const [newPost] = await db
      .insert(posts)
      .values({ ...post, slug })
      .returning();
    return newPost;
  }

  async updatePost(id: number, post: Partial<InsertPost>): Promise<Post> {
    const [updatedPost] = await db
      .update(posts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return updatedPost;
  }

  async deletePost(id: number): Promise<void> {
    await db.delete(posts).where(eq(posts.id, id));
  }

  // Tag operations
  async getTags(): Promise<Tag[]> {
    return await db.select().from(tags).orderBy(tags.name);
  }

  async createTag(tag: InsertTag): Promise<Tag> {
    const slug = tag.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const [newTag] = await db
      .insert(tags)
      .values({ ...tag, slug })
      .returning();
    return newTag;
  }

  async addTagToPost(postId: number, tagId: number): Promise<void> {
    await db.insert(postTags).values({ postId, tagId });
  }
}

export const storage = new DatabaseStorage();
