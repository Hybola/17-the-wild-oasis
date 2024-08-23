import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://joqbbroyexvmfpmvapgd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvcWJicm95ZXh2bWZwbXZhcGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0MDAzNTAsImV4cCI6MjAzOTk3NjM1MH0.6BPPB3bFWSCu88WR8AS3j6WYky49GZ0poPHZ-_lpz5Y";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
