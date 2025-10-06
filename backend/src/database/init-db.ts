import pool from './connection'; // Assuming your database connection is in connection.ts





async function flushDatabase() {
    try {
      // Drop all tables in the database
      console.log('Flushing database...');
      await pool.query(`DROP DATABASE IF EXISTS gallery_db;`);
      console.log('Database flushed successfully.');
    } catch (error) {
      console.error('Error flushing database:', error);
      throw error;
    }
  }

async function initializeDatabase() {
  try {

    // await flushDatabase();
    
    // Create the database if it doesn't exist
    await pool.query(`
      CREATE DATABASE IF NOT EXISTS gallery_db;
    `);

    // Use the database
    await pool.query(`
      USE gallery_db;
    `);

    // Create the images table if it doesn't exist
    await pool.query(`
    CREATE TABLE IF NOT EXISTS images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      uuid VARCHAR(36) NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      country VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      year_taken YEAR NOT NULL,
      file_type VARCHAR(10) NOT NULL,
      iso INT NULL,               
      lens VARCHAR(255) NULL,     
      camera VARCHAR(255) NOT NULL, 
      film_roll VARCHAR(255) NULL,  
      color VARCHAR(255) NOT NULL,
      focal_length FLOAT  NULL,    
      shutter_speed VARCHAR(255) NULL,
      aperture FLOAT NULL,        
      width INT NOT NULL,
      height INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
  );

    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1); // Exit the process if initialization fails
  }
}

export default initializeDatabase;
