/**
 * routes/todos.js
 * Express routes for CRUD operations on Todos.
 * Uses req.app.locals.db to access the database provider.
 */
const express = require('express');
const router = express.Router();

// GET / — List all todos
router.get('/', async (req, res) => {
  try {
    const todos = await req.app.locals.db.getTodos();
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    res.render('index', {
      todos,
      stats: { total, completed, remaining: total - completed },
      dbType: process.env.DB_TYPE || 'mongodb',
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: err.message });
  }
});

// POST /todos — Create a new todo
router.post('/todos', async (req, res) => {
  try {
    const text = (req.body.text || '').trim();
    if (!text) return res.redirect('/');
    await req.app.locals.db.createTodo(text);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: err.message });
  }
});

// POST /todos/:id/toggle — Toggle completion
router.post('/todos/:id/toggle', async (req, res) => {
  try {
    await req.app.locals.db.toggleTodo(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: err.message });
  }
});

// POST /todos/:id/edit — Update todo text
router.post('/todos/:id/edit', async (req, res) => {
  try {
    const text = (req.body.text || '').trim();
    if (!text) return res.redirect('/');
    await req.app.locals.db.updateTodo(req.params.id, { text });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: err.message });
  }
});

// POST /todos/:id/delete — Delete a todo
router.post('/todos/:id/delete', async (req, res) => {
  try {
    await req.app.locals.db.deleteTodo(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: err.message });
  }
});

module.exports = router;
