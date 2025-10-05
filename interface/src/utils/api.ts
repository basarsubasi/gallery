import axios from 'axios';


// Base URL for the API 
// IMPORTANT -> if you are not using docker
// IMPORTANT -> Change this to "http://localhost:<host-backend-port>/api"
const API_BASE_ADDRESS = "https://gallerybackend.basarsubasi.com.tr/api" // for traefik

// Token storage utilities
const TOKEN_KEY = 'gallery_jwt_token';
const TOKEN_EXPIRY_KEY = 'gallery_jwt_expiry';

export const setToken = (token: string) => {
  const expiryTime = Date.now() + (6 * 60 * 60 * 1000); // 6 hours from now
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
};

export const getToken = (): string | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  
  if (!token || !expiry) {
    return null;
  }
  
  // Check if token is expired
  if (Date.now() > parseInt(expiry)) {
    clearToken();
    return null;
  }
  
  return token;
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};

// Configure axios interceptor to add Authorization header
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

// Authentication functions
export const authenticateWithApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    console.log('Attempting authentication with API key...');
    const response = await axios.post(`${API_BASE_ADDRESS}/auth`, null, {
      headers: {
        'x-api-key': apiKey,
      },
    });
    
    if (response.status === 200 && response.data.token) {
      console.log('Authentication successful, storing token');
      setToken(response.data.token);
      return true;
    }
    
    return false;
  } catch (error: any) {
    console.error('Authentication failed:', error.response?.status, error.response?.data);
    return false;
  }
};

export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const token = getToken();
    
    if (!token) {
      console.log('No token found in localStorage');
      return false;
    }
    
    console.log('Checking authentication status with token...');
    // Check if we have a valid JWT token by calling the auth check endpoint
    await axios.get(`${API_BASE_ADDRESS}/auth/check`);
    console.log('Authentication check: authenticated');
    return true;
  } catch (error: any) {
    console.log('Authentication check: not authenticated', error.response?.status);
    clearToken(); // Clear invalid token
    return false;
  }
};

export const logout = () => {
  clearToken();
};
