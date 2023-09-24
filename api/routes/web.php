<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GarbageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', [GarbageController::class, 'addNow']);

Route::get('/changeAgentManageId', [GarbageController::class, 'changeAgentManageId']);

// Route::get('/changeHouseDescriptionRooms', [GarbageController::class, 'changeHouseDescriptionRooms']);
// Route::get('/changeFloor', [GarbageController::class, 'changeFloor']);
// Route::get('/changeInstallments', [GarbageController::class, 'changeInstallments']);
// Route::get('/changeHomeRoom', [GarbageController::class, 'changeHomeRoom']);
// Route::get('/checkImage', [GarbageController::class, 'checkImage']);
// Route::get('/changeArrayPrice', [GarbageController::class, 'changeArrayPrice']);

