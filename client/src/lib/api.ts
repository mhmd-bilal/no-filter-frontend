export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  userId: string;
  username: string;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
}

interface SignInResponse {
  token: string;
}

const API_URL = 'http://localhost:3001';

export async function signUp(username: string, password: string): Promise<SignInResponse> {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to sign up');
  }

  return response.json();
}

export async function signIn(username: string, password: string): Promise<SignInResponse> {
  const response = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to sign in');
  }

  return response.json();
}

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
}

export async function createPost(data: { title: string; content: string }): Promise<Post> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create post');
  }

  return response.json();
}
