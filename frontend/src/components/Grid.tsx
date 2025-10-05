import React from 'react';

interface ImageProps {
  uuid: string;
  image_url: string;
  name: string;
  type: string;
}

interface GridProps {
  images: ImageProps[];
  onImageClick: (uuid: string) => void;
}

const Grid: React.FC<GridProps> = ({ images, onImageClick }) => {
  return (
    <div className="grid">
      {images.map((image) => (
        <div
          key={image.uuid}
          className="image-card"
          onClick={() => onImageClick(image.uuid)}
        >
          <img src={image.image_url} alt={'photo'} />
        </div>
      ))}
    </div>
  );
};

export default Grid;
