# ⚡ THUNDERBOLTS - QUICK REFERENCE GUIDE

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```powershell
cd "e:\Portfolio websites\thunderbolts"
npm install
npm install --prefix backend
```

### Step 2: Configure Environment
Create `.env` in root directory:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Run the Application
**Terminal 1 - Backend:**
```powershell
npm run dev:backend
```

**Terminal 2 - Frontend:**
```powershell
npm run dev
```

Then visit: http://localhost:5173

## 📁 Key Files Quick Reference

| File | Purpose | Edit For |
|------|---------|----------|
| `src/App.jsx` | Main app component | Admin features, players, styling logic |
| `backend/server.js` | Express API | API endpoints, database queries |
| `src/supabase.js` | Supabase config | Database connection |
| `src/Thunderbolts.css` | Styling | Design, colors, layout |
| `.env` | Configuration | Database credentials |

## 🔑 Important Credentials

### Admin Login
- **Username**: `thunderadmin`
- **Password**: `supersecret`
- **Location**: Admin button in header

⚠️ **Change before production!**

### Supabase
- Check `.env` for credentials
- Dashboard: https://app.supabase.com

## 🧪 Testing & Debugging

### Check if Everything Works
```powershell
npm run diagnose      # Check database schema
npm run test:api      # Test all endpoints
```

### Common Commands
```powershell
npm run dev           # Start frontend (port 5173)
npm run dev:backend   # Start backend (port 5000)
npm run build         # Build for production
npm run test:api      # Test all API endpoints
npm run diagnose      # Diagnose database issues
```

## 🐛 Troubleshooting Quick Fixes

### Problem: Backend won't start
```powershell
# Solution 1: Check port 5000 is free
netstat -ano | findstr :5000

# Solution 2: Reinstall dependencies
npm install --prefix backend

# Solution 3: Try different port
$env:PORT=5001; npm run dev:backend
```

### Problem: topPerformer not showing
```powershell
# Solution:
npm run diagnose          # Check column name
npm run dev:backend       # Restart backend
npm run test:api          # Verify API works
# Then refresh browser (Ctrl+Shift+R)
```

### Problem: Database connection error
1. Check `.env` has correct credentials
2. Verify Supabase project exists
3. Run: `npm run diagnose`
4. Check browser console (F12)

## 📊 Database Schema

### Matches Table
```sql
id (int)              -- Primary key
date (text)           -- Match date
opponent (text)       -- Opponent name
runs (text)           -- Runs scored
wickets (text)        -- Wickets taken
result (text)         -- Match result
top_performer (text)  -- Player of the match
```

## 🎯 Admin Panel Features

| Feature | Action | Result |
|---------|--------|--------|
| View Matches | Login to admin | See all matches table |
| Edit Match | Click field, type, press Tab | Updates database |
| Add Match | Click "➕ Add New Match" | New row created |
| Delete Match | Click "Delete" button | Match removed |
| Edit Top Performer | Click field, edit, save | topPerformer updates |

## 🌐 API Endpoints Reference

### Base URL
`http://localhost:5000/api`

### Endpoints
- `GET /health` - Server status
- `GET /schema` - Database schema
- `GET /matches` - All matches (normalized)
- `GET /matches/:id` - Single match
- `POST /matches` - Create match
- `PUT /matches/:id` - Update match
- `DELETE /matches/:id` - Delete match
- `GET /stats` - Team statistics

## 🎨 Styling Quick Reference

### Main Colors
- Primary: `#7c3aed` (Purple)
- Secondary: `#fbbf24` (Gold)
- Dark: `#1f2937` (Dark Gray)
- Light: `#f3f4f6` (Light Gray)

### CSS File
`src/Thunderbolts.css`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚢 Deployment Quick Steps

### Frontend (Vercel)
1. Connect GitHub to Vercel
2. Set `.env` variables in Vercel dashboard
3. Deploy with `npm run build`

### Backend (Railway/Heroku)
1. Create `Procfile`: `web: npm start`
2. Set `.env` variables in platform
3. Push to repository to deploy

## 📝 Quick Customization

### Change Admin Username/Password
Edit `src/App.jsx`:
```javascript
const ADMIN_USERNAME = "your-username";
const ADMIN_PASS = "your-password";
```

### Change Color Scheme
Edit `src/Thunderbolts.css`:
```css
:root {
  --primary: #7c3aed;    /* Purple */
  --secondary: #fbbf24;  /* Gold */
  --dark: #1f2937;       /* Dark */
}
```

### Add New Player
Edit `src/App.jsx` in `players` array:
```javascript
{
  id: 24,
  name: "NEW PLAYER",
  role: "Position",
  bio: "Description",
  photo: "/image.jpg"
}
```

## 🔐 Security Tips

- ✅ Change admin credentials before production
- ✅ Use `.env` for sensitive data
- ✅ Never commit `.env` to git
- ✅ Use Supabase anon key (never secret key)
- ✅ Enable RLS policies on Supabase tables
- ✅ Use HTTPS in production

## 📞 Help & Support

### Debug Steps
1. Open browser console (F12)
2. Check for red error messages
3. Look for API response logs
4. Run `npm run diagnose`
5. Check backend terminal for errors

### Documentation Files
- `FIX_SUMMARY.md` - What was fixed
- `SYSTEM_DOCUMENTATION.md` - Complete system guide
- `DEPLOYMENT_GUIDE.md` - How to deploy
- `TESTING_CHECKLIST.md` - Full testing guide
- `SETUP_GUIDE.md` - Initial setup

## ⚡ Essential Shortcuts

| Shortcut | Action |
|----------|--------|
| `F12` | Open DevTools |
| `Ctrl+Shift+R` | Hard refresh browser |
| `Ctrl+C` | Stop terminal process |
| `npm run dev` | Start frontend |
| `npm run dev:backend` | Start backend |

## 🎉 You're All Set!

Everything is configured and ready to go:
- ✅ Backend API running
- ✅ Frontend displaying
- ✅ Admin panel functional
- ✅ Database connected
- ✅ topPerformer working
- ✅ All CRUD operations working

**Next**: Follow testing checklist or deploy to production!

---

**Quick Help**: Run `npm run diagnose` if anything doesn't work!
