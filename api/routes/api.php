<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GeneralFormController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api'], function ($router) {
    Route::post('/signin', [AuthController::class, 'login']);
    Route::post('/addGlobalForm', [GeneralFormController::class, 'addGlobalForm']);
    Route::post('/addGlobalFormField', [GeneralFormController::class, 'addGlobalFormField']);
    Route::post('/removeGlobalFormField', [GeneralFormController::class, 'removeGlobalFormField']);
    Route::get('/getUsers', [UserController::class, 'getUsers']);
    Route::post('/editUser', [UserController::class, 'editUser']);
    Route::post('/addUser', [UserController::class, 'addUser']);
    Route::post('/changePassword', [UserController::class, 'changePassword']);
    Route::post('/testlanguage', [AuthController::class, 'testlanguage']);
});