import { render, screen } from '@testing-library/react';
import WindPressure from './WindPressure';
import { WeatherData } from '@/lib/api';

const mockWeatherData: WeatherData = {
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

describe('WindPressure Component', () => {
  it('should render without crashing', () => {
    render(<WindPressure data={mockWeatherData} />);
  });

  it('should display component title', () => {
    render(<WindPressure data={mockWeatherData} />);
    expect(screen.getByText(/Wind & Pressure/i)).toBeInTheDocument();
  });

  it('should display Wind and Pressure column titles', () => {
    render(<WindPressure data={mockWeatherData} />);
    expect(screen.getByText(/^Wind$/)).toBeInTheDocument();
    expect(screen.getByText(/^Pressure$/)).toBeInTheDocument();
  });

  it('should display wind speed', () => {
    render(<WindPressure data={mockWeatherData} />);
    expect(screen.getByText(/4.5 m\/s/)).toBeInTheDocument();
  });

  it('should convert wind direction to cardinal direction', () => {
    render(<WindPressure data={mockWeatherData} />);
    // 214° should be SW
    expect(screen.getByText(/SW \(214°\)/)).toBeInTheDocument();
  });

  it('should display gust when available', () => {
    render(<WindPressure data={mockWeatherData} />);
    expect(screen.getByText(/Gust: 5.2 m\/s/)).toBeInTheDocument();
  });

  it('should not display gust when not available', () => {
    const dataWithoutGust = {
      ...mockWeatherData,
      wind: {
        speed: 4.5,
        deg: 214,
      },
    };
    render(<WindPressure data={dataWithoutGust} />);
    expect(screen.queryByText(/Gust:/)).not.toBeInTheDocument();
  });

  it('should display pressure', () => {
    render(<WindPressure data={mockWeatherData} />);
    expect(screen.getByText(/1012 hPa/)).toBeInTheDocument();
  });

  it('should display sea level when available', () => {
    render(<WindPressure data={mockWeatherData} />);
    expect(screen.getByText(/Sea Level: 1012 hPa/)).toBeInTheDocument();
  });

  it('should display ground level when available', () => {
    render(<WindPressure data={mockWeatherData} />);
    expect(screen.getByText(/Ground Level: 985 hPa/)).toBeInTheDocument();
  });

  it('should not display sea level when not available', () => {
    const dataWithoutSeaLevel = {
      ...mockWeatherData,
      main: {
        ...mockWeatherData.main,
        sea_level: undefined,
      },
    };
    render(<WindPressure data={dataWithoutSeaLevel} />);
    expect(screen.queryByText(/Sea Level:/)).not.toBeInTheDocument();
  });

  it('should handle wind direction at 0 degrees (North)', () => {
    const northWind = {
      ...mockWeatherData,
      wind: {
        ...mockWeatherData.wind,
        deg: 0,
      },
    };
    render(<WindPressure data={northWind} />);
    expect(screen.getByText(/N \(0°\)/)).toBeInTheDocument();
  });

  it('should handle wind direction at 90 degrees (East)', () => {
    const eastWind = {
      ...mockWeatherData,
      wind: {
        ...mockWeatherData.wind,
        deg: 90,
      },
    };
    render(<WindPressure data={eastWind} />);
    expect(screen.getByText(/E \(90°\)/)).toBeInTheDocument();
  });

  it('should handle missing wind degree', () => {
    const noWindDeg = {
      ...mockWeatherData,
      wind: {
        speed: 4.5,
      },
    };
    render(<WindPressure data={noWindDeg} />);
    expect(screen.getByText(/N \(0°\)/)).toBeInTheDocument(); // Falls back to 0
  });
});
