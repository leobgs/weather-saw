import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchForecast, WeatherQueryParams } from "@/lib/api";

export function useForecast(queryParam: WeatherQueryParams | null) {
  return useQuery({
    queryKey: ["forecast", queryParam],
    queryFn: () => fetchForecast(queryParam!),
    enabled: !!queryParam && (!!queryParam.city || (!!queryParam.lat && !!queryParam.lon)),
    staleTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });
}
