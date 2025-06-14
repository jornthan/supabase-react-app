import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uwnpsjpcrnioxkphegft.supabase.co' // 여기에 프로젝트 URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bnBzanBjcm5pb3hrcGhlZ2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MTE4NjMsImV4cCI6MjA2NTQ4Nzg2M30.E8mbho6osiqXV2IiA9M9FOy0vomsYwmTgNnVfuW6j0s' // 여기에 anon key

export const supabase = createClient(supabaseUrl, supabaseKey)