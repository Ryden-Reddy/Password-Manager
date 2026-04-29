import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Replace these with your actual details from the Supabase Dashboard
const supabaseUrl = 'https://hgbyhagbwjcsycknmwsx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnYnloYWdid2pjc3lja25td3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MDA3OTksImV4cCI6MjA5Mjk3Njc5OX0.5QLbOIjyVMmoKNKq7qLwmdDJsCAWJlpezQ844_J9PQs'

export const supabase = createClient(supabaseUrl, supabaseKey)