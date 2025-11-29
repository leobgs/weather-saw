import { ForecastData } from "@/lib/api";

interface HourlyForecastProps {
  data: ForecastData;
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
  const hourlyData = data.list;

  return (
    <div className="forecast-container fade-in">
      <h4 className="hourly-title">Hourly Forecast (24h)</h4>
      <div className="hourly-scroll">
        {hourlyData.map((item) => (
          <div key={item.dt} className="hourly-item">
            <p className="hourly-time">
              {new Date(item.dt * 1000).toLocaleTimeString("en-US", {
                hour: "numeric",
                hour12: true,
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
              className="forecast-icon-small"
            />
            <p className="forecast-temp">{Math.round(item.main.temp)}°c</p>
            {item.pop > 0 && (
              <p className="hourly-pop">
                💧 {Math.round(item.pop * 100)}%
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
