import express from 'express';
import {
  createImage,
  getAllImages,
  getPaginatedImages,
  getImagesByColor,
  getImageByUuid,
  updateImage,
  deleteImage
} from '../api/imagesController';
import { verifyJWT } from '../middleware/authMiddleware';

const router = express.Router();

// POST /api/images - Create a new image
router.post('/', verifyJWT, createImage);

// GET /api/images - Get all images
router.get('/', getAllImages);

// GET /api/images/paginated - Get paginated images
router.get('/paginated',  getPaginatedImages);

// GET /api/images/by-color - Get images by color
router.get('/by-color', getImagesByColor);

// GET /api/images/:uuid - Get image by UUID
router.get('/:uuid', getImageByUuid);

// PUT /api/images/:uuid - Update image by UUID
router.put('/:uuid', verifyJWT, updateImage);

// DELETE /api/images/:uuid - Delete image by UUID
router.delete('/:uuid', verifyJWT, deleteImage);

export default router;
