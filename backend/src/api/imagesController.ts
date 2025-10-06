import pool from '../database/connection';
import { Request, Response } from 'express';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

// Create a new image
export const createImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      image_url, name, type, country, city, year_taken, 
      iso, lens, camera, film_roll, color, focal_length, shutter_speed, aperture 
    } = req.body;

    if (!image_url) {
      res.status(400).json({ message: 'Image URL is required.' });
      return;
    }

    // Validate that the URL is a valid image URL
    try {
      new URL(image_url);
    } catch (error) {
      res.status(400).json({ message: 'Invalid image URL provided.' });
      return;
    }

    // Generate UUID
    const uuid = uuidv4();

    // Try to get image dimensions using sharp from the URL
    let width, height;
    try {
      // Fetch image from remote URL
      const response = await axios.get(image_url, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data);
      const imageMetadata = await sharp(imageBuffer).metadata();
      width = imageMetadata.width;
      height = imageMetadata.height;
    } catch (error) {
      console.error('Error fetching image metadata:', error);
      // If we can't get dimensions, we'll set them as null
      width = null;
      height = null;
    }

    // Determine file type from URL or default to unknown
    const fileExtension = image_url.split('.').pop()?.toLowerCase();
    const fileType = fileExtension ? `.${fileExtension}` : null;

    // Insert data into the database
    const dbQuery = `
      INSERT INTO images (uuid, image_url, name, type, country, city, year_taken, file_type, 
                          iso, lens, camera, film_roll, color, focal_length, shutter_speed, aperture, width, height)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(dbQuery, [
      uuid,
      image_url,
      name,
      type,
      country,
      city,
      year_taken,
      fileType,
      iso || null,
      lens || null,
      camera,
      film_roll || null,
      color,
      focal_length || null,
      shutter_speed || null,
      aperture || null,
      width,
      height,
    ]);

    res.status(200).json({ 
      message: 'Image link saved successfully.', 
      uuid, 
      width, 
      height,
      image_url 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get all images
export const getAllImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = 'SELECT * FROM images';
    const results = await pool.query(query);

    res.status(200).json({
      message: 'Images retrieved successfully.',
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get paginated images
export const getPaginatedImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 9 } = req.query;

    const offset = (Number(page) - 1) * Number(limit);

    // Retrieve paginated images
    const query = 'SELECT * FROM images ORDER BY created_at DESC LIMIT ? OFFSET ?';
    const results = await pool.query(query, [Number(limit), offset]);

    // Get the total count of images
    const countQuery = 'SELECT COUNT(*) as total FROM images';
    const countResult = await pool.query(countQuery);

    // Handle BigInt for total count
    const total = BigInt(countResult[0].total).toString();

    res.status(200).json({
      message: 'Paginated images retrieved successfully.',
      data: results,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get images by color
export const getImagesByColor = async (
  req: Request<{}, {}, {}, { color: string; page?: string; limit?: string }>, 
  res: Response
): Promise<void> => {
  try {
    const { color, page = '1', limit = '9' } = req.query;

    if (!color) {
      res.status(400).json({ message: 'Color parameter is required.' });
      return;
    }

    const currentPage = Number(page);
    const perPage = Number(limit);
    const offset = (currentPage - 1) * perPage;

    // Query to fetch filtered and paginated images
    const query = `
      SELECT * FROM images
      WHERE color = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    const results = await pool.query(query, [color, perPage, offset]);

    // Query to count total images matching the color filter
    const countQuery = 'SELECT COUNT(*) as total FROM images WHERE color = ?';
    const countResult = await pool.query(countQuery, [color]);

    // Handle BigInt for total count
    const total = BigInt(countResult[0].total).toString();

    res.status(200).json({
      message: 'Images retrieved successfully.',
      data: results,
      total,
      page: currentPage,
      limit: perPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get image by UUID
export const getImageByUuid = async (req: Request, res: Response): Promise<void> => {
  try {
    const { uuid } = req.params;

    const query = 'SELECT * FROM images WHERE uuid = ?';
    const results = await pool.query(query, [uuid]);

    if (results.length === 0) {
      res.status(404).json({ message: 'Image not found.' });
      return;
    }

    res.status(200).json({
      message: 'Image retrieved successfully.',
      data: results[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Update image by UUID
export const updateImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { uuid } = req.params;
    const { 
      name, image_url, type, country, city, year_taken, 
      iso, lens, camera, film_roll, color, focal_length, shutter_speed, aperture 
    } = req.body;

    // Check if the image exists
    const selectQuery = 'SELECT * FROM images WHERE uuid = ?';
    const result = await pool.query(selectQuery, [uuid]);

    if (result.length === 0) {
      res.status(404).json({ message: 'Image not found.' });
      return;
    }

    // Build dynamic update query based on provided fields
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    if (req.body.hasOwnProperty('name')) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (req.body.hasOwnProperty('image_url')) {
      updateFields.push('image_url= ?');
      updateValues.push(image_url);
    }
    if (req.body.hasOwnProperty('type')) {
      updateFields.push('type = ?');
      updateValues.push(type);
    }
    if (req.body.hasOwnProperty('country')) {
      updateFields.push('country = ?');
      updateValues.push(country);
    }
    if (req.body.hasOwnProperty('city')) {
      updateFields.push('city = ?');
      updateValues.push(city);
    }
    if (req.body.hasOwnProperty('year_taken')) {
      updateFields.push('year_taken = ?');
      updateValues.push(year_taken);
    }
    if (req.body.hasOwnProperty('iso')) {
      updateFields.push('iso = ?');
      updateValues.push(iso);
    }
    if (req.body.hasOwnProperty('lens')) {
      updateFields.push('lens = ?');
      updateValues.push(lens);
    }
    if (req.body.hasOwnProperty('camera')) {
      updateFields.push('camera = ?');
      updateValues.push(camera);
    }
    if (req.body.hasOwnProperty('film_roll')) {
      updateFields.push('film_roll = ?');
      updateValues.push(film_roll);
    }
    if (req.body.hasOwnProperty('color')) {
      updateFields.push('color = ?');
      updateValues.push(color);
    }
    if (req.body.hasOwnProperty('focal_length')) {
      updateFields.push('focal_length = ?');
      updateValues.push(focal_length);
    }
    if (req.body.hasOwnProperty('shutter_speed')) {
      updateFields.push('shutter_speed = ?');
      updateValues.push(shutter_speed);
    }
    if (req.body.hasOwnProperty('aperture')) {
      updateFields.push('aperture = ?');
      updateValues.push(aperture);
    }

    if (updateFields.length === 0) {
      res.status(400).json({ message: 'No fields provided to update.' });
      return;
    }

    // Add UUID to the end of updateValues for the WHERE clause
    updateValues.push(uuid);

    // Execute update query
    const updateQuery = `UPDATE images SET ${updateFields.join(', ')} WHERE uuid = ?`;
    await pool.query(updateQuery, updateValues);

    // Return updated image data
    const updatedImageQuery = 'SELECT * FROM images WHERE uuid = ?';
    const updatedResult = await pool.query(updatedImageQuery, [uuid]);

    res.status(200).json({
      message: 'Image updated successfully.',
      data: updatedResult[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Delete image by UUID
export const deleteImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { uuid } = req.params;

    // Check if the image exists
    const selectQuery = 'SELECT image_url FROM images WHERE uuid = ?';
    const result = await pool.query(selectQuery, [uuid]);

    if (result.length === 0) {
      res.status(404).json({ message: 'Image not found.' });
      return;
    }

    // Delete the record from the database
    const deleteQuery = 'DELETE FROM images WHERE uuid = ?';
    await pool.query(deleteQuery, [uuid]);

    res.status(200).json({ message: 'Image deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
