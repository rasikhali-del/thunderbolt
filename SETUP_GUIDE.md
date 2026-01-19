# Thunderbolts Cricket Team - Complete Setup Guide

## Project Structure
```
thunderbolts/
├── src/                    # React Frontend
│   ├── App.jsx
│   ├── Thunderbolts.css
│   ├── supabase.js        # Supabase client
│   ├── api.js             # Backend API calls
│   └── components/        # React components
├── backend/               # Node.js Express API
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env               # Backend environment variables
├── public/                # Static assets
├── .env                   # Frontend environment variables
└── package.json           # Frontend dependencies
```

## Setup Instructions

### 1. Frontend Setup

```bash
cd thunderbolts
npm install
npm run dev
```

Frontend will run on: `http://localhost:5173`

### 2. Backend Setup

```bash
cd thunderbolts/backend
npm install
npm start
```

Backend will run on: `http://localhost:5000`

### 3. Environment Variables

**Frontend (.env):**
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_API_URL=http://localhost:5000/api
```

**Backend (backend/.env):**
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
PORT=5000
```

### 4. Supabase Setup

Create a table named `matches` in Supabase:

```sql
CREATE TABLE matches (
  id BIGINT PRIMARY KEY,
  date VARCHAR(50),
  opponent VARCHAR(255),
  runs VARCHAR(50),
  wickets VARCHAR(50),
  result VARCHAR(50),
  topPerformer VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

Insert initial data using the SQL provided in the backend README.

## API Endpoints

### Base URL
`http://localhost:5000/api`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Check server status |
| GET | `/matches` | Get all matches |
| GET | `/matches/:id` | Get match by ID |
| POST | `/matches` | Create new match |
| PUT | `/matches/:id` | Update match |
| DELETE | `/matches/:id` | Delete match |
| GET | `/stats` | Get team statistics |

## Features

### Frontend
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Supabase Integration for Match Stats
- ✅ Chatbot with Match Information
- ✅ Player Profiles
- ✅ Admin Panel for Match Management
- ✅ Contact Form
- ✅ Modern UI with Gradients & Animations

### Backend
- ✅ Express.js REST API
- ✅ Supabase Database Integration
- ✅ CRUD Operations for Matches
- ✅ Statistics Calculation
- ✅ Error Handling & Logging
- ✅ CORS Support

## Running Both Together

### Option 1: In Separate Terminals
```bash
# Terminal 1 - Frontend
cd thunderbolts
npm run dev

# Terminal 2 - Backend
cd thunderbolts/backend
npm start
```

### Option 2: Concurrently (Install concurrently package)
```bash
npm install -D concurrently

# In main package.json scripts:
"dev": "concurrently \"npm run dev\" \"npm -C backend start\""
```

## Deployment

### Frontend (Vercel/Netlify)
1. Push to GitHub
2. Connect to Vercel/Netlify
3. Set environment variables
4. Deploy

### Backend (Heroku/Railway)
1. Push to GitHub
2. Connect to hosting platform
3. Set environment variables
4. Deploy

## Troubleshooting

### Backend not connecting
- Check if backend server is running on port 5000
- Verify VITE_API_URL in frontend .env
- Check CORS settings in backend

### Supabase connection issues
- Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
- Check Supabase project credentials
- Ensure table exists in database

### Port already in use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

## Tech Stack

- **Frontend**: React 18, Vite, React Router, React Helmet
- **Backend**: Node.js, Express.js, CORS
- **Database**: Supabase (PostgreSQL)
- **Styling**: CSS3 with Gradients & Modern Design
- **Authentication**: Supabase Auth (Optional)

## Support

For issues or questions, contact: **thunderboltscc@gmail.com**

---

**Thunderbolts Cricket Team** ⚡ - Power. Passion. Precision.
