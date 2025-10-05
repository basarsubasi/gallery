import React, { useState, useEffect } from 'react';
import '../styles/AddPhotoModal.css';
import { updatePhoto } from '../utils/api';

interface EditPhotoModalProps {
  onClose: () => void;
  onSuccess: () => void;
  imageData: any;
}

const EditPhotoModal: React.FC<EditPhotoModalProps> = ({ onClose, onSuccess, imageData }) => {
  const [formData, setFormData] = useState({
    image_url: '',
    name: '',
    type: '',
    country: '',
    city: '',
    year_taken: '',
    iso: '',
    lens: '',
    camera: '',
    film_roll: '',
    color: '',
    focal_length: '',
    shutter_speed: '',
    aperture: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Populate form with existing image data
  useEffect(() => {
    if (imageData) {
      setFormData({
        image_url: imageData.image_url || '',
        name: imageData.name || '',
        type: imageData.type || '',
        country: imageData.country || '',
        city: imageData.city || '',
        year_taken: imageData.year_taken || '',
        iso: imageData.iso || '',
        lens: imageData.lens || '',
        camera: imageData.camera || '',
        film_roll: imageData.film_roll || '',
        color: imageData.color || '',
        focal_length: imageData.focal_length || '',
        shutter_speed: imageData.shutter_speed || '',
        aperture: imageData.aperture || '',
      });
    }
  }, [imageData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await updatePhoto(imageData.uuid, formData);
      console.log('Photo updated successfully:', result);
      onSuccess();
      onClose(); // Close the modal after success
    } catch (err: any) {
      console.error('Error updating photo:', err);
      setError(err.response?.data?.message || err.message || 'Failed to update photo. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="add-photo-modal-overlay" onClick={onClose}>
      <div className="add-photo-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Photo</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="add-photo-form">
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="image_url">image url</label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                required
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Photo name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select a type</option>
                <option value="digital">Digital</option>
                <option value="analog">Analog</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">city</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
              />
            </div>

            <div className="form-group">
              <label htmlFor="year_taken">year</label>
              <input
                type="number"
                id="year_taken"
                name="year_taken"
                value={formData.year_taken}
                onChange={handleChange}
                placeholder="2024"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="camera">camera</label>
              <input
                type="text"
                id="camera"
                name="camera"
                value={formData.camera}
                onChange={handleChange}
                placeholder="Canon AE-1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lens">lens</label>
              <input
                type="text"
                id="lens"
                name="lens"
                value={formData.lens}
                onChange={handleChange}
                placeholder="lens name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="film_roll">film roll</label>
              <input
                type="text"
                id="film_roll"
                name="film_roll"
                value={formData.film_roll}
                onChange={handleChange}
                placeholder="leave empty if digital"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="color">color type</label>
              <select
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
              >
                <option value="">select a color</option>
                <option value="bw">b&w</option>
                <option value="colored">colored</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="iso">ISO</label>
              <input
                type="number"
                id="iso"
                name="iso"
                value={formData.iso}
                onChange={handleChange}
                placeholder="400"
              />
            </div>

            <div className="form-group">
              <label htmlFor="focal_length">focal length</label>
              <input
                type="text"
                id="focal_length"
                name="focal_length"
                value={formData.focal_length}
                onChange={handleChange}
                placeholder="50"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="shutter_speed">shutter speed</label>
              <input
                type="text"
                id="shutter_speed"
                name="shutter_speed"
                value={formData.shutter_speed}
                onChange={handleChange}
                placeholder="1/125"
              />
            </div>

            <div className="form-group">
              <label htmlFor="aperture">aperture</label>
              <input
                type="text"
                id="aperture"
                name="aperture"
                value={formData.aperture}
                onChange={handleChange}
                placeholder="2.8"
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button" disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Photo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPhotoModal;
