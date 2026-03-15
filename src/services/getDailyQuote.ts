import { supabase } from "@src/supabase-client";

const CACHE_KEY = "daily_quotes_cache";

export const getDailyQuote = async () => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { quote, date } = JSON.parse(cached);
    const isToday = date === new Date().toDateString();

    if (isToday) return quote; // same day, return cached quote
  }
  const { data, error } = await supabase.functions.invoke("get-quote");

  if (error) throw error.message;

  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      quote: data,
      date: new Date().toDateString(),
    }),
  );

  return data;
};
