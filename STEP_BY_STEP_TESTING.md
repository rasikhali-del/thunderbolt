# ▶️ STEP-BY-STEP TESTING GUIDE

## 🎯 Goal
Verify that topPerformer column displays and updates correctly in the admin panel.

---

## 📝 Prerequisites

- Node.js 18+ installed
- `.env` file configured with Supabase credentials
- Port 5000 and 5173 are free

---

## 🚀 STEP 1: Diagnostic Check (2 minutes)

### 1.1 Open PowerShell
```powershell
cd "e:\Portfolio websites\thunderbolts"
```

### 1.2 Run Diagnostic
```powershell
npm run diagnose
```

### 1.3 Expected Output
```
🔍 THUNDERBOLTS SUPABASE DIAGNOSTIC

==================================================

✅ COLUMNS DETECTED:
  1. id (number): 1
  2. date (string): "1"
  3. opponent (string): "Rasikh Ali"
  4. runs (string): "870"
  5. wickets (string): "51"
  6. result (string): "5-22"
  7. topPerformer (string): "81 Runs"

📄 FIRST RECORD (FULL):
{...full data...}

🔎 TOPPERFORMER FIELD CHECK:
  Has "topPerformer": true
  Has "top_performer": false
  Has variant: NO
  ✅ Use camelCase: topPerformer = "81 Runs"
```

**✅ PASS IF:**
- Shows "TOPPERFORMER FIELD CHECK" section
- Clearly identifies the column name
- No connection errors

---

## 🔧 STEP 2: Backend Startup (1 minute)

### 2.1 Open First PowerShell Window
Keep the first one open or open new one.

### 2.2 Start Backend
```powershell
npm run dev:backend
```

### 2.3 Expected Output
```
🚀 Thunderbolts Backend running on http://localhost:5000
```

**✅ PASS IF:**
- Shows running message
- No error messages
- Terminal stays open

**⏸️ Keep this running in the background**

---

## 🧪 STEP 3: API Testing (2 minutes)

### 3.1 Open Second PowerShell Window
(Keep backend running in first window)

### 3.2 Test All Endpoints
```powershell
npm run test:api
```

### 3.3 Expected Output
```
🧪 THUNDERBOLTS API TEST SUITE

==================================================

✓ Test 1: Health Check
  Response: { status: 'Backend is running ⚡' }

✓ Test 2: Get Schema
  Columns: id, date, opponent, runs, wickets, result, topPerformer
  Sample topPerformer: 81 Runs

✓ Test 3: Get All Matches
  ✅ Loaded 23 matches
  First match ID: 1
  First match topPerformer: 81 Runs

✓ Test 4: Get Single Match (ID: 1)
  ✅ Opponent: Rasikh Ali
  ✅ topPerformer: 81 Runs

✓ Test 5: Get Statistics
  ✅ Total Matches: 23
  ✅ Total Runs: 12345
  ✅ Total Wickets: 567

==================================================
✅ All tests completed!
```

**✅ PASS IF:**
- All 5 tests show ✓ (checkmark)
- topPerformer shows data (not null/undefined)
- No error messages

---

## 💻 STEP 4: Frontend Startup (1 minute)

### 4.1 Open Third PowerShell Window
(Keep backend and tests completed in other windows)

### 4.2 Start Frontend
```powershell
npm run dev
```

### 4.3 Expected Output
```
VITE v5.1.7  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  Press h to show help
```

**✅ PASS IF:**
- Shows local URL
- No error messages
- Browser may open automatically

---

## 🌐 STEP 5: Website Verification (2 minutes)

### 5.1 Open Browser
If not already open, visit: http://localhost:5173

### 5.2 Check Main Page
- [ ] Hero section displays
- [ ] Navigation menu works
- [ ] No console errors

### 5.3 Scroll to "Match Stats"
Look for the table with columns:
- No | Opponent | Runs | Wickets | Result | **Top Performer**

### 5.4 Check Top Performer Column
- [ ] Column header visible: "Top Performer"
- [ ] Data shows in column (e.g., "81 Runs")
- [ ] Not blank or "undefined"

**✅ PASS IF:**
- All boxes checked
- topPerformer column has visible data

---

## 🔐 STEP 6: Admin Login (1 minute)

### 6.1 Click "Admin" Button
In top-right of page header

### 6.2 Login Form Appears
Enter credentials:
- Username: `thunderadmin`
- Password: `supersecret`

### 6.3 Click Login
- [ ] Form submits
- [ ] Page changes to admin dashboard
- [ ] No errors shown

---

## 📊 STEP 7: Admin Dashboard Verification (2 minutes)

### 7.1 Check Admin Layout
Look for:
- [ ] "Admin Panel" heading
- [ ] "Match Stats Management" section
- [ ] "➕ Add New Match" button
- [ ] Match table with columns

### 7.2 Verify Match Table
Table should have columns:
- [ ] ID
- [ ] Date
- [ ] Opponent
- [ ] Runs
- [ ] Wickets
- [ ] Result
- [ ] **Top Performer** ← IMPORTANT
- [ ] Actions (Delete button)

### 7.3 Check topPerformer Column
Look at first match row:
- [ ] Column is visible
- [ ] Shows data (e.g., "81 Runs")
- [ ] Not blank or grayed out
- [ ] Input field is editable

**✅ PASS IF:**
- topPerformer column visible
- Shows data for all matches

---

## ✏️ STEP 8: Edit topPerformer Test (3 minutes)

### 8.1 Find First Match
Look for ID = 1 (Rasikh Ali)

### 8.2 Click on topPerformer Input
In the "Top Performer" column for ID 1

### 8.3 Clear the Current Value
- Select all text (Ctrl+A)
- Delete it

### 8.4 Type New Value
```
Test Value - 100 Runs
```

### 8.5 Press Tab or Click Elsewhere
Field should trigger update

### 8.6 Check Browser Console (F12)
- [ ] See message: "✅ Match 1 updated via API"
- [ ] No red error messages
- [ ] Field value updated on screen

### 8.7 Refresh Page (F5)
After refresh:
- [ ] Admin panel loads
- [ ] New value still shows: "Test Value - 100 Runs"
- [ ] Confirmed saved to database ✅

**✅ PASS IF:**
- Field value changed
- Console shows success message
- Value persists after refresh

---

## ➕ STEP 9: Add New Match Test (2 minutes)

### 9.1 Click "➕ Add New Match" Button
Near top of match table

### 9.2 Verify New Row
New row should appear at bottom of table:
- [ ] Has new ID (highest ID + 1)
- [ ] All fields empty or "-"
- [ ] Editable (can click fields)

### 9.3 Edit New Match
- Click Date field, type: "Today"
- Click Opponent field, type: "Test Team"
- Click topPerformer field, type: "50 Runs"

### 9.4 Press Tab After Each Entry
Fields should auto-save

### 9.5 Refresh Page (F5)
- [ ] New match still exists
- [ ] All edits persisted
- [ ] Confirmed in database ✅

**✅ PASS IF:**
- Can add new match
- Edits persist after refresh

---

## 🗑️ STEP 10: Delete Match Test (1 minute)

### 10.1 Find the Test Match
Look for the match you just added

### 10.2 Click Delete Button
In Actions column of that match row

### 10.3 Confirm Deletion
Click "OK" in confirmation dialog

### 10.4 Verify Deletion
- [ ] Row disappears from table
- [ ] Console shows delete message

### 10.5 Refresh Page (F5)
- [ ] Match is still gone
- [ ] Confirmed deleted from database ✅

**✅ PASS IF:**
- Match deleted
- Deletion persists after refresh

---

## 🎯 STEP 11: Final Verification (2 minutes)

