<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\HTTP;
use Exception;

class WeatherController extends Controller
{
    public function getGeoCode(String $city) {
        try {
            if (empty($city)) {
                return response()->json([
                    'message' => 'City parameter cannot be empty',
                    'status' => 400
                ], 400);
            }
            
            //use the geocoder API to get the lat and long of the city
            $apiKey = env('OPENWEATHERMAP_API_KEY');
            
            if (empty($apiKey)) {
                return response()->json([
                    'message' => 'API key is not configured',
                    'status' => 500
                ], 500);
            }

            $response = HTTP::get('http://api.openweathermap.org/geo/1.0/direct', [
                'q' => $city,
                'limit' => 1,
                'appid' => $apiKey
            ]);

            if ($response->successful()) {
                $data = $response->json();
                if (empty($data)) {
                    return response()->json([
                        'message' => 'City not found',
                        'status' => 404
                    ], 404);
                }
                return $response;
            } else {
                return response()->json([
                    'message' => 'Geocoding API error',
                    'status' => $response->status()
                ], $response->status());
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error fetching geocode data: ' . $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }
    
    public function current(Request $request) {
        try {
            $city = $request->query('city');
            
            if (empty($city)) {
                return response()->json([
                    'message' => 'City parameter is required',
                    'status' => 400
                ], 400);
            }
            
            $apiKey = env('OPENWEATHERMAP_API_KEY');
            if (empty($apiKey)) {
                return response()->json([
                    'message' => 'API key is not configured',
                    'status' => 500
                ], 500);
            }

            //use geocoder API to get the lat and long of the city
            $geocoderResponse = $this->getGeoCode($city);
            if ($geocoderResponse->status() != 200) {
                return $geocoderResponse;
            }

            $geoData = $geocoderResponse->json();
            
            //use the lat and long to get the current weather
            $response = HTTP::get('https://api.openweathermap.org/data/2.5/weather', [
                'lat' => $geoData[0]['lat'],
                'lon' => $geoData[0]['lon'],
                'appid' => $apiKey
            ]);

            if ($response->successful()) {
                return response()->json([
                    'data' => $response->json(),
                    'status' => $response->status()
                ]);
            } else {
                return response()->json([
                    'message' => 'Weather API error',
                    'status' => $response->status()
                ], $response->status());
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error fetching weather data: ' . $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    public function forecast(Request $request) {
        try {
            $city = $request->query('city');
            
            if (empty($city)) {
                return response()->json([
                    'message' => 'City parameter is required',
                    'status' => 400
                ], 400);
            }

            $apiKey = env('OPENWEATHERMAP_API_KEY');
            if (empty($apiKey)) {
                return response()->json([
                    'message' => 'API key is not configured',
                    'status' => 500
                ], 500);
            }
            
            $geocoderResponse = $this->getGeoCode($city);
            if ($geocoderResponse->status() != 200) {
                return $geocoderResponse;
            }
            
            $geoData = $geocoderResponse->json();
            
            //use the lat and long to get the forecast weather
            $response = HTTP::get('https://api.openweathermap.org/data/2.5/forecast', [
                'lat' => $geoData[0]['lat'],
                'lon' => $geoData[0]['lon'],
                'cnt' => 24, // 3days * 8 intervals
                'appid' => $apiKey
            ]);
            
            if ($response->successful()) {
                return response()->json([
                    'data' => $response->json(),
                    'status' => $response->status()
                ]);
            } else {
                return response()->json([
                    'message' => 'Forecast API error',
                    'status' => $response->status()
                ], $response->status());
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error fetching forecast data: ' . $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }
}
