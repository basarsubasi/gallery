# Gallery

This is the source code of my gallery website on https://gallery.basarsubasi.com.tr

You are very welcome to fork it and make it yours as well!

## 🏗️ Project Structure

```
gallery/
├── backend/                     # Express.js API server (Node.js + TypeScript)
│   └── Dockerfile
│
├── frontend/                    # Public gallery interface (React.js + TypeScript)
│   └── Dockerfile
│
│
│
├── interface/                   # Admin interface for photo management (React.js + TypeScript)
│   └─ Dockerfile
│
│
├── traefik/                     # Reverse proxy configuration
│   └── docker-compose.yaml.example
│
├── docker-compose.yaml.example  # Main Docker Compose configuration
└── .env.example                 # Environment variables template
```

## 🚀 Features

### Frontend (Gallery)
- **Homepage**: Main gallery landing page
- **Color Photos**: Display color photographs
- **Black & White Photos**: Display black and white photographs
- **Single Image Page**: Detailed view of individual photos
- **Responsive Grid Layout**: Photo grid display

### Interface (Admin Panel)
- **Authentication**: JWT-based login system
- **Photo Upload**: Add new photos with metadata
- **Photo Management**: Edit and delete existing photos


## 🛠️ Technology Stack

- **Backend**: Node.js , Express.js, TypeScript
- **Frontend**: React.js, Vite, TypeScript
- **Database**: MariaDB
- **Authentication**: JWT (JSON Web Tokens)
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Traefik (optional)

## 📋 Prerequisites

- Docker and Docker Compose installed
- Git for cloning the repository

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/basarsubasi/gallery.git
cd gallery
```

### 2. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` with your preferred values

### 3. Docker Compose Setup

Copy the Docker Compose example file:

```bash
cp docker-compose.yaml.example docker-compose.yaml
```

## 🐳 Deployment Options

### Option 1: Deploy with Traefik (Recommended way)

1. **Build & Deploy the Gallery Services:**
```bash
docker-compose up -d --build
```

2. **Deploy Traefik:**
```bash
cd traefik
cp docker-compose.yaml.example docker-compose.yaml
docker-compose up -d
```

**Access the services:**
- Public Gallery: `http://gallery.localhost`
- Admin Interface: `http://galleryinterface.localhost`
- Backend API: `http://gallerybackend.localhost`


### Option 2: Deploy without Traefik (Development/Simple Setup)

1. **Modify your docker-compose.yaml:**
   - Uncomment the `ports` sections for each service (maybe except for database)
   - Comment out or remove the `labels` sections
   - Remove the `networks` sections

2. **Update API configurations:**
   
   Edit `frontend/src/utils/api.ts` and `interface/src/utils/api.ts` to point to your backend URL:
   ```typescript
   const API_BASE_URL = 'http://localhost:6767'; // or your server IP:Port
   ```

3. **Build & Deploy:**
```bash
docker-compose up -d --build
```

**Access URLs:**
- Public Gallery: `http://localhost:6769`
- Admin Interface: `http://localhost:6770`
- Backend API: `http://localhost:6767`

## 🔧 Development Setup

### Backend Development

```bash
cd backend
npm install
npm run dev
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Interface Development

```bash
cd interface
npm install
npm run dev
```

## 📊 Database

The application uses MariaDB with automatic database initialization. The database schema is created automatically when the backend starts for the first time.

Be aware that MariaDB is only used for storing metadata of the pictures, you need to provide an accessible image URL for gallery to display the image.

## 🌐 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `GET /auth/verify` - Verify JWT token

### Images
- `GET /images` - Get all images
- `GET /images/:id` - Get a single image with all its details
- `POST /images` - Add new image to gallery (requires auth)
- `PUT /images/:id` - Update image details (requires auth)
- `DELETE /images/:id` - Delete image (requires auth)

## 📝 Configuration Notes

### CORS Configuration
The backend is configured to accept requests from all domains by default, if you want to restrict it to specific domains. Update the CORS configuration in `backend/src/app.ts` for your domains:

```typescript
app.use(cors({
  origin: ['https://your-gallery-domain.com', 'https://your-admin-domain.com'],
  // ... other CORS options..
}));
```
