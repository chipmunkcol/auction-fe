# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a full-stack real estate data application with three main components:

- **Root**: Project orchestration with concurrently running frontend and backend
- **Backend**: Express.js API server that fetches Korean government real estate data
- **Frontend**: React + TypeScript + Vite application for data visualization
- **Python**: Jupyter notebooks for data analysis and testing

## Development Commands

### Setup
```bash
# Install all dependencies
npm run install:all

# Install specific parts
npm run install:frontend
npm run install:backend
```

### Development
```bash
# Run both frontend and backend concurrently
npm run dev

# Run individual components
npm run dev:frontend  # Starts Vite dev server on port 3000
npm run dev:backend   # Starts Express server with nodemon on port 8080
```

### Frontend-specific commands
```bash
cd frontend
npm run build         # TypeScript compilation + Vite build
npm run lint          # ESLint linting
npm run preview       # Preview production build
```

### Backend-specific commands
```bash
cd backend
npm start            # Production server
npm run dev          # Development server with nodemon
```

## Architecture

### API Integration
- Backend server (`backend/server.js`) integrates with Korean Government Open API
- Fetches real estate trade data from `apis.data.go.kr/1613000/RTMSDataSvcInduTrade`
- API key is hardcoded in server.js (line 38)

### Frontend-Backend Communication
- Frontend runs on port 3000 (Vite dev server)
- Backend runs on port 8080 (Express server)
- Vite proxy configuration routes `/api/*` requests to backend
- CORS configured for `http://localhost:5173` (default Vite port, but overridden to 3000)

### Data Flow
1. Frontend makes requests to `/api` endpoint
2. Vite proxy forwards to `http://localhost:8080/api`
3. Backend fetches data from Korean government API
4. XML response parsed using `fast-xml-parser`
5. JSON response sent back to frontend

### Technology Stack
- **Frontend**: React 19, TypeScript, Vite, Axios, ESLint
- **Backend**: Express.js, CORS, Axios, fast-xml-parser, Nodemon
- **Development**: Concurrently for running multiple processes

## Key Configuration Files
- `frontend/vite.config.ts`: Proxy configuration for API requests
- `backend/server.js`: API integration and CORS setup
- Root `package.json`: Orchestration scripts for full-stack development