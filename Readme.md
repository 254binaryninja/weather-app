# Pawa Weather App

A decoupled weather application built with **Next.js (TypeScript)** for the frontend and **Laravel (latest)** for the backend API. Weather data is sourced from [OpenWeatherMap](https://openweathermap.org/api).

---

## 🧱 Tech Stack

### Frontend
- [Next.js](https://nextjs.org/)
- TypeScript
- Tailwind CSS + [RippleUI](https://rippleui.com/)
- Fetch API

### Backend
- [Laravel (latest)](https://laravel.com/)
- GuzzleHTTP

---

## 🧭 Features

- 🔍 Search city weather using the Geocoding API
- 🌡️ View current temperature and weather description
- 🌤️ Display 3-day forecast
- 🌬️ Wind status and 💧humidity information
- 🌐 Switch between Celsius and Fahrenheit
- 📅 Current date and location display
- 📦 Decoupled architecture (frontend/backend separation)

---

## 🛠 Setup Instructions

### Backend (Laravel)

1. Clone the repository and navigate to the backend folder:
```bash
cd backend
composer install
```

2. Create `.env` file and set the following:
```env
OPENWEATHER_API_KEY=your_api_key_here
```

3. Run the Laravel development server:
```bash
php artisan serve
```

4. Laravel API endpoints:
- `GET /api/weather?city=Nairobi&units=metric`
- `GET /api/forecast?city=Nairobi&units=metric`

### Frontend (Next.js)

1. Navigate to the frontend folder:
```bash
cd frontend
npm install
```

2. Set up environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

3. Start the dev server:
```bash
npm run dev
```

4. Visit: `http://localhost:3000`

---

## 💡 Folder Structure Overview

### Frontend
```
components/       # UI Components like SearchBox, WeatherCard
services/         # API service logic (calls Laravel)
types/            # TypeScript interfaces
tutils/           # Helper functions (unit conversion, formatting)
pages/            # index.tsx with main layout
```

### Backend
```
Controllers/       # WeatherController for API logic
Services/          # OpenWeatherMap API communication
routes/api.php     # Defines weather routes
```

---

## ✅ TODO Checklist

- [x] Build Laravel API with city-based weather endpoints
- [x] Create frontend UI in Next.js using RippleUI
- [x] Connect frontend to backend via fetch API
- [x] Handle errors and loading states gracefully
- [x] Add support for unit switching (C/F)
- [ ] Add mobile responsiveness (optional)
- [ ] Add simple test case for API route (bonus)

---

## 📸 Wireframe Layout

- [ ] Search box at the top
- [ ] Current day's weather: icon, temperature, description, date, location
- [ ] Forecast: Next 3 days
- [ ] Weather details: wind, humidity
- [ ] Toggle: Celsius / Fahrenheit

---

## 📦 Deployment Tips

- Use [Vercel](https://vercel.com/) for frontend deployment
- Use [Render](https://render.com/) or [Laravel Forge](https://forge.laravel.com/) for Laravel backend

---

## 🤝 Acknowledgements

- [OpenWeatherMap API](https://openweathermap.org/api)
- [Tailwind CSS](https://tailwindcss.com/)
- [RippleUI](https://rippleui.com/)

