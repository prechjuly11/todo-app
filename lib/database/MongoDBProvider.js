/**
 * MongoDBProvider.js
 * MongoDB implementation of DatabaseProvider using Mongoose.
 */
const mongoose = require('mongoose');
const DatabaseProvider = require('./DatabaseProvider');
const { Todo } = require('./models/mongoModels');

class MongoDBProvider extends DatabaseProvider {
  constructor() {
    super();
    this._connected = false;
  }

  async connect() {
    if (this._connected) return;
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI is not defined in .env');

    await mongoose.connect(uri);
    this._connected = true;
    console.log('[MongoDB] Connected successfully');
  }

  async getTodos() {
    const todos = await Todo.find().sort({ createdAt: -1 });
    return todos.map((t) => ({
      id: t._id.toString(),
      text: t.text,
      completed: t.completed,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    }));
  }

  async createTodo(text) {
    const todo = await Todo.create({ text });
    return {
      id: todo._id.toString(),
      text: todo.text,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  }

  async updateTodo(id, updates) {
    const todo = await Todo.findByIdAndUpdate(id, updates, { new: true });
    if (!todo) throw new Error(`Todo ${id} not found`);
    return {
      id: todo._id.toString(),
      text: todo.text,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  }

  async deleteTodo(id) {
    await Todo.findByIdAndDelete(id);
  }

  async toggleTodo(id) {
    const todo = await Todo.findById(id);
    if (!todo) throw new Error(`Todo ${id} not found`);
    return this.updateTodo(id, { completed: !todo.completed });
  }
}

module.exports = MongoDBProvider;
