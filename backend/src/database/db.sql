-- only for reference, db init happens in init-db.ts

CREATE DATABASE IF NOT EXISTS gallery_db;

USE gallery_db;


CREATE TABLE IF NOT EXISTS images (
  uuid VARCHAR(36) PRIMARY KEY,
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
);
