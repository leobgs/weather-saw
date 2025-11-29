"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import WindPressure from "@/components/WindPressure";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import { useWeather, useLastQuery } from "@/hooks/useWeather";
import ThemeToggle from "@/components/ThemeToggle";
import Forecast from "@/components/Forecast";
import HourlyForecast from "@/components/HourlyForecast";
import ErrorPopup from "@/components/ErrorPopup";
import { useForecast } from "@/hooks/useForecast";
import { WeatherQueryParams } from "@/lib/api";

export default function Home() {
  
  const { lastQuery, setLastQuery } = useLastQuery();
  const [currentQuery, setCurrentQuery] = useState<WeatherQueryParams | null>(null);
  const [locationError, setLocationError] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newQuery = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setCurrentQuery(newQuery);
          setLastQuery(newQuery);
          setLocationError(false);
          setIsInitializing(false);
        },
        (error) => {
          console.error("Location failed", error);
          setLocationError(true);
          if (!currentQuery && !lastQuery) {
             const defaultQuery = { city: "Jakarta" };
             setCurrentQuery(defaultQuery);
             setLastQuery(defaultQuery);
          }
          setIsInitializing(false);
        }
      );
    } else {
      setLocationError(true);
      if (!currentQuery && !lastQuery) {
        const defaultQuery = { city: "Jakarta" };
        setCurrentQuery(defaultQuery);
        setLastQuery(defaultQuery);
      }
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    if (lastQuery) {
      setCurrentQuery(lastQuery);
      setIsInitializing(false);
      return;
    }

    const saved = localStorage.getItem("weather-app-last-search");
    if (saved) {
       
        try {
            const parsed = JSON.parse(saved);
            setCurrentQuery(parsed);
            setIsInitializing(false);
            return;
        } catch (e) {
        }
    }

    if (!saved && !currentQuery) {
      handleLocation();
    } else {
        setIsInitializing(false);
    }
  }, [lastQuery, currentQuery, setLastQuery]);

  const { data, isLoading, isError, error, isFetching } = useWeather(currentQuery);
  const { data: forecastData } = useForecast(currentQuery);
  
  const [displayedData, setDisplayedData] = useState<any>(null);

  useEffect(() => {
    if (data) {
      setDisplayedData(data);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      setShowErrorPopup(true);
    }
  }, [isError]);
  
  const rainChance = forecastData?.list[0]?.pop;

  const handleSearch = (searchCity: string) => {
    const newQuery = { city: searchCity };
    setCurrentQuery(newQuery);
    setLastQuery(newQuery);
  };

  const showLoading = isInitializing || (isLoading && !displayedData);

  return (
    <main className="main-container">
      
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Weather App</h1>
          <div className="header-controls">
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isFetching} 
              showLocationButton={true}
              onLocationClick={handleLocation}
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {showErrorPopup && (
          <ErrorPopup 
            message={(error as any)?.response?.data?.error || (error as Error)?.message || "Failed to fetch weather data"} 
            onClose={() => setShowErrorPopup(false)} 
          />
        )}

        {showLoading ? (
          <WeatherSkeleton />
        ) : (
          <>
            {displayedData ? (
              <div className="dashboard-grid">
                <div className="grid-item item-current">
                  <WeatherCard data={displayedData} rainChance={rainChance} />
                </div>
                
                <div className="grid-item item-details">
                  <WindPressure data={displayedData} />
                </div>

                <div className="grid-item item-hourly">
                  {forecastData && <HourlyForecast data={forecastData} />}
                </div>

                <div className="grid-item item-forecast">
                  <ForecastSection query={currentQuery} />
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <p>Enter a city or use current location to see the weather</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function ForecastSection({ query }: { query: WeatherQueryParams | null }) {
  const { data, isLoading } = useForecast(query);

  if (isLoading) return <div className="forecast-loading">Loading forecast...</div>;
  if (!data) return null;

  return <Forecast data={data} />;
}
