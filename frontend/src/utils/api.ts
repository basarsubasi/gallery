import axios from 'axios';


// Base URL for the API 
// IMPORTANT -> if you are not using docker
// IMPORTANT -> Change this to "http://localhost:<host-backend-port>/api"
const API_BASE_ADDRESS = "https://gallerybackend.basarsubasi.com.tr/api" // for traefik

export const fetchImages = async (params: Record<string, string | number>) => {
  const response = await axios.get(`${API_BASE_ADDRESS}/images`, { params });
  return response.data;
};

export const fetchImageByUUID = async (uuid: string) => {
  const response = await axios.get(`${API_BASE_ADDRESS}/images/${uuid}`);
  return response.data;
};



export const fetchPaginatedImages = async (page: number, limit: number) => {
  const response = await axios.get(`${API_BASE_ADDRESS}/images/paginated`, { params: { page, limit } });
  return response.data;
};


export const fetchImagesByColor = async (color: string, page: number, limit: number) => {
  const response = await axios.get(`${API_BASE_ADDRESS}/images/by-color`, {
    params: { color, page, limit },
  });
  return response.data;
};

