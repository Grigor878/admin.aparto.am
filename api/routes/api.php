<?php

use App\Http\Controllers\CrmController;
use App\Http\Controllers\InterfaceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExchangeController;
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
    //Authentication routes
    Route::post('/signin', [AuthController::class, 'login']);
    Route::post('/testlanguage', [AuthController::class, 'testlanguage']);

    //Exchange amount
    Route::get('/getExchange',  [ExchangeController::class, 'getExchange']);

    //interFaceController
    Route::get('/getSaleHomes/{lang}',  [InterfaceController::class, 'getSaleHomes']);
    Route::get('/getRentHomes/{lang}',  [InterfaceController::class, 'getRentHomes']);
    Route::get('/getGeneralAdmin',  [InterfaceController::class, 'getGeneralAdmin']);
    Route::post('/addRecentSearch',  [InterfaceController::class, 'addRecentSearch']);
    Route::get('/getSearchAttributes/{lang}',  [InterfaceController::class, 'getSearchAttributes']);
    Route::post('/getSearchData/{lang}',  [InterfaceController::class, 'getSearchData']);
    Route::post('/getSeeMoreHomes/{lang}',  [InterfaceController::class, 'getSeeMoreHomes']);
    Route::post('/getCommunitySearch/{lang}',  [InterfaceController::class, 'getCommunitySearch']);
    Route::get('/getInterfaceProperties/{id}',  [InterfaceController::class, 'getInterfaceProperties']);
    Route::post('/getResultPageData/{lang}',  [InterfaceController::class, 'getResultPageData']);


    
    Route::middleware(['authcheck', 'checkactivated'])->group(function ($router) {

        //Home Controller
        Route::post('/getHome',  [HomeController::class, 'getHome']);
        Route::get('/getProperties/{id}',  [HomeController::class, 'getProperties']);
        Route::get('/updateHomeDate/{id}',  [HomeController::class, 'updateHomeDate']);
        Route::post('/addInactiveHome/{id}',  [HomeController::class, 'addInactiveHome']);
        Route::get('/activateHomeStatus/{id}',  [HomeController::class, 'activateHomeStatus']);
        Route::get('/archiveHomeStatus/{id}',  [HomeController::class, 'archiveHomeStatus']);
        Route::post('/multyPhoto/{id}',  [HomeController::class, 'multyPhoto']);
        Route::post('/addHome',  [HomeController::class, 'addHome']);
        Route::post('/addKeyword/{id}',  [HomeController::class, 'addKeyword']);
        Route::post('/addYandexLocation/{id}',  [HomeController::class, 'addYandexLocation']);
        Route::post('/addReservPhoto/{id}',  [HomeController::class, 'addReservPhoto']);
        Route::post('/documentUpload/{id}',  [HomeController::class, 'documentUpload']);

        //Home Edit
        Route::get('/editHome/{id}',  [HomeController::class, 'getEditHome']);
        Route::post('/editMultyPhoto/{id}',  [HomeController::class, 'editMultyPhoto']);
        Route::post('/addEditReservPhoto/{id}',  [HomeController::class, 'addEditReservPhoto']);
        Route::post('/editHome/{id}',  [HomeController::class, 'editHome']);
        Route::post('/editDocumentUpload/{id}',  [HomeController::class, 'editDocumentUpload']);
        Route::post('/editKeyword/{id}',  [HomeController::class, 'editKeyword']);
        Route::post('/editYandexLocation/{id}',  [HomeController::class, 'editYandexLocation']);

        //User Controller 
        Route::post('/getGlobalUser', [UserController::class, 'getGlobalUser']);
        Route::post('/changePassword', [UserController::class, 'changePassword']);
        Route::get('/getUsers', [UserController::class, 'getUsers']);
        Route::post('/editUser', [UserController::class, 'editUser']);
        Route::post('/addUser', [UserController::class, 'addUser']);
        Route::post('/changeStatus', [UserController::class, 'changeStatus']);
        Route::get('/getAgent', [UserController::class, 'getAgent']);
        Route::get('/getAdminModerator', [UserController::class, 'getAdminModerator']);

        //General form routes
        // Route::post('/addGlobalForm', [GeneralFormController::class, 'addGlobalForm']);
        Route::post('/addGlobalFormField', [GeneralFormController::class, 'addGlobalFormField']);
        Route::post('/removeGlobalFormField', [GeneralFormController::class, 'removeGlobalFormField']);
        Route::get('/getFormStructure', [GeneralFormController::class, 'getFormStructure']);
        Route::get('/getAllStructure', [GeneralFormController::class, 'getAllStructure']);
        Route::post('/createAddress', [GeneralFormController::class, 'createAddress']);
        Route::get('/getAddress', [GeneralFormController::class, 'getAddress']);
        // Route::get('/getAddressForStructure', [GeneralFormController::class, 'getAddressForStructure']);
        Route::post('/deleteAddress',  [GeneralFormController::class, 'deleteAddress']);
        Route::get('/getAddFields', [GeneralFormController::class, 'getAddedFields']);
        Route::get('/getAllAddresses/{id}', [GeneralFormController::class, 'getAllAddresses']);
        
        //Exchange amount
        Route::post('/setExchange',  [ExchangeController::class, 'setExchange']);

        //Recent Search 
        Route::get('/getRecentSearch',  [InterfaceController::class, 'getRecentSearch']);

        //CRM Controller
        Route::post('/addCrmUser',  [CrmController::class, 'addCrmUser']);
        Route::post('/editCrmUser/{id}',  [CrmController::class, 'editCrmUser']);
        Route::get('/getHomesForCrm',  [CrmController::class, 'getHomesForCrm']);
        Route::get('/getEditCrmUser/{id}',  [CrmController::class, 'getEditCrmUser']);
        Route::get('/getCrmUsers',  [CrmController::class, 'getCrmUsers']);
        
    });
});


 