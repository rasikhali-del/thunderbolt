#!/usr/bin/env node
/**
 * API Test Script
 * Tests all backend endpoints to ensure proper functionality
 * Run with: npm run test:api (after backend is running)
 */

import fetch from 'node-fetch';

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  console.log('\n🧪 THUNDERBOLTS API TEST SUITE\n');
  console.log('='.repeat(50));
  
  try {
    // Test 1: Health Check
    console.log('\n✓ Test 1: Health Check');
    let response = await fetch(`${API_BASE}/health`);
    let data = await response.json();
    console.log('  Response:', data);
    
    // Test 2: Get Schema
    console.log('\n✓ Test 2: Get Schema');
    response = await fetch(`${API_BASE}/schema`);
    data = await response.json();
    console.log('  Columns:', data.columns?.join(', '));
    if (data.sampleData) {
      console.log('  Sample topPerformer:', data.sampleData.topPerformer || data.sampleData.top_performer);
    }
    
    // Test 3: Get All Matches
    console.log('\n✓ Test 3: Get All Matches');
    response = await fetch(`${API_BASE}/matches`);
    data = await response.json();
    if (data.success) {
      console.log(`  ✅ Loaded ${data.data.length} matches`);
      if (data.data[0]) {
        console.log(`  First match ID: ${data.data[0].id}`);
        console.log(`  First match topPerformer: ${data.data[0].topPerformer || 'N/A'}`);
      }
    } else {
      console.log('  ❌ Error:', data.error);
    }
    
    // Test 4: Get Single Match
    if (data.data && data.data[0]) {
      console.log(`\n✓ Test 4: Get Single Match (ID: ${data.data[0].id})`);
      response = await fetch(`${API_BASE}/matches/${data.data[0].id}`);
      const singleMatch = await response.json();
      if (singleMatch.success) {
        console.log(`  ✅ Opponent: ${singleMatch.data.opponent}`);
        console.log(`  ✅ topPerformer: ${singleMatch.data.topPerformer || 'N/A'}`);
      } else {
        console.log('  ❌ Error:', singleMatch.error);
      }
    }
    
    // Test 5: Get Stats
    console.log('\n✓ Test 5: Get Statistics');
    response = await fetch(`${API_BASE}/stats`);
    data = await response.json();
    if (data.success) {
      console.log(`  ✅ Total Matches: ${data.stats.totalMatches}`);
      console.log(`  ✅ Total Runs: ${data.stats.totalRuns}`);
      console.log(`  ✅ Total Wickets: ${data.stats.totalWickets}`);
    } else {
      console.log('  ❌ Error:', data.error);
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ All tests completed!\n');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('\nMake sure backend is running on http://localhost:5000');
    process.exit(1);
  }
}

testAPI();
