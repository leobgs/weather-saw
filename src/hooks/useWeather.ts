import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchWeather, WeatherData, WeatherQueryParams } from "@/lib/api";
import { useEffect, useState } from "react";

const STORAGE_KEY = "weather-app-last-search";

interface CachedData {
  query: WeatherQueryParams;
  data: WeatherData;
  timestamp: number;
}

export function useWeather(queryParam: WeatherQueryParams | null) {
  const query = useQuery({
    queryKey: ["weather", queryParam],
    queryFn: () => fetchWeather(queryParam!),
    enabled: !!queryParam && (!!queryParam.city || (!!queryParam.lat && !!queryParam.lon)),
    staleTime: 1000 * 60 * 10, // 10 minutes
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (query.data && queryParam) {
      const cache: CachedData = {
        query: queryParam,
        data: query.data,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    }
  }, [query.data, queryParam]);

  return query;
}

export function useLastQuery() {
  const [lastQuery, setLastQuery] = useState<WeatherQueryParams | null>(null);
  
  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        const parsed: CachedData = JSON.parse(cached);
        setLastQuery(parsed.query);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  return { lastQuery, setLastQuery };
}
