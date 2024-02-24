# Django PostGIS React App

A full-stack web application for searching and locating UBS (Unidades Básicas de Saúde - Basic Health Units) in Brazil. The application uses Django REST Framework with PostGIS for geospatial queries and React for the frontend interface.

## Features

- **Search by City**: Search for UBS units by city name or CEP (postal code)
- **Search by Coordinates**: Find the nearest UBS units based on latitude and longitude
- **Distance Calculation**: Automatically calculates and displays the distance to each UBS unit when searching by coordinates
- **Geolocation Support**: Use your current location to find nearby UBS units
- **Google Maps Integration**: Get directions to UBS units via Google Maps links
- **Pagination**: Browse through search results with pagination support

## Tech Stack

### Backend
- **Django 2.1.7** - Python web framework
- **Django REST Framework** - RESTful API
- **PostGIS** - PostgreSQL extension for geospatial data
- **Django CORS Headers** - Handle CORS for API requests
- **Gunicorn** - WSGI HTTP server for production

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Reactstrap** - Bootstrap components for React
- **Axios** - HTTP client
- **Styled Components** - CSS-in-JS styling

### Infrastructure
- **Docker & Docker Compose** - Containerization
- **Nginx** - Reverse proxy and static file server
- **PostgreSQL with PostGIS** - Geospatial database

## Prerequisites

- Docker and Docker Compose installed
- (Optional) Python 3.x and Node.js if running locally without Docker

## Installation

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd django-postgis-react-app
```

2. Create environment file for backend:
```bash
cd backend
cp .env.example .env  # Create .env file if needed
```

Edit `backend/.env` with the following variables:
```env
SECRET_KEY=your-secret-key-here
DB_NAME=hackathon
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=database
DB_PORT=5432
```

3. Build and start the containers:
```bash
cd ..
docker-compose up --build
```

4. Run database migrations:
```bash
docker-compose exec app python manage.py migrate
```

5. (Optional) Load UBS data using the crawler command:
```bash
docker-compose exec app python manage.py crawler
```

### Local Development

#### Backend Setup

1. Install system dependencies (for PostGIS):
```bash
# macOS
brew install postgresql postgis gdal

# Ubuntu/Debian
sudo apt-get install postgresql postgis gdal-bin libgdal-dev
```

2. Create a virtual environment:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables in `backend/.env` (see Docker setup above)

5. Create and migrate the database:
```bash
python manage.py migrate
```

6. Run the development server:
```bash
python manage.py runserver
```

#### Frontend Setup

1. Install Node.js dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Running the Application

### Docker

Access the application at:
- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:8000
- **Database**: localhost:5432

### Local Development

- **Frontend**: http://localhost:5173 (Vite default port)
- **Backend API**: http://localhost:8000

## API Endpoints

### List/Search UBS Units

**GET** `/api/ubs/`

Query Parameters:
- `search` - Search by city name or CEP (e.g., `?search=São Paulo`)
- `lat` - Latitude for distance-based search (e.g., `?lat=-23.5505`)
- `lon` - Longitude for distance-based search (e.g., `?lon=-46.6333`)
- `page` - Page number for pagination (e.g., `?page=2`)

Examples:
```bash
# Search by city
GET /api/ubs/?search=São Paulo

# Find nearest UBS units
GET /api/ubs/?lat=-23.5505&lon=-46.6333

# Paginated results
GET /api/ubs/?page=2
```

### Response Format

```json
{
  "count": 100,
  "next": "http://localhost:8000/api/ubs/?page=2",
  "previous": null,
  "results": [
    {
      "nom_estab": "UBS Example",
      "cod_munic": 3550308,
      "cod_cnes": 1234567,
      "dsc_endereco": "Rua Example, 123",
      "dsc_bairro": "Centro",
      "dsc_cidade": "São Paulo",
      "dsc_telefone": "(11) 1234-5678",
      "co_cep": "01234-567",
      "latitude": -23.5505,
      "longitude": -46.6333,
      "distancia": "2.5"
    }
  ]
}
```

## Project Structure

```
django-postgis-react-app/
├── backend/                 # Django backend
│   ├── hackathon/          # Django project settings
│   ├── ubs/                # UBS app
│   │   ├── models.py       # UBS model with PostGIS PointField
│   │   ├── api.py          # REST API viewsets and serializers
│   │   └── management/     # Management commands
│   │       └── commands/
│   │           └── crawler.py  # Data loading command
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── SearchUbsByCity.tsx
│   │   │   └── SearchUbsByCoordinates.tsx
│   │   ├── api/           # API client
│   │   └── pages/         # Page components
│   └── package.json
├── nginx/                  # Nginx configuration
├── docker-compose.yml      # Docker Compose configuration
└── README.md
```

## Data Loading

The project includes a management command to load UBS data from an external API:

```bash
python manage.py crawler
```

This command fetches UBS data from the API and stores it in the database with geospatial coordinates.

## Development

### Backend Development

- Django admin is available at `/admin/`
- API uses Django REST Framework browsable API
- CORS is enabled for all origins (configure appropriately for production)

### Frontend Development

- Uses Vite for fast development builds
- TypeScript for type safety
- Reactstrap for Bootstrap components

## Production Considerations

Before deploying to production:

1. Set `DEBUG = False` in Django settings
2. Configure proper `ALLOWED_HOSTS`
3. Set up proper CORS configuration
4. Use environment variables for sensitive data
5. Set up proper static file serving
6. Configure SSL/HTTPS
7. Set up proper database backups

## License

[Add your license here]

## Contributing

[Add contributing guidelines here]

## Authors

[Add author information here]
