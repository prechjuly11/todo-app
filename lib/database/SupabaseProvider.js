/**
 * SupabaseProvider.js
 * Supabase (PostgreSQL) implementation of DatabaseProvider.
 */
const { createClient } = require('@supabase/supabase-js');
const DatabaseProvider = require('./DatabaseProvider');
const { TABLE_NAME, normalizeRow } = require('./models/supabaseModels');

class SupabaseProvider extends DatabaseProvider {
  constructor() {
    super();
    this.client = null;
  }

  async connect() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY;
    if (!url || !key) throw new Error('SUPABASE_URL or SUPABASE_KEY is not defined in .env');

    this.client = createClient(url, key);
    console.log('[Supabase] Client initialized');
  }

  async getTodos() {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Supabase getTodos error: ${error.message}`);
    return data.map(normalizeRow);
  }

  async createTodo(text) {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .insert({ text, completed: false })
      .select()
      .single();

    if (error) throw new Error(`Supabase createTodo error: ${error.message}`);
    return normalizeRow(data);
  }

  async updateTodo(id, updates) {
    // Map camelCase to snake_case for Supabase
    const supabaseUpdates = {};
    if (updates.text !== undefined) supabaseUpdates.text = updates.text;
    if (updates.completed !== undefined) supabaseUpdates.completed = updates.completed;
    supabaseUpdates.updated_at = new Date().toISOString();

    const { data, error } = await this.client
      .from(TABLE_NAME)
      .update(supabaseUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Supabase updateTodo error: ${error.message}`);
    return normalizeRow(data);
  }

  async deleteTodo(id) {
    const { error } = await this.client.from(TABLE_NAME).delete().eq('id', id);
    if (error) throw new Error(`Supabase deleteTodo error: ${error.message}`);
  }

  async toggleTodo(id) {
    // Fetch current state first
    const { data: current, error: fetchError } = await this.client
      .from(TABLE_NAME)
      .select('completed')
      .eq('id', id)
      .single();

    if (fetchError) throw new Error(`Supabase toggleTodo fetch error: ${fetchError.message}`);
    return this.updateTodo(id, { completed: !current.completed });
  }
}

module.exports = SupabaseProvider;