### 11.1 Return to Main Page
Click "Back to Site" or home link

### 11.2 Scroll to Match Stats
Check main page display:
- [ ] All matches visible
- [ ] topPerformer column shows
- [ ] New matches appear
- [ ] Deleted matches gone
- [ ] Edited values show

### 11.3 Check "Top Performers" Section
Below match table:
- [ ] Shows top run scorer
- [ ] Shows top wicket taker
- [ ] Data makes sense

**✅ PASS IF:**
- All admin changes visible on main page
- No data lost or corrupted

---

## 🐛 STEP 12: Console Check (1 minute)

### 12.1 Open Browser Console
Press F12 → Select "Console" tab

### 12.2 Look for Messages
Should see logs like:
```
✅ Matches loaded from API:
📊 First match structure:
✅ Match 1 updated via API
```

### 12.3 Check for Errors
- [ ] No red error messages
- [ ] No "undefined" warnings
- [ ] No network errors

**✅ PASS IF:**
- See expected logs
- No red errors

---

## 📱 STEP 13: Mobile Responsiveness Test (2 minutes)

### 13.1 Resize Browser
Press F12 → Click mobile icon (top-left)

### 13.2 Select Mobile Device
Simulate iPhone or Android

### 13.3 Test Admin Panel
- [ ] Can see match table (scrolls horizontally)
- [ ] Can edit fields
- [ ] Can tap Add/Delete buttons
- [ ] Layout doesn't break

**✅ PASS IF:**
- Admin panel works on mobile
- Layout is responsive

---

## ✅ FINAL CHECKLIST

Mark each as complete:

### Backend Tests
- [ ] Diagnostic runs successfully
- [ ] Backend starts without errors
- [ ] API tests all pass
- [ ] topPerformer shows in API response

### Frontend Tests
- [ ] Website loads without errors
- [ ] Match stats table displays
- [ ] topPerformer column visible
- [ ] topPerformer has data

### Admin Tests
- [ ] Can login with credentials
- [ ] Admin panel displays
- [ ] Can see topPerformer column
- [ ] Can edit topPerformer
- [ ] Changes persist after refresh

### Data Integrity Tests
- [ ] New matches stay after refresh
- [ ] Deleted matches stay deleted
- [ ] Edited fields persist
- [ ] No data corruption

### Console & Performance
- [ ] No red error messages
- [ ] Expected debug logs show
- [ ] Page loads in ~2 seconds
- [ ] Updates happen in ~1 second

### Mobile Tests
- [ ] Mobile layout responsive
- [ ] Admin panel works on mobile
- [ ] Touch interactions work

---

## 📊 Results Summary

### If Everything ✅ PASSED:

**Congratulations!** 🎉

The Thunderbolts website is working perfectly:
- ✅ topPerformer displays correctly
- ✅ Admin CRUD operations work
- ✅ Data persists in database
- ✅ No errors or issues
- **Status**: READY FOR PRODUCTION

### If Something ❌ FAILED:

**Check these:**

1. **Diagnostic fails**
   - Verify `.env` has correct Supabase credentials
   - Check internet connection
   - Restart backend

2. **API tests fail**
   - Backend might not be running
   - Check port 5000 is free
   - Review backend terminal for errors

3. **Admin panel doesn't save**
   - Check browser console (F12) for errors
   - Check backend terminal for errors
   - Run `npm run test:api` to verify API works

4. **topPerformer not showing**
   - Run `npm run diagnose` to check column name
   - Verify data exists in Supabase
   - Restart backend and clear cache

---

## 🎊 Success!

If all tests pass, you're done! The application is:
- Fully functional ✅
- Ready to deploy ✅
- Ready for production ✅

Follow `DEPLOYMENT_GUIDE.md` to deploy!

---

**Total Testing Time**: ~25 minutes
**Difficulty**: Easy (just follow steps)
**Result**: Fully Verified System ✅
