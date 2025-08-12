# Keyboard Statistics Tracker

A real-time keyboard statistics tracking application built with React.js frontend and NestJS backend. The application captures keyboard events via WebSocket, stores data in PostgreSQL database, and displays live analytics including key frequency, typing speed, and visual keyboard heatmaps.

## 🏗️ Project Structure

```
test-prog-genius/
├── client/          # React.js
├── server/           # NestJS API with WebSocket support
├── docker-compose.yml # PostgreSQL database setup
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose

### 1. Clone and Install Dependencies

```bash
# Install all dependencies
pnpm install
```

### 2. Start PostgreSQL Database

```bash
# Start PostgreSQL container
docker-compose --env-file ./server/.env up -d

# Verify database is running
docker-compose --env-file ./server/.env ps
```

### 3. Start the Application

```bash
# Start both frontend and backend in development mode
pnpm dev
```

This will start:
- **Frontend**: http://localhost:3000 (React.js with Vite)
- **Backend**: http://localhost:3001 (NestJS API with WebSocket)

## 🛠️ Development Setup

### Database Setup

The application uses PostgreSQL running in Docker. The database configuration is:

- **Host**: localhost:5432
- **Database**: keyboard_stats
- **User**: keyboard_user
- **Password**: keyboard_password

### Environment Configuration

Backend environment variables are configured in `server/.env`:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=keyboard_stats
DATABASE_USER=keyboard_user
DATABASE_PASSWORD=keyboard_password

# OPTIONAL
PORT=3001
NODE_ENV=development
```

### Individual Package Commands

#### Frontend (React.js)
```bash
cd client
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm preview  # Preview production build
```

#### Backend (NestJS)
```bash
cd server
pnpm start:dev  # Start development server
pnpm build      # Build for production
pnpm start:prod # Start production server
```

## 🔧 Database Management

### Start Database
```bash
docker-compose --env-file ./server/.env up -d
```

### Stop Database
```bash
docker-compose --env-file ./server/.env down
```

### Reset Database (removes all data)
```bash
docker-compose --env-file ./server/.env down -v
docker-compose --env-file ./server/.env up -d
```

### View Database Logs
```bash
docker-compose --env-file ./server/.env logs postgres
```

## 📊 Features

- **Real-time Keyboard Tracking**: Captures all keyboard events (excluding input fields)
- **WebSocket Communication**: Instant data synchronization between client and server
- **Live Statistics Display**: 
  - Key frequency charts
  - Typing speed calculations
  - Visual keyboard heatmap
  - Recent activity logs
- **SEO Optimization**: Server-side rendering support for search engines
- **Responsive Design**: Works on desktop and mobile devices
- **Database Persistence**: All statistics stored in PostgreSQL

## 🏭 Production Deployment

### Build for Production
```bash
pnpm build
```

### Environment Variables for Production
Update `server/.env` with production database credentials and set:
```env
NODE_ENV=production
DATABASE_HOST=your-production-db-host
DATABASE_PASSWORD=your-secure-password
```

## 📝 API Documentation

### WebSocket Events

- **Connection**: `ws://localhost:3001`
- **Send Key Press**: `keyPress` event with `{ key: string, timestamp: number }`
- **Receive Statistics**: `statisticsUpdate` event with current stats

### REST Endpoints

- **GET /keyboard/statistics**: Get current keyboard statistics
- **GET /keyboard/statistics/ssr**: Get SEO-optimized HTML with statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure they pass
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
