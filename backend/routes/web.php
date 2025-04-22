<!-- <?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

//Define the weather API routes 

Route::get('/weather/current-city', [WeatherController::class, 'current']);
Route::get('/weather/forecast', [WeatherController::class, 'forecast']);

Route::get('/', function () {
    return view('welcome');
});
