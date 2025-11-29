import { WeatherData } from "@/lib/api";
import { Wind, Navigation, Gauge, ArrowDown, ArrowUp, Compass, Waves, Mountain } from "lucide-react";

interface WindPressureProps {
  data: WeatherData;
}

export default function WindPressure({ data }: WindPressureProps) {
  const { main, wind } = data;

  const getWindDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  const windDeg = wind.deg || 0;
  const windDir = getWindDirection(windDeg);

  return (
    <div className="weather-card fade-in wind-pressure-card">
      <h3 className="details-title">Wind & Pressure</h3>
      <div className="wind-pressure-grid">
        <div className="wp-column">
          <h4 className="wp-column-title">Wind</h4>
          <div className="wp-item-row">
            <Wind size={18} color="#4299e1" />
            <span className="wp-value">{wind.speed} m/s</span>
          </div>
          <div className="wp-item-row">
            <Compass size={18} />
            <span className="wp-value">{windDir} ({windDeg}°)</span>
          </div>
          {wind.gust && (
            <div className="wp-item-row">
              <Wind size={18} color="#4299e1" strokeWidth={2.5} />
              <span className="wp-value">Gust: {wind.gust} m/s</span>
            </div>
          )}
        </div>

        <div className="wp-column">
          <h4 className="wp-column-title">Pressure</h4>
          <div className="wp-item-row">
            <Gauge size={18} color="#da2d2d" />
            <span className="wp-value">{main.pressure} hPa</span>
          </div>
          {main.sea_level && (
            <div className="wp-item-row">
              <Waves size={18} color="#4299e1" />
              <span className="wp-value">Sea Level: {main.sea_level} hPa</span>
            </div>
          )}
          {main.grnd_level && (
            <div className="wp-item-row">
              <Mountain size={18} color="#27b437" />
              <span className="wp-value">Ground Level: {main.grnd_level} hPa</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
