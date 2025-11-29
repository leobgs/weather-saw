import axios from "axios";

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    pressure: number;
    sea_level?: number;
    grnd_level?: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg?: number;
    gust?: number;
  };
  sys: {
    country: string;
  };
  dt: number;
}

export interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    weather: {
      main: string;
      icon: string;
      description: string;
    }[];
    dt_txt: string;
    pop: number;
  }[];
  city: {
    name: string;
  };
}

export interface WeatherQueryParams {
  city?: string;
  lat?: number;
  lon?: number;
}

export const fetchWeather = async (params: WeatherQueryParams): Promise<WeatherData> => {
  const response = await axios.get<WeatherData>("/api/weather", {
    params: { ...params, type: "weather" },
  });
  return response.data;
};

export const fetchForecast = async (params: WeatherQueryParams): Promise<ForecastData> => {
  const response = await axios.get<ForecastData>("/api/weather", {
    params: { ...params, type: "forecast" },
  });
  return response.data;
};
