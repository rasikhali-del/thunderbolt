# Thunderbolts Cricket Team Backend

A Node.js/Express backend API for the Thunderbolts Cricket Team website.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
PORT=5000
```

3. Run the server:
```bash
npm start
```

or for development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Health Check
- `GET /api/health` - Check if backend is running

### Matches
- `GET /api/matches` - Get all matches
- `GET /api/matches/:id` - Get single match
- `POST /api/matches` - Create new match
- `PUT /api/matches/:id` - Update match
- `DELETE /api/matches/:id` - Delete match

### Statistics
- `GET /api/stats` - Get team statistics

## Example Usage

**Get all matches:**
```bash
curl http://localhost:5000/api/matches
```

**Create new match:**
```bash
curl -X POST http://localhost:5000/api/matches \
  -H "Content-Type: application/json" \
  -d '{
    "id": 24,
    "date": "24",
    "opponent": "New Team",
    "runs": "500",
    "wickets": "20",
    "result": "3-40",
    "topPerformer": "75 Runs"
  }'
```

**Update match:**
```bash
curl -X PUT http://localhost:5000/api/matches/1 \
  -H "Content-Type: application/json" \
  -d '{
    "runs": "900",
    "wickets": "52",
    "result": "5-25",
    "topPerformer": "85 Runs"
  }'
```

**Delete match:**
```bash
curl -X DELETE http://localhost:5000/api/matches/1
```

**Get statistics:**
```bash
curl http://localhost:5000/api/stats
```
