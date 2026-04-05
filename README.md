# Todo App — Factory Pattern + Dual Database

A Node.js/Express todo app that uses the **Factory Design Pattern** to switch between MongoDB Atlas and Supabase (PostgreSQL) via a single environment variable.

## Project Structure

```
todo-app/
├── app.js                          # Express entry point
├── routes/
│   └── todos.js                    # CRUD routes
├── views/
│   ├── layouts/main.hbs            # Base layout
│   ├── index.hbs                   # Todo list page
│   └── error.hbs                   # Error page
├── public/
│   └── css/style.css
├── lib/
│   └── database/
│       ├── DatabaseProvider.js         # Abstract base class
│       ├── MongoDBProvider.js          # MongoDB implementation
│       ├── SupabaseProvider.js         # Supabase implementation
│       ├── createDatabaseProvider.js   # Factory function
│       └── models/
│           ├── mongoModels.js          # Mongoose schema
│           └── supabaseModels.js       # Supabase table helpers
├── .env.example
├── .gitignore
└── package.json
```

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Edit `.env` with your credentials.

### 3. Supabase — Create the table
Run this SQL in your Supabase project's **SQL Editor**:
```sql
CREATE TABLE todos (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text       TEXT NOT NULL,
  completed  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. Run

**With MongoDB:**
```bash
# In .env: DB_TYPE=mongodb
npm start
```

**With Supabase:**
```bash
# In .env: DB_TYPE=supabase
npm start
```

**Development (auto-reload):**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How the Factory Pattern Works

`createDatabaseProvider.js` reads `DB_TYPE` from `.env` and returns the matching provider:

```
DB_TYPE=mongodb   → new MongoDBProvider()
DB_TYPE=supabase  → new SupabaseProvider()
```

Both extend `DatabaseProvider` and implement the same interface:
- `getTodos()`
- `createTodo(text)`
- `updateTodo(id, updates)`
- `deleteTodo(id)`
- `toggleTodo(id)`

The rest of the application (`app.js`, routes) only ever calls these methods — it never knows which database is running underneath.
