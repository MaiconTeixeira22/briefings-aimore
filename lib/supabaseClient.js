import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://srsewdormjzybkjwgtuv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyc2V3ZG9ybWp6eWJrandndHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDQwODYsImV4cCI6MjA2MDM4MDA4Nn0.8XqArSQ2DKdZiURQ5AbAX4B1TEMbb_7X_LU7sL01c2k'
)