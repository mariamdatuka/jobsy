import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://etwwgzptfnjllntomcok.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0d3dnenB0Zm5qbGxudG9tY29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NTcwMjIsImV4cCI6MjA2ODMzMzAyMn0.kvi_wWaQQ8QML_Yr_r2xnmsGhszltH_67-ZUbg1Z2Z4"
);
