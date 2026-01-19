# Thunderbolts Cricket Team - Comprehensive Fix & Deployment Guide

## 🔧 Problem Summary
The `topPerformer` column in the match stats table is not displaying data and not updating properly. This is likely due to a mismatch between how the frontend sends the field name (camelCase) and how Supabase stores it (snake_case).

## ✅ What Was Fixed

### 1. Backend API (`backend/server.js`)
- ✅ GET `/api/matches` - Now normalizes all `top_performer` → `topPerformer`
- ✅ GET `/api/matches/:id` - Normalizes single match data
- ✅ POST `/api/matches` - Accepts both camelCase and snake_case, saves as `top_performer`
- ✅ PUT `/api/matches/:id` - Updates both field name variations with fallback logic
- ✅ DELETE `/api/matches/:id` - No changes needed (ID-based)

### 2. Frontend Admin Panel (`src/App.jsx`)
- ✅ `loadMatches()` - Uses backend API first, falls back to direct Supabase
- ✅ `updateMatch()` - Uses backend API first, falls back to Supabase with field name conversion
- ✅ `deleteMatch()` - Uses backend API first, falls back to Supabase
- ✅ `addMatch()` - Uses backend API first, falls back to Supabase

## 🚀 Step-by-Step Testing & Deployment

### Step 1: Run Diagnostic
```powershell
cd "e:\Portfolio websites\thunderbolts"
node backend/diagnose.js
```

**Look for:**
- Column names in "COLUMNS DETECTED" section
- Whether `topPerformer` or `top_performer` exists
- Sample data values

### Step 2: Start Backend Server
```powershell
cd "e:\Portfolio websites\thunderbolts"
npm run dev:backend
```

**Expected output:**
```
🚀 Thunderbolts Backend running on http://localhost:5000
```

### Step 3: Test Backend API in New PowerShell Window
```powershell
# Get schema info
Invoke-WebRequest -Uri "http://localhost:5000/api/schema" -UseBasicParsing | ConvertFrom-Json | ConvertTo-Json

# Get all matches
Invoke-WebRequest -Uri "http://localhost:5000/api/matches" -UseBasicParsing | ConvertFrom-Json | ConvertTo-Json | Select-Object -First 50
```

### Step 4: Start Frontend
```powershell
cd "e:\Portfolio websites\thunderbolts"
npm run dev
```

### Step 5: Test Admin Panel
1. Open http://localhost:5173
2. Click "Admin" button
3. Login with:
   - Username: `thunderadmin`
   - Password: `supersecret`
4. Check if matches load with `topPerformer` data
5. Try editing a `topPerformer` value
6. Check browser console (F12 → Console) for logs

### Step 6: Browser Console Debug Checks
Open Developer Tools (F12 → Console) and look for:
- "✅ Matches loaded from API:" - Should show array with `topPerformer` field
- "✅ Match X updated via API" - Should confirm updates worked
- No error messages related to field names

## 📋 Verification Checklist

- [ ] Backend diagnostic shows correct column names
- [ ] Backend server starts without errors
- [ ] API endpoints respond with normalized data (camelCase)
- [ ] Admin panel loads matches with `topPerformer` visible
- [ ] Can edit `topPerformer` value
- [ ] Can delete a match
- [ ] Can add a new match
- [ ] Frontend console shows no errors
- [ ] topPerformer displays in main match table
- [ ] topPerformer is clickable and links to player profile

## 🐛 Troubleshooting

### Issue: topPerformer still not showing
**Solution:**
1. Check `backend/diagnose.js` output for actual column name
2. If column name is different (e.g., `top_performer_name`), update normalizer in backend
3. Restart backend server
4. Clear browser cache (Ctrl+Shift+Delete)

### Issue: Update fails with "column not found"
**Solution:**
1. Check what field name Supabase is using
2. Update the field mapping in backend PUT endpoint
3. Restart backend

### Issue: Backend API not responding
**Solution:**
1. Check if backend is running on port 5000
2. Check `.env` file has correct Supabase credentials
3. Check network: `telnet localhost 5000`
4. Restart backend with: `npm run dev:backend`

## 📦 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder to Vercel/Netlify
# Set environment variables in deployment platform
```

### Backend Deployment (Heroku/Railway)
```bash
# Add Procfile
echo "web: npm start" > Procfile

# Deploy
git push heroku main
```

## 🔐 Environment Variables Required

Frontend (`.env`):
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=https://your-backend-url.com/api
```

Backend (`.env`):
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
PORT=5000
```

## 📊 Expected Data Flow

```
Frontend Admin Panel
        ↓
Backend API (normalizes data)
        ↓
Supabase (stores with snake_case)
        ↓
Backend API (converts back to camelCase)
        ↓
Frontend (displays topPerformer)
```

## ✨ Next Steps

1. Run diagnostic: `node backend/diagnose.js`
2. Start backend: `npm run dev:backend`
3. Start frontend: `npm run dev`
4. Test admin panel thoroughly
5. Fix any remaining issues based on console logs
6. Deploy!
