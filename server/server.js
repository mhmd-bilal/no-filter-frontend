import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database
let db = {
  users: [],
  posts: []
};

// Load database from file
async function loadDb() {
  try {
    const data = await fs.readFile(join(__dirname, 'db.json'), 'utf8');
    db = JSON.parse(data);
  } catch (error) {
    console.error('Error loading database:', error);
  }
}

// Save database to file
async function saveDb() {
  try {
    await fs.writeFile(
      join(__dirname, 'db.json'),
      JSON.stringify(db, null, 2),
      'utf8'
    );
  } catch (error) {
    console.error('Error saving database:', error);
  }
}

// Auth middleware
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    if (db.users.some(user => user.username === username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      username,
      password: hashedPassword
    };

    db.users.push(newUser);
    await saveDb();

    const token = jwt.sign({ id: newUser.id, username }, JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = db.users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/posts', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const newPost = {
      id: Date.now().toString(),
      title,
      content,
      userId: req.user.id,
      username: req.user.username,
      createdAt: new Date().toISOString()
    };

    db.posts.push(newPost);
    await saveDb();
    
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/posts', async (req, res) => {
  try {
    res.json(db.posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Initialize server
async function init() {
  await loadDb();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

init();
