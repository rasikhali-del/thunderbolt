// Configuration for API calls
export const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';

// Fetch all matches from backend
export const fetchMatches = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
};

// Fetch single match
export const fetchMatch = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/${id}`);
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching match:', error);
    return null;
  }
};

// Create new match
export const createMatch = async (matchData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(matchData)
    });
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error creating match:', error);
    return null;
  }
};

// Update match
export const updateMatch = async (id, matchData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(matchData)
    });
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error updating match:', error);
    return null;
  }
};

// Delete match
export const deleteMatch = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error deleting match:', error);
    return false;
  }
};

// Get statistics
export const fetchStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`);
    const data = await response.json();
    return data.success ? data.stats : null;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
};
