import { ForecastData } from "@/lib/api";

interface ForecastProps {
  data: ForecastData;
}

export default function Forecast({ data }: ForecastProps) {
  const dailyForecasts = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <div className="forecast-container fade-in">
      <h4 className="hourly-title">5-Day Forecast</h4>
      <div className="forecast-scroll">
        {dailyForecasts.map((day) => (
          <div key={day.dt} className="forecast-item-horizontal">
            <p className="forecast-day">
              {new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}
            </p>
            <img 
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
              alt={day.weather[0].description} 
              className="forecast-icon-small"
            />
            <div className="forecast-temps">
              <span className="max-temp">{Math.round(day.main.temp_max)}°c</span>
              <span className="min-temp">{Math.round(day.main.temp_min)}°c</span>
            </div>
            <p className="forecast-desc-short">{day.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
