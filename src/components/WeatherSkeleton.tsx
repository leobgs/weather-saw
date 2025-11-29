export default function WeatherSkeleton() {
  return (
    <div className="weather-card skeleton-card">
      <div className="skeleton-line title"></div>
      <div className="skeleton-line temp"></div>
      <div className="skeleton-line desc"></div>
    </div>
  );
}
