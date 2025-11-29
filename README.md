# Weather Dashboard

A modern, responsive weather dashboard application built with Next.js that displays current weather conditions, hourly forecasts, and 5-day forecasts using the OpenWeatherMap API.

![Weather Dashboard](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![React Query](https://img.shields.io/badge/React_Query-5-red?style=flat-square&logo=react-query)

## Features

- **2x2 Grid Layout**: Clean desktop layout with 4 main cards (responsive to mobile)
- **Current Weather Card**: Displays location, temperature, weather condition, feels like, humidity, wind speed, pressure, and rain chance
- **Wind & Pressure Card**: Detailed wind information (speed, direction, gust) and pressure data (atmospheric, sea level, ground level)
- **Hourly Forecast**: Horizontal scrollable hourly weather predictions with temperature and precipitation probability
- **5-Day Forecast**: Week-ahead weather outlook with max/min temperatures
- **City Search**: Search weather by city name with input validation (3-70 characters)
- **Geolocation**: Automatic weather detection based on user's current location
- **Dark Mode**: Theme toggle with persistent preference
- **Data Persistence**: Caches last search in localStorage
- **Error Handling**: User-friendly error messages with data persistence on failure
- **Responsive Design**: Mobile-first approach with optimized layouts for all screen sizes

## Tech Stack

### Core
- **Next.js 15.1.0** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5** - Type safety

### State Management & Data Fetching
- **TanStack React Query (v5.62.15)** - Server state management, caching, and data synchronization
- **Axios 1.7.9** - HTTP client for API requests

### Styling
- **Vanilla CSS** - Pure CSS3 with CSS variables for theming
- **CSS Grid & Flexbox** - Modern layout systems
- **Responsive Design** - Mobile-first approach with media queries
- **Lucide React 0.469.0** - Modern SVG icon library

### API
- **OpenWeatherMap API** - Weather data provider

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- OpenWeatherMap API key ([Get it here](https://openweathermap.org/api))

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/leobgs/weather-saw.git
cd weather-saw
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```env
OPENWEATHER_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual OpenWeatherMap API key.

## Running the Application

### Development Mode
```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## API Routes

### Weather API (`/api/weather`)

**GET** `/api/weather`

Query Parameters:
- `city` (string): City name (e.g., "Jakarta")
- `lat` (number): Latitude (alternative to city)
- `lon` (number): Longitude (alternative to city)
- `type` (string): "weather" or "forecast"

Example:
```
GET /api/weather?city=Jakarta&type=weather
GET /api/weather?lat=-6.2088&lon=106.8456&type=forecast
```

## Key Features Implementation

### Search Validation
- Minimum 3 characters
- Maximum 70 characters
- Real-time validation on input change
- Visual error feedback

### Data Caching
- React Query caches data for 10 minutes
- localStorage persists last search
- Previous data displayed during new fetches

### Responsive Grid
```css
/* Desktop: 2x2 Grid */
@media (min-width: 1024px) {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
}

/* Mobile: Single Column */
@media (max-width: 1024px) {
  flex-direction: column;
}
```

### Theme Support
- Light mode (default)
- Dark mode
- System preference detection
- Persistent theme in localStorage

## Styling Features

### Vanilla CSS Architecture
The application uses **pure CSS** without any preprocessors or CSS-in-JS libraries:

- **Modern Layouts**: CSS Grid and Flexbox for responsive design
- **No Framework Dependencies**: Pure CSS keeps bundle size minimal
- **Maintainable**: Clear class naming conventions and organized structure
- **Performance**: No runtime CSS processing overhead

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/)

## Author

**Leo BGS**
- GitHub: [@leobgs](https://github.com/leobgs)

---

**Note**: Make sure to keep your API key secure and never commit it to version control. Always use environment variables for sensitive information.
