# 🧪 Thunderbolts Testing Checklist

## Pre-Testing Setup

- [ ] All dependencies installed: `npm install && npm install --prefix backend`
- [ ] `.env` file configured with Supabase credentials
- [ ] Backend can connect to Supabase (run diagnostic first)
- [ ] No port 5000 conflicts
- [ ] Git repository clean (no uncommitted changes)

## Phase 1: Backend Testing

### 1.1 Diagnostic Test
```powershell
npm run diagnose
```
- [ ] Shows "TOPPERFORMER FIELD CHECK" section
- [ ] Clearly identifies column name (`topPerformer` or `top_performer`)
- [ ] Shows sample data from first record
- [ ] No connection errors

### 1.2 Backend Startup
```powershell
npm run dev:backend
```
- [ ] Shows "🚀 Thunderbolts Backend running on http://localhost:5000"
- [ ] No error messages
- [ ] Server stays running

### 1.3 API Testing (New PowerShell window)
```powershell
npm run test:api
```
- [ ] All tests marked with ✅
- [ ] Shows correct number of matches loaded
- [ ] Displays topPerformer value (not null/undefined)
- [ ] No connection errors

### 1.4 Manual Health Check
```powershell
curl http://localhost:5000/api/health
```
- [ ] Returns: `{"status":"Backend is running ⚡"}`

## Phase 2: Frontend Testing

