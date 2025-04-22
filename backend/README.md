# Weather App Backend

This is the backend API for the Weather App, built with Laravel. It provides the necessary endpoints for retrieving weather data and managing user preferences.

## Requirements

- PHP 8.2 or higher
- Composer
- SQLite (or other database supported by Laravel)
- Node.js & NPM (for frontend integration)

## Installation

1. Clone the repository (if not already done):
   ```
   git clone <repository-url>
   cd weather-app/backend
   ```

2. Install PHP dependencies:
   ```
   composer install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   php artisan key:generate
   ```

4. Create the SQLite database file:
   ```
   touch database/database.sqlite
   ```

5. Run migrations:
   ```
   php artisan migrate
   ```

## Running the Application

You can start the development server using:

```
php artisan serve
```

Or use the included dev script that starts multiple services:

```
composer run dev
```

This will start:
- Laravel development server
- Queue worker for background jobs
- Log watcher
- Vite for frontend asset compilation

## Directory Structure

- `app/` - Contains the core code of the application
  - `Http/Controllers/` - Controllers that handle HTTP requests
  - `Models/` - Eloquent models
- `config/` - Configuration files
- `database/` - Migrations and seeders
- `routes/` - API and web routes
- `storage/` - Application storage (logs, cache, etc.)

## API Documentation

API endpoints will be documented here as they are developed.

## Integration with Frontend

This backend is designed to work with the Next.js frontend located in the `../frontend` directory. The backend provides the API endpoints that the frontend consumes to display weather data.

## Caching

Weather data is cached to reduce the number of requests to the weather provider's API. Cache configuration can be adjusted in the `config/cache.php` file.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
