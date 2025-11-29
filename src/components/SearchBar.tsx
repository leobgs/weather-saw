"use client";

import { FormEvent, useState, ChangeEvent } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
  showLocationButton?: boolean;
  onLocationClick?: () => void;
}

export default function SearchBar({ 
  onSearch, 
  isLoading = false,
  showLocationButton = false,
  onLocationClick
}: SearchBarProps) {
  const [city, setCity] = useState("");
  const [validationError, setValidationError] = useState("");

  const validateInput = (value: string) => {
    if (value.length === 0) {
      setValidationError("");
      return true;
    }
    
    if (value.length < 3) {
      setValidationError("City name must be at least 3 characters");
      return false;
    }
    
    if (value.length > 70) {
      setValidationError("City name must not exceed 70 characters");
      return false;
    }
    
    setValidationError("");
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    validateInput(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateInput(city)) {
      return;
    }

    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Search city..."
          className={`search-input ${validationError ? 'search-input-error' : ''}`}
          disabled={isLoading}
        />
        {isLoading && <div className="search-loading-spinner" />}
        {showLocationButton && onLocationClick && (
          <button
            type="button"
            onClick={onLocationClick}
            className="location-retry-btn"
            title="Use current location"
            disabled={isLoading}
          >
            📍
          </button>
        )}
      </form>
      {validationError && (
        <div className="search-error-message">
          {validationError}
        </div>
      )}
    </div>
  );
}
