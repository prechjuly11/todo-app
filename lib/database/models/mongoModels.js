/**
 * mongoModels.js
 * Mongoose schema and model definitions for MongoDB.
 */
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = { Todo };