### 2.1 Frontend Startup (New PowerShell window)
```powershell
npm run dev
```
- [ ] Shows "VITE v..." and local URL (http://localhost:5173)
- [ ] No compilation errors
- [ ] Browser opens automatically

### 2.2 Home Page
- [ ] Hero section displays correctly
- [ ] All navigation links work
- [ ] Team photos load
- [ ] No console errors (F12 → Console)

### 2.3 Match Stats Display
Scroll to "Match Stats" section:
- [ ] Table displays all matches
- [ ] "Opponent" column has data
- [ ] "Top Performer" column displays data (not blank)
- [ ] Data looks complete and correct

### 2.4 Player Profiles
- [ ] Can click on player cards
- [ ] Individual player pages load
- [ ] Player stats display correctly

## Phase 3: Admin Panel Testing

### 3.1 Admin Login
- [ ] Click "Admin" button in header
- [ ] Enter username: `thunderadmin`
- [ ] Enter password: `supersecret`
- [ ] Click Login
- [ ] Successfully logged in

### 3.2 Admin Dashboard Loads
- [ ] "Match Stats Management" section visible
- [ ] "Add New Match" button present
- [ ] Match table displays with columns:
  - [ ] ID
  - [ ] Date
  - [ ] Opponent
  - [ ] Runs
  - [ ] Wickets
  - [ ] Result
  - [ ] Top Performer
  - [ ] Actions (Delete button)

### 3.3 Verify topPerformer Data
- [ ] Click on first match's "Top Performer" field
- [ ] See current value (e.g., "81 Runs")
- [ ] Field is editable (not grayed out)

### 3.4 Edit topPerformer
- [ ] Click on Top Performer input for match ID 1
- [ ] Clear the field
- [ ] Type: "50 Runs"
- [ ] Press Tab or click elsewhere
- [ ] Check browser console for: "✅ Match 1 updated via API"
- [ ] Value persists (not reset to original)
- [ ] Refresh page
- [ ] New value still there (confirmed in database)

### 3.5 Edit Other Fields
Test editing each field:
- [ ] Date: Change to "Test Date" → Save
- [ ] Opponent: Change to "Test Opponent" → Save
- [ ] Runs: Change to "999" → Save
- [ ] Wickets: Change to "5" → Save
- [ ] Result: Change to "5-20" → Save

All changes should:
- [ ] Show API success message in console
- [ ] Update immediately in table
- [ ] Persist after page refresh

### 3.6 Add New Match
- [ ] Click "➕ Add New Match" button
- [ ] New row appears at bottom
- [ ] New row has ID (max + 1)
- [ ] All fields are empty (or default "-")
- [ ] Can edit new match fields
- [ ] Changes persist after refresh

### 3.7 Delete Match
- [ ] Click Delete button on any match
- [ ] Confirmation dialog appears
- [ ] Click OK
- [ ] Row disappears from table
- [ ] Check console for success message
- [ ] Refresh page
- [ ] Match still deleted (confirmed in database)

### 3.8 Contact Messages Section
- [ ] Contact messages display (if any exist)
- [ ] Can delete individual messages
- [ ] "Clear All Messages" button works

### 3.9 Admin Controls
- [ ] "Refresh Messages" button works
- [ ] "Clear All Messages" button works (with confirmation)
- [ ] "Back to Site" button returns to main page

## Phase 4: Main Page Verification After Admin Changes

### 4.1 Check Updated Data
After making admin changes:
- [ ] Go back to main page
- [ ] Scroll to Match Stats
- [ ] All edits from admin panel are visible
- [ ] New matches appear in table
- [ ] Deleted matches are gone
- [ ] Top Performer column shows updated values

### 4.2 Top Performers Calculation
- [ ] "Top Performers" section exists below match table
- [ ] Shows "Most Runs" performer
- [ ] Shows "Most Wickets" performer
- [ ] Names match player profiles (if applicable)

### 4.3 Clickable Links
- [ ] Click on opponent name in match row → Goes to player page (if exists)
- [ ] Click on top performer name → Goes to player page (if exists)

## Phase 5: Console & Error Checking

### 5.1 Browser Console (F12 → Console)
- [ ] No red error messages
- [ ] No warning about undefined properties
- [ ] See expected debug logs:
  - [ ] "✅ Matches loaded from API:"
  - [ ] "📊 First match structure:"
  - [ ] API operation messages

### 5.2 Backend Terminal Logs
- [ ] No red error messages
- [ ] API requests logged
- [ ] Database operations logged
- [ ] No "undefined" or "null" errors

### 5.3 Network Tab (F12 → Network)
- [ ] API calls to `/api/matches` return 200
- [ ] Response includes `topPerformer` field
- [ ] No failed requests (red)

## Phase 6: Edge Cases & Error Handling

### 6.1 Empty/Null Values
- [ ] If match has no top performer, shows "-" (not blank)
- [ ] If runs/wickets are "-", display correctly
- [ ] No console errors on empty data

### 6.2 Special Characters
- [ ] Edit field with special characters: "Test's Performer™"
- [ ] Save successfully
- [ ] Display correctly (not corrupted)
- [ ] Persist correctly

### 6.3 Long Values
- [ ] Edit field with very long text (50+ chars)
- [ ] Save successfully
- [ ] Display in table without breaking layout
- [ ] Can still see other columns

### 6.4 Database Connection Loss
- [ ] Temporarily disconnect internet or stop backend
- [ ] Try to edit match
- [ ] See error message (not frozen)
- [ ] Reconnect/restart
- [ ] Can edit again

## Phase 7: Data Integrity

### 7.1 Verify Supabase Data
Log in to Supabase dashboard:
- [ ] Go to `matches` table
- [ ] Check all fields updated correctly
- [ ] Column names are consistent (all snake_case in DB)
- [ ] No duplicate records created
- [ ] Deleted records are gone

### 7.2 Count Verification
- [ ] Admin table count matches Supabase count
- [ ] No orphaned records
- [ ] IDs are sequential (no gaps unless deleted)

## Phase 8: Performance

- [ ] Page loads within 2 seconds
- [ ] Admin panel loads within 1 second
- [ ] Edits save within 1 second
- [ ] No visible lag when typing
- [ ] Table scrolls smoothly

## Phase 9: Mobile Responsiveness

Open on mobile device or DevTools device mode:
- [ ] Header is responsive
- [ ] Navigation menu collapses
- [ ] Match table scrolls horizontally (or stacks)
- [ ] Admin panel is usable on mobile
- [ ] Can edit matches on mobile
- [ ] No layout breakage

## Final Verification

- [ ] All tests above passed ✅
- [ ] No outstanding console errors
- [ ] Admin panel fully functional
- [ ] Data persists across sessions
- [ ] Application ready for deployment

## Sign-Off

**Tested By**: _________________
**Date**: _________________
**Result**: ✅ Pass / ❌ Fail / ⚠️ Issues Found

**Issues Found** (if any):
```
1. 
2. 
3. 
```

**Resolution**:
```


```

---

## Quick Test Command Sequence

Run all tests in order:

```powershell
# Terminal 1: Run diagnostic
npm run diagnose

# Terminal 2: Start backend
npm run dev:backend

# Terminal 3: Run API tests
npm run test:api

# Terminal 4: Start frontend
npm run dev

# Then:
# 1. Open http://localhost:5173
# 2. Click Admin, login
# 3. Edit matches and verify
# 4. Check console for errors
# 5. Refresh and verify persistence
```

Expected result: All green ✅ No red ❌
