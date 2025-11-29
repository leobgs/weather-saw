import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';
import { WeatherData } from '@/lib/api';

const mockWeatherData: WeatherData = {
  name: 'Jakarta',
  main: {
    temp: 28.5,
    humidity: 70,
    feels_like: 30.2,
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

describe('WeatherCard Component', () => {
  it('should render without crashing', () => {
    render(<WeatherCard data={mockWeatherData} />);
  });

  it('should display city name and country', () => {
    render(<WeatherCard data={mockWeatherData} />);
    expect(screen.getByText(/Jakarta, ID/i)).toBeInTheDocument();
  });

  it('should display temperature', () => {
    render(<WeatherCard data={mockWeatherData} />);
    // Temperature is rounded: 28.5 -> 29
    expect(screen.getByText(/29°/)).toBeInTheDocument();
  });

  it('should display weather description', () => {
    render(<WeatherCard data={mockWeatherData} />);
    expect(screen.getByText(/scattered clouds/i)).toBeInTheDocument();
  });

  it('should display feels like temperature', () => {
    render(<WeatherCard data={mockWeatherData} />);
    // Feels like is rounded: 30.2 -> 30
    expect(screen.getByText(/Feels like 30°c/i)).toBeInTheDocument();
  });

  it('should display humidity', () => {
    render(<WeatherCard data={mockWeatherData} />);
    expect(screen.getByText(/Humidity/i)).toBeInTheDocument();
    expect(screen.getByText(/70%/)).toBeInTheDocument();
  });

  it('should display wind speed', () => {
    render(<WeatherCard data={mockWeatherData} />);
    expect(screen.getByText(/Wind Speed/i)).toBeInTheDocument();
    expect(screen.getByText(/4.5 m\/s/)).toBeInTheDocument();
  });

  it('should display pressure', () => {
    render(<WeatherCard data={mockWeatherData} />);
    expect(screen.getByText(/Pressure/i)).toBeInTheDocument();
    expect(screen.getByText(/1012 hPa/)).toBeInTheDocument();
  });

  it('should display rain chance when provided', () => {
    render(<WeatherCard data={mockWeatherData} rainChance={0.35} />);
    expect(screen.getByText(/Rain Chance/i)).toBeInTheDocument();
    expect(screen.getByText(/35%/)).toBeInTheDocument();
  });

  it('should not display rain chance when not provided', () => {
    render(<WeatherCard data={mockWeatherData} />);
    expect(screen.queryByText(/Rain Chance/i)).not.toBeInTheDocument();
  });

  it('should render weather icon with correct URL', () => {
    render(<WeatherCard data={mockWeatherData} />);
    const icon = screen.getByAltText(/scattered clouds/i) as HTMLImageElement;
    expect(icon).toBeInTheDocument();
    expect(icon.src).toContain('03d@4x.png');
  });

  it('should display current date', () => {
    render(<WeatherCard data={mockWeatherData} />);
    const dateElement = screen.getByText((content, element) => {
      return element?.className === 'weather-date' && content.length > 0;
    });
    expect(dateElement).toBeInTheDocument();
  });

  it('should handle different weather conditions', () => {
    const rainyWeather = {
      ...mockWeatherData,
      weather: [
        {
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
    };

    render(<WeatherCard data={rainyWeather} />);
    expect(screen.getByText(/light rain/i)).toBeInTheDocument();
  });

  it('should round temperature values correctly', () => {
    const testData = {
      ...mockWeatherData,
      main: {
        ...mockWeatherData.main,
        temp: 25.4, // Should round to 25
        feels_like: 26.6, // Should round to 27
      },
    };

    render(<WeatherCard data={testData} />);
    expect(screen.getByText(/25°/)).toBeInTheDocument();
    expect(screen.getByText(/Feels like 27°c/i)).toBeInTheDocument();
  });

  it('should display all detail items correctly', () => {
    render(<WeatherCard data={mockWeatherData} rainChance={0.5} />);
    
    // Check all 4 detail items are present
    expect(screen.getByText(/Rain Chance/i)).toBeInTheDocument();
    expect(screen.getByText(/Wind Speed/i)).toBeInTheDocument();
    expect(screen.getByText(/Humidity/i)).toBeInTheDocument();
    expect(screen.getByText(/Pressure/i)).toBeInTheDocument();
  });
});
