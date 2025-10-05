import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchImageByUUID } from '../utils/api';
import EditPhotoModal from '../components/EditPhotoModal';
import '../styles/SingleImagePage.css';

interface MetadataProps {
  label: string;
  value: string | number | null;
}

const MetadataItem: React.FC<MetadataProps> = ({ label, value }) => {
  if (!value) return null; // Don't render if value is null
  return (
    <p>
      <strong>{label}:</strong> {value}
    </p>
  );
};

const SingleImagePage: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const [image, setImage] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const loadImage = async () => {
    try {
      const data = await fetchImageByUUID(uuid!); // Fetch image metadata
      setImage(data.data);
    } catch (error) {
      console.error('Error fetching image metadata:', error);
    }
  };

  useEffect(() => {
    loadImage();
  }, [uuid]);

  const handleEditSuccess = () => {
    // Reload the image data after successful edit
    loadImage();
  };

  const handleDelete = async () => {
    try {
      const API_BASE_ADDRESS = "http://gallerybackend.basarsubasi.com.tr/api";
      const response = await fetch(`${API_BASE_ADDRESS}/images/${uuid}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('gallery_jwt_token')}`,
        },
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Failed to delete photo');
      }

      // Redirect to homepage after successful deletion
      navigate('/');
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Failed to delete photo. Please try again.');
    }
  };

  if (!image) {
    return null;
  }

  // Only calculate imageUrl once the image is available
  const imageUrl = image.image_url //fetchImageFileByUUID(image.uuid);

  return (
    <div className="single-image-page">
      <div className="image-container">
        <img src={imageUrl} alt={'photo'} />
      </div>
      <div className="image-metadata">
        <MetadataItem label="Type" value={image.type} />
        <MetadataItem label="Camera" value={image.camera} />
        <MetadataItem label="Lens" value={image.lens} />
        <MetadataItem label="Film" value={image.film_roll} />
        <MetadataItem label="ISO" value={image.iso} />
        <MetadataItem label="Aperture (f/)" value={image.aperture} />
        <MetadataItem label="Focal Length (mm)" value={image.focal_length} />
        <MetadataItem label="Shutter Speed" value={image.shutter_speed} />

        <MetadataItem label="Year" value={image.year_taken} />
        <MetadataItem label="City" value={image.city} />
        <MetadataItem label="Country" value={image.country} />
        <MetadataItem label="Dimensions" value={`${image.width} x ${image.height}`} />
        
        <div className="image-actions">
          <button className="edit-button" onClick={() => setShowEditModal(true)}>
            Edit
          </button>
          <button className="delete-button" onClick={() => setShowDeleteConfirm(true)}>
            Delete
          </button>
        </div>
      </div>

      {showEditModal && (
        <EditPhotoModal
          onClose={() => setShowEditModal(false)}
          onSuccess={handleEditSuccess}
          imageData={image}
        />
      )}

      {showDeleteConfirm && (
        <div className="delete-confirm-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Photo?</h3>
            <p>Are you sure you want to delete this photo? This action cannot be undone.</p>
            <div className="delete-confirm-actions">
              <button className="cancel-delete-button" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button className="confirm-delete-button" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleImagePage;
