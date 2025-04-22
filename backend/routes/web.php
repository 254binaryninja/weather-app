<!-- <?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

//Define the weather API routes 

Route::get('/api/weather/current-city', [WeatherController::class, 'current']);
Route::get('/api/weather/forecast', [WeatherController::class, 'forecast']);

Route::get('/', function () {
    return view('welcome');
});
