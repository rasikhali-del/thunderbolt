# 🏏 Thunderbolts Cricket Team - Complete System Documentation

## Overview

The Thunderbolts Cricket Team website is a full-stack web application built with:
- **Frontend**: React + Vite + React Router
- **Backend**: Node.js Express API
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Admin panel with local credentials

## 📁 Project Structure

```
thunderbolts/
├── src/                          # React frontend
│   ├── App.jsx                   # Main app with admin panel
│   ├── Thunderbolts.css          # Styling
│   ├── supabase.js               # Supabase client config
│   ├── api.js                    # API utilities
│   ├── firebase.js               # Firebase config (legacy)
│   └── components/               # React components
│       ├── PlayerCard.jsx
│       ├── PlayerPage.jsx
│       ├── PlayerStatsPage.jsx
│       └── SEO.jsx
├── backend/                      # Node.js Express server
│   ├── server.js                 # Main server file
│   ├── diagnose.js               # Database diagnostic tool
│   ├── test-api.js               # API testing script
│   └── package.json
├── public/                       # Static assets
├── .env                          # Environment variables
├── package.json                  # Frontend dependencies
└── vite.config.js               # Vite config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account with a `matches` table

### Installation

1. **Clone/Download project**
```bash
cd e:\Portfolio\ websites\thunderbolts
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
npm install --prefix backend
```

4. **Configure environment**
Create `.env` file in root:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

**Terminal 1 - Backend:**
```powershell
npm run dev:backend
```

**Terminal 2 - Frontend:**
```powershell
npm run dev
```

Then open http://localhost:5173 in your browser.

## 🔑 Features

### Public Features
- ✅ Team player profiles with photos and bios
- ✅ Match statistics table with runs, wickets, results
- ✅ Top performers calculation
- ✅ Individual player stats pages
- ✅ Chatbot (ThunderBot) for team information
- ✅ Contact form for match scheduling
- ✅ Responsive design (mobile, tablet, desktop)

### Admin Features
- ✅ Secure admin login (username: `thunderadmin`, password: `supersecret`)
- ✅ CRUD operations on match statistics
- ✅ Edit match details (date, opponent, runs, wickets, result, top performer)
- ✅ Add new matches
- ✅ Delete matches
- ✅ View contact messages
- ✅ Clear all messages

## 📊 Database Schema

### Matches Table
| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| date | string | Match date/number |
| opponent | string | Opponent name |
| runs | string | Runs scored |
| wickets | string | Wickets taken |
| result | string | Match result |
| top_performer | string | Player of the match |

**Note**: Field is stored as `top_performer` (snake_case) in Supabase, but the API normalizes it to `topPerformer` (camelCase) for frontend consistency.

## 🔧 API Endpoints

### Base URL: `http://localhost:5000/api`

#### Match Endpoints

**GET /matches**
- Returns all matches with normalized data
- Response: `{ success: true, data: [...] }`

**GET /matches/:id**
- Returns single match by ID
- Response: `{ success: true, data: {...} }`

**POST /matches**
- Creates new match
- Body: `{ id, date, opponent, runs, wickets, result, topPerformer }`
- Response: `{ success: true, data: [...] }`

**PUT /matches/:id**
- Updates match field
- Body: Any match fields to update
- Response: `{ success: true, data: [...] }`

**DELETE /matches/:id**
- Deletes match
- Response: `{ success: true, message: "Match deleted" }`

#### Utility Endpoints

**GET /health**
- Health check
- Response: `{ status: "Backend is running ⚡" }`

**GET /schema**
- Returns table schema and sample data
- Response: `{ columns: [...], sampleData: {...} }`

**GET /stats**
- Returns aggregate statistics
- Response: `{ success: true, stats: {...} }`

## 🧪 Testing & Debugging

### Run Diagnostic
```bash
npm run diagnose
```
Shows actual Supabase table schema and data structure.

### Run API Tests
```bash
npm run test:api
```
Tests all API endpoints to ensure they work correctly.

### Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for logs like:
   - "✅ Matches loaded from API:"
   - "📊 First match structure:"
   - Any errors related to field names

## 🐛 Troubleshooting

### Issue: topPerformer not showing
**Solution:**
1. Run diagnostic: `npm run diagnose`
2. Check if column is `topPerformer` or `top_performer`
3. Restart backend
4. Clear browser cache (Ctrl+Shift+Delete)

### Issue: Backend not starting
**Solution:**
1. Check if port 5000 is available
2. Verify `.env` has correct Supabase credentials
3. Run: `npm install --prefix backend`
4. Try: `npm run dev:backend` instead of direct node

### Issue: Database errors
**Solution:**
1. Verify Supabase credentials in `.env`
2. Check Supabase dashboard for table existence
3. Ensure anon key has table permissions
4. Run: `npm run diagnose` to check connection

## 📤 Deployment

### Frontend Deployment (Vercel)

1. Connect GitHub repo to Vercel
2. Set environment variables:
   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   VITE_API_URL=https://your-backend-url/api
   ```
3. Deploy with `npm run build`

### Backend Deployment (Railway/Heroku)

1. Create `Procfile`:
   ```
   web: npm start
   ```

2. Set environment variables on platform:
   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   PORT=5000
   ```

3. Deploy via git push

## 📝 Admin Login

**URL**: http://localhost:5173 → Click "Admin" button

**Credentials:**
- Username: `thunderadmin`
- Password: `supersecret`

⚠️ **Change these before production!**

## 🔐 Security Notes

- Admin credentials are hardcoded (change before deploying)
- Use environment variables for sensitive data
- Consider implementing JWT authentication for production
- Use Supabase RLS (Row Level Security) policies
- Never expose Supabase secret key (only use anon key)

## 📱 Responsive Design

The application is fully responsive:
- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (2 column layout)
- **Desktop**: > 1024px (full multi-column layout)

## 🎨 Styling

Main CSS: `src/Thunderbolts.css`

Color Scheme:
- Primary: Purple/Violet (#7c3aed)
- Secondary: Gold/Yellow
- Background: Dark gray
- Text: White/Light gray

## 🚦 Development Tips

### Adding a New Match Column
1. Update Supabase table schema
2. Update backend normalization in `/api/matches` endpoint
3. Update Admin table UI in App.jsx
4. Update frontend display in Match Stats section

### Adding a New Player
Edit `players` array in App.jsx with:
```javascript
{
  id: number,
  name: "PLAYER NAME",
  role: "Position",
  bio: "Description",
  photo: "/path-to-image.jpg"
}
```

### Customizing Admin Credentials
Edit in App.jsx:
```javascript
const ADMIN_USERNAME = "your-username";
const ADMIN_PASS = "your-password";
```

## 📞 Support

For issues or questions:
- Check console logs (F12 → Console)
- Run diagnostic tools
- Review this documentation
- Check backend logs in terminal

## 📜 License

This project is private and maintained by Thunderbolts Cricket Team.

---

**Last Updated**: January 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
