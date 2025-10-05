import React, { useEffect, useState } from 'react';
import { fetchImagesByColor } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Homepage.css';

const ColorPhotos: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(9);
  const navigate = useNavigate();

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetchImagesByColor('colored', currentPage, limit);
        const { data, total } = response;

        const totalPages = Math.ceil(total / limit);
        setTotalPages(totalPages);

    const fetchedImages = data.map((image: any) => ({
                 ...image,
                 imageUrl: image.image_url
               }));
       
               setImages(fetchedImages);
             } catch (error) {
               console.error('Error fetching images:', error);
             }
    };

    loadImages();
  }, [currentPage, limit]);

  const handleImageClick = (uuid: string) => {
    navigate(`/image/${uuid}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="homepage">
      <div className="grid">
        {images.map((image) => (
          <div
            className="grid-item"
            key={image.uuid}
            onClick={() => handleImageClick(image.uuid)}
          >
            <img src={image.imageUrl} alt={'photo'} />
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          &lt;
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ColorPhotos;
