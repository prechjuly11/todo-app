/**
 * app.js
 * Express application entry point.
 */
require('dotenv').config();

const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const createDatabaseProvider = require('./lib/database/createDatabaseProvider');
const todosRouter = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── View Engine ──────────────────────────────────────────────────────────────
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
      eq: (a, b) => a === b,
      not: (val) => !val,
    },
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/', todosRouter);

// ─── 404 ─────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found' });
});

// ─── Start ───────────────────────────────────────────────────────────────────
(async () => {
  try {
    const db = await createDatabaseProvider();
    app.locals.db = db;

    app.listen(PORT, () => {
      console.log(`[Server] Running at http://localhost:${PORT}`);
      console.log(`[Server] DB_TYPE = ${process.env.DB_TYPE || 'mongodb'}`);
    });
  } catch (err) {
    console.error('[Server] Failed to start:', err.message);
    process.exit(1);
  }
})();
