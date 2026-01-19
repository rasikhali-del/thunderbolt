#!/usr/bin/env node
/**
 * Diagnostic script to inspect Supabase matches table schema and data
 * Run with: node backend/diagnose.js
 */

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function diagnose() {
  console.log('\n🔍 THUNDERBOLTS SUPABASE DIAGNOSTIC\n');
  console.log('=' .repeat(50));
  
  try {
    // Get table schema and first record
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Error fetching data:', error.message);
      return;
    }
    
    if (!data || data.length === 0) {
      console.log('⚠️  No data found in matches table');
      return;
    }
    
    console.log('\n📊 TABLE: matches');
    console.log('=' .repeat(50));
    
    const firstRecord = data[0];
    const columns = Object.keys(firstRecord);
    
    console.log('\n✅ COLUMNS DETECTED:');
    columns.forEach((col, idx) => {
      const value = firstRecord[col];
      const type = typeof value;
      console.log(`  ${idx + 1}. ${col} (${type}): ${JSON.stringify(value)}`);
    });
    
    console.log('\n📄 FIRST RECORD (FULL):');
    console.log(JSON.stringify(firstRecord, null, 2));
    
    // Check for topPerformer variations
    console.log('\n🔎 TOPPERFORMER FIELD CHECK:');
    const hasTopPerformer = 'topPerformer' in firstRecord;
    const hasTop_performer = 'top_performer' in firstRecord;
    const hasTopPerformerSnake = columns.some(c => c.includes('top') && c.includes('performer'));
    
    console.log(`  Has "topPerformer": ${hasTopPerformer}`);
    console.log(`  Has "top_performer": ${hasTop_performer}`);
    console.log(`  Has variant: ${hasTopPerformerSnake ? 'YES' : 'NO'}`);
    
    if (hasTopPerformer) {
      console.log(`  ✅ Use camelCase: topPerformer = "${firstRecord.topPerformer}"`);
    }
    if (hasTop_performer) {
      console.log(`  ✅ Use snake_case: top_performer = "${firstRecord.top_performer}"`);
    }
    
    // Count total records
    const { count, error: countError } = await supabase
      .from('matches')
      .select('*', { count: 'exact', head: true });
    
    console.log(`\n📈 TOTAL RECORDS: ${count || 'unknown'}`);
    
    // Test data integrity
    console.log('\n🧪 DATA INTEGRITY CHECK:');
    const { data: allData } = await supabase
      .from('matches')
      .select('*');
    
    if (allData) {
      const recordsWithTopPerformer = allData.filter(r => r.topPerformer || r.top_performer).length;
      console.log(`  Records with topPerformer data: ${recordsWithTopPerformer}/${allData.length}`);
      console.log(`  Records with missing topPerformer: ${allData.length - recordsWithTopPerformer}`);
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ Diagnostic complete!\n');
    
  } catch (error) {
    console.error('❌ Diagnostic failed:', error.message);
  }
}

diagnose();
