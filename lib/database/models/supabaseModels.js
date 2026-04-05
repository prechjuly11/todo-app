/**
 * supabaseModels.js
 * Supabase-specific table definitions and helper utilities.
 *
 * Supabase uses PostgreSQL. The expected table schema is:
 *
 *   CREATE TABLE todos (
 *     id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *     text  TEXT NOT NULL,
 *     completed BOOLEAN NOT NULL DEFAULT FALSE,
 *     created_at TIMESTAMPTZ DEFAULT NOW(),
 *     updated_at TIMESTAMPTZ DEFAULT NOW()
 *   );
 *
 * Run the SQL above in your Supabase project's SQL editor to create the table.
 */

const TABLE_NAME = 'todos';

/**
 * Normalize a Supabase row to a consistent shape used throughout the app.
 * Supabase uses snake_case; we normalize to camelCase.
 * @param {Object} row
 * @returns {Object}
 */
function normalizeRow(row) {
  return {
    id: row.id,
    text: row.text,
    completed: row.completed,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

module.exports = { TABLE_NAME, normalizeRow };
