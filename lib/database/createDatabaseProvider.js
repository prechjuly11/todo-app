/**
 * createDatabaseProvider.js
 * Factory function that reads DB_TYPE from environment variables
 * and returns the appropriate database provider instance.
 */
const MongoDBProvider = require('./MongoDBProvider');
const SupabaseProvider = require('./SupabaseProvider');

/**
 * Creates and connects a database provider based on the DB_TYPE env variable.
 * @returns {Promise<DatabaseProvider>} A connected database provider instance
 */
async function createDatabaseProvider() {
  const dbType = (process.env.DB_TYPE || 'mongodb').toLowerCase();

  let provider;

  switch (dbType) {
    case 'mongodb':
      provider = new MongoDBProvider();
      break;
    case 'supabase':
      provider = new SupabaseProvider();
      break;
    default:
      throw new Error(
        `Unknown DB_TYPE: "${dbType}". Valid options are "mongodb" or "supabase".`
      );
  }

  await provider.connect();
  console.log(`[Factory] Using database provider: ${dbType}`);
  return provider;
}

module.exports = createDatabaseProvider;
