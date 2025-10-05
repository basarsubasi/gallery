import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchImageByUUID } from '../utils/api';
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
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const data = await fetchImageByUUID(uuid!); // Fetch image metadata
        setImage(data.data);
      } catch (error) {
        console.error('Error fetching image metadata:', error);
      }
    };
    loadImage();
  }, [uuid]);

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
      </div>
    </div>
  );
};

export default SingleImagePage;
