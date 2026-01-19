import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running ⚡' });
});

// Check database schema
app.get('/api/schema', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .limit(1);
    
    if (error) {
      res.json({ 
        error: error.message,
        columns: null 
      });
      return;
    }
    
    // Get column names from first row
    const columns = data && data.length > 0 ? Object.keys(data[0]) : [];
    res.json({ 
      columns,
      sampleData: data?.[0] || null 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all matches
app.get('/api/matches', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    
    // Normalize data - convert snake_case to camelCase for frontend consistency
    const normalizedData = data.map(m => {
      const normalized = { ...m };
      
      // Handle top_performer -> topPerformer conversion
      if (m.top_performer !== undefined && m.topPerformer === undefined) {
        normalized.topPerformer = m.top_performer;
        delete normalized.top_performer;
      }
      
      // Ensure topPerformer exists
      if (!normalized.topPerformer) {
        normalized.topPerformer = '-';
      }
      
      return normalized;
    });
    
    console.log('📊 Matches from Supabase (normalized):', normalizedData);
    res.json({ success: true, data: normalizedData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single match by ID
app.get('/api/matches/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    
    // Normalize single match data
    const normalized = { ...data };
    if (data.top_performer !== undefined && data.topPerformer === undefined) {
      normalized.topPerformer = data.top_performer;
      delete normalized.top_performer;
    }
    if (!normalized.topPerformer) {
      normalized.topPerformer = '-';
    }
    
    res.json({ success: true, data: normalized });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new match
app.post('/api/matches', async (req, res) => {
  try {
    const { id, date, opponent, runs, wickets, result, topPerformer, top_performer } = req.body;

    // Try with snake_case first (Supabase standard)
    let insertData = { id, date, opponent, runs, wickets, result, top_performer: topPerformer || top_performer };
    let result1 = await supabase
      .from('matches')
      .insert([insertData])
      .select();

    // If snake_case fails, try with camelCase
    if (result1.error) {
      insertData = { id, date, opponent, runs, wickets, result, topPerformer };
      result1 = await supabase
        .from('matches')
        .insert([insertData])
        .select();
    }

    if (result1.error) throw result1.error;
    res.status(201).json({ success: true, data: result1.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update match
app.put('/api/matches/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let { date, opponent, runs, wickets, result, topPerformer, top_performer } = req.body;

    // Prepare update data - use snake_case for Supabase
    const updateData = {
      date,
      opponent,
      runs,
      wickets,
      result,
      top_performer: topPerformer || top_performer // Use top_performer (snake_case) for Supabase
    };

    let queryResult = await supabase
      .from('matches')
      .update(updateData)
      .eq('id', id)
      .select();

    // If snake_case fails, try with camelCase
    if (queryResult.error) {
      const updateDataCamel = {
        date,
        opponent,
        runs,
        wickets,
        result,
        topPerformer: topPerformer || top_performer // Try camelCase
      };
      
      queryResult = await supabase
        .from('matches')
        .update(updateDataCamel)
        .eq('id', id)
        .select();
    }

    if (queryResult.error) throw queryResult.error;
    res.json({ success: true, data: queryResult.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete match
app.delete('/api/matches/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, message: 'Match deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('matches')
      .select('*');

    if (error) throw error;

    const stats = {
      totalMatches: data.length,
      totalRuns: data.reduce((sum, m) => sum + (parseInt(m.runs) || 0), 0),
      totalWickets: data.reduce((sum, m) => sum + (parseInt(m.wickets) || 0), 0),
      topScorer: data.reduce((max, m) => (parseInt(m.runs) > parseInt(max.runs || 0) ? m : max), {}),
      topBowler: data.reduce((max, m) => (parseInt(m.wickets) > parseInt(max.wickets || 0) ? m : max), {})
    };

    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'Server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Thunderbolts Backend running on http://localhost:${PORT}`);
});
