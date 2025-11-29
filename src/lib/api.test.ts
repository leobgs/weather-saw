import { fetchWeather, fetchForecast } from './api';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Weather API', () => {
  describe('fetchWeather', () => {
    it('should fetch weather data for a city', async () => {
      const mockWeatherData = {
        name: 'Jakarta',
        main: {
          temp: 28,
          humidity: 70,
          feels_like: 30,
          pressure: 1012,
          sea_level: 1012,
          grnd_level: 985,
        },
        weather: [
          {
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03d',
          },
        ],
        wind: {
          speed: 4.5,
          deg: 214,
          gust: 5.2,
        },
        sys: {
          country: 'ID',
        },
        dt: 1638360000,
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

      const result = await fetchWeather({ city: 'Jakarta' });

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/weather', {
        params: { city: 'Jakarta', type: 'weather' },
      });
      expect(result).toEqual(mockWeatherData);
      expect(result.name).toBe('Jakarta');
      expect(result.main.temp).toBe(28);
      expect(result.weather[0].description).toBe('scattered clouds');
    });

    it('should fetch weather data for coordinates', async () => {
      const mockWeatherData = {
        name: 'London',
        main: {
          temp: 15,
          humidity: 65,
          feels_like: 14,
          pressure: 1015,
        },
        weather: [
          {
            main: 'Rain',
            description: 'light rain',
            icon: '10d',
          },
        ],
        wind: {
          speed: 3.2,
          deg: 180,
        },
        sys: {
          country: 'GB',
        },
        dt: 1638360000,
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

      const result = await fetchWeather({ lat: 51.5074, lon: -0.1278 });

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/weather', {
        params: { lat: 51.5074, lon: -0.1278, type: 'weather' },
      });
      expect(result).toEqual(mockWeatherData);
    });

    it('should handle API errors', async () => {
      const errorMessage = 'City not found';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(fetchWeather({ city: 'InvalidCity' })).rejects.toThrow(errorMessage);
    });
  });

  describe('fetchForecast', () => {
    it('should fetch forecast data for a city', async () => {
      const mockForecastData = {
        list: [
          {
            dt: 1638360000,
            main: {
              temp: 25,
              temp_max: 28,
              temp_min: 22,
            },
            weather: [
              {
                main: 'Clear',
                icon: '01d',
                description: 'clear sky',
              },
            ],
            dt_txt: '2023-12-01 12:00:00',
            pop: 0.1,
          },
          {
            dt: 1638363600,
            main: {
              temp: 26,
              temp_max: 29,
              temp_min: 23,
            },
            weather: [
              {
                main: 'Clouds',
                icon: '03d',
                description: 'scattered clouds',
              },
            ],
            dt_txt: '2023-12-01 15:00:00',
            pop: 0.2,
          },
        ],
        city: {
          name: 'Jakarta',
        },
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockForecastData });

      const result = await fetchForecast({ city: 'Jakarta' });

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/weather', {
        params: { city: 'Jakarta', type: 'forecast' },
      });
      expect(result).toEqual(mockForecastData);
      expect(result.list).toHaveLength(2);
      expect(result.list[0].main.temp).toBe(25);
      expect(result.city.name).toBe('Jakarta');
    });

    it('should parse forecast data correctly', async () => {
      const mockForecastData = {
        list: [
          {
            dt: 1638360000,
            main: {
              temp: 25,
              temp_max: 28,
              temp_min: 22,
            },
            weather: [
              {
                main: 'Clear',
                icon: '01d',
                description: 'clear sky',
              },
            ],
            dt_txt: '2023-12-01 12:00:00',
            pop: 0.1,
          },
        ],
        city: {
          name: 'Jakarta',
        },
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockForecastData });

      const result = await fetchForecast({ city: 'Jakarta' });

      // Test data structure
      expect(result.list[0]).toHaveProperty('dt');
      expect(result.list[0]).toHaveProperty('main');
      expect(result.list[0]).toHaveProperty('weather');
      expect(result.list[0]).toHaveProperty('dt_txt');
      expect(result.list[0]).toHaveProperty('pop');

      // Test nested properties
      expect(result.list[0].main).toHaveProperty('temp');
      expect(result.list[0].main).toHaveProperty('temp_max');
      expect(result.list[0].main).toHaveProperty('temp_min');
      expect(result.list[0].weather[0]).toHaveProperty('main');
      expect(result.list[0].weather[0]).toHaveProperty('icon');
      expect(result.list[0].weather[0]).toHaveProperty('description');
    });
  });
});
