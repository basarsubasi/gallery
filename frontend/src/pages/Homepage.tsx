import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPaginatedImages } from '../utils/api';
import '../styles/Homepage.css';

const Homepage: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(9);
  const navigate = useNavigate();

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetchPaginatedImages(currentPage, limit);
        const { data, total } = response;

        // Calculate total pages
        const totalPages = Math.ceil(total / limit);
        setTotalPages(totalPages);

        const fetchedImages = data.map((image: any) => ({
          ...image,
          imageUrl: image.image_url //fetchImageFileByUUID(image.uuid),
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
            style={{ cursor: 'pointer' }}
          >
            <img
              src={image.imageUrl}
              alt={'photo'}
              loading="eager"
            />
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

export default Homepage;
