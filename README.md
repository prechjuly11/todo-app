# Todo App — Factory Pattern + Dual Database

A Node.js/Express todo app that uses the **Factory Design Pattern** to switch between MongoDB Atlas and Supabase (PostgreSQL) via a single environment variable.

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
