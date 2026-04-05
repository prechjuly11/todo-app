/**
 * DatabaseProvider.js
 * Abstract base class defining the interface for all database providers.
 * All providers must implement these methods.
 */
class DatabaseProvider {
  /**
   * Fetch all todos.
   * @returns {Promise<Array>} Array of todo objects
   */
  async getTodos() {
    throw new Error('getTodos() must be implemented by subclass');
  }

  /**
   * Create a new todo.
   * @param {string} text - The todo text
   * @returns {Promise<Object>} The created todo object
   */
  async createTodo(text) {
    throw new Error('createTodo() must be implemented by subclass');
  }

  /**
   * Update a todo's text and/or completion status.
   * @param {string} id - The todo ID
   * @param {Object} updates - Fields to update: { text?, completed? }
   * @returns {Promise<Object>} The updated todo object
   */
  async updateTodo(id, updates) {
    throw new Error('updateTodo() must be implemented by subclass');
  }

  /**
   * Delete a todo by ID.
   * @param {string} id - The todo ID
   * @returns {Promise<void>}
   */
  async deleteTodo(id) {
    throw new Error('deleteTodo() must be implemented by subclass');
  }

  /**
   * Toggle a todo's completed status.
   * @param {string} id - The todo ID
   * @returns {Promise<Object>} The updated todo object
   */
  async toggleTodo(id) {
    throw new Error('toggleTodo() must be implemented by subclass');
  }
}

module.exports = DatabaseProvider;
