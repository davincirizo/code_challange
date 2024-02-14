<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AppointmentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login',[UserController::class,'login']);
Route::post('register',[UserController::class,'register']);
Route::post('logout',[UserController::class,'logout']);

Route::group(['middleware' => ['auth-user']],function(){
    Route::get('appointments',[AppointmentController::class,'index']);
    Route::post('appointments',[AppointmentController::class,'store']);
    Route::put('appointments/{appointment}',[AppointmentController::class,'update']);
    Route::delete('appointments/{appointment}',[AppointmentController::class,'delete']);
    Route::get('appointments/{appointment}',[AppointmentController::class,'read']);
});

