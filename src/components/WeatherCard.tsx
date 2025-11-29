import { WeatherData } from "@/lib/api";
import { CloudRain, Droplets, Gauge, Wind, } from "lucide-react";

interface WeatherCardProps {
  data: WeatherData;
  rainChance?: number;
}

export default function WeatherCard({ data, rainChance }: WeatherCardProps) {
  const { name, main, weather, sys, wind } = data;
  const current = weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${current.icon}@4x.png`;

  return (
    <div className="weather-card fade-in">
      <div className="weather-top-section">
        <div className="weather-header">
          <h2>{name}, {sys?.country}</h2>
          <p className="weather-date">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
          </p>
          <p className="weather-time">
            {new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}
          </p>
        </div>
        <div className="weather-icon-wrapper">
          <img src={iconUrl} alt={current.description} className="weather-icon" />
        </div>
      </div>

      <div className="weather-middle-section">
        <div className="weather-temp">
          <span className="temp-value">{Math.round(main.temp)}°</span>
          <span className="temp-unit">c</span>
        </div>
        <p className="weather-desc">{current.description}</p>
        <p className="feels-like">Feels like {Math.round(main.feels_like)}°c</p>
      </div>

      <div className="weather-details-grid">
        {rainChance !== undefined && (
          <div className="detail-item-small">
            <div className="detail-header">
              <span className="label">Rain Chance</span>
              <CloudRain size={16} color="#4299e1"/>
            </div>
            <span className="value">{Math.round(rainChance * 100)}%</span>
          </div>
        )}
        <div className="detail-item-small">
          <div className="detail-header">
            <span className="label">Wind Speed</span>
            <Wind size={16} color="#4299e1"/>
          </div>
          <span className="value">{wind.speed} m/s</span>
        </div>
        <div className="detail-item-small">
          <div className="detail-header">
            <span className="label">Humidity</span>
            <Droplets size={16} color="#4299e1"/>
          </div>
          <span className="value">{main.humidity}%</span>
        </div>
        <div className="detail-item-small">
          <div className="detail-header">
            <span className="label">Pressure</span>
            <Gauge size={16} color="#da2d2d"/>
          </div>
          <span className="value">{main.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
}
