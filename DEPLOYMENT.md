# Deployment Guide for Portfolio AI

## Backend Deployment

### Prerequisites
- Python 3.8+
- pip
- virtualenv

### Setup Steps
1. Clone the repository
2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Environment Variables
Set the following environment variables on your production server:
```bash
PORT=8000  # Or your preferred port
MONGO_URL=your_mongodb_url  # Only needed if using status check endpoints
DB_NAME=portfolio          # Only needed if using status check endpoints
```

### Running in Production
We recommend using Gunicorn with Uvicorn workers:
```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker server:app
```

## Frontend Deployment

### Prerequisites
- Node.js 14+
- Yarn

### Build Steps
1. Install dependencies:
   ```bash
   cd frontend
   yarn install
   ```

2. Set production environment:
   ```bash
   # Create .env.production with:
   REACT_APP_BACKEND_URL=https://api.varicell.com  # Your production API URL
   ```

3. Create production build:
   ```bash
   yarn build
   ```

4. The build folder is ready to be deployed.

### Deployment to varicell.com

#### Backend Deployment
1. Deploy the backend to your API subdomain (e.g., api.varicell.com)
2. Ensure the domain is included in the CORS configuration
3. Set up SSL certificate for HTTPS

#### Frontend Deployment
1. Deploy the contents of the `frontend/build` directory to varicell.com
2. Configure your web server to serve index.html for all routes (for React Router)
3. Set up SSL certificate for HTTPS

### Important Notes
- The portfolio data is stored directly in `server.py` and doesn't require database setup
- Only the status check endpoints use MongoDB, so you can skip MongoDB setup if you don't need those endpoints
- CORS is configured to allow only specific domains
- The API only allows GET requests for security

### Monitoring
- The application includes basic logging configuration
- Monitor the application logs for any issues
- Consider setting up application monitoring (e.g., Sentry) for production

