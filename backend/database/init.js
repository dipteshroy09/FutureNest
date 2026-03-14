const fs = require('fs');
const path = require('path');
const { pool, testConnection, getAdminConnection, dbName } = require('../config/database');

async function initializeDatabase() {
  console.log('🚀 Initializing FutureNest Database...\n');

  // Step 1: Connect without database and create it if needed
  let adminConnection;
  try {
    adminConnection = await getAdminConnection();
    console.log('✅ Connected to MySQL server');

    // Create database if it doesn't exist
    await adminConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Database '${dbName}' created/verified`);

    // Use the database (use query, not execute, for USE statement)
    await adminConnection.query(`USE \`${dbName}\``);
    console.log(`✅ Using database '${dbName}'\n`);

    await adminConnection.end();
  } catch (error) {
    console.error('❌ Failed to create database:', error.message);
    process.exit(1);
  }

  // Step 2: Test connection with the database
  const connected = await testConnection();
  if (!connected) {
    console.error('Please check your database configuration in .env file');
    process.exit(1);
  }

  // Step 3: Execute schema
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'));

    let successCount = 0;
    for (const statement of statements) {
      try {
        await pool.query(statement + ';');
        successCount++;
      } catch (err) {
        // Ignore errors for comments and empty statements
        if (!err.message.includes('ER_EMPTY_QUERY')) {
          console.warn('⚠️  Statement skipped:', err.message.split('\n')[0]);
        }
      }
    }

    console.log(`✅ Executed ${successCount} schema statements`);
    console.log('\n📊 Tables ready:');
    console.log('   - users');
    console.log('   - calculations');
    console.log('   - yearly_breakdown');
    console.log('   - calculation_shares');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
