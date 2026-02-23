import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("quickbite.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT,
    role TEXT DEFAULT 'user'
  );

  CREATE TABLE IF NOT EXISTS food_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price INTEGER,
    description TEXT,
    image TEXT,
    vendor_name TEXT,
    views INTEGER DEFAULT 0
  );
`);

// Seed food items if empty
const foodCount = db.prepare("SELECT COUNT(*) as count FROM food_items").get() as any;
if (foodCount.count === 0) {
  const seedItems = [
    { name: "The Ultimate Kota", price: 45, description: "Quarter loaf with chips, polony, cheese, egg, and special sauce.", image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=400", vendor_name: "Mama's Kota & Wings", views: 150 },
    { name: "6-Wing Combo", price: 65, description: "6 spicy wings served with a side of crispy fries.", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=400", vendor_name: "Mama's Kota & Wings", views: 85 },
    { name: "Family Braai Platter", price: 180, description: "Chuck, wors, wings, pap, and chakalaka for 4 people.", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400", vendor_name: "Soweto Braai Master", views: 210 },
    { name: "Gourmet Beef Burger", price: 85, description: "100% pure beef patty with caramelized onions and secret sauce.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400", vendor_name: "The Burger Joint", views: 320 },
    { name: "Crispy Chicken Bucket", price: 120, description: "8 pieces of original recipe crispy chicken.", image: "https://images.unsplash.com/photo-1626645738196-c2a7c8d08f58?auto=format&fit=crop&q=80&w=400", vendor_name: "Crispy Chicken Hub", views: 95 }
  ];
  const insert = db.prepare("INSERT INTO food_items (name, price, description, image, vendor_name, views) VALUES (?, ?, ?, ?, ?, ?)");
  seedItems.forEach(item => insert.run(item.name, item.price, item.description, item.image, item.vendor_name, item.views));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/food/top-rated", (req, res) => {
    const items = db.prepare("SELECT * FROM food_items ORDER BY views DESC LIMIT 4").all();
    res.json({ success: true, items });
  });

  app.post("/api/food/:id/view", (req, res) => {
    const { id } = req.params;
    db.prepare("UPDATE food_items SET views = views + 1 WHERE id = ?").run(id);
    res.json({ success: true });
  });
  app.post("/api/signup", (req, res) => {
    const { email, password, name } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO users (email, password, name) VALUES (?, ?, ?)");
      const info = stmt.run(email, password, name);
      res.json({ success: true, user: { id: info.lastInsertRowid, email, name } });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  });

  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password) as any;
    
    if (user) {
      res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
