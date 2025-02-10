<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OffreController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PostuleController;
use App\Http\Controllers\Api\CondidatureController;
use App\Http\Controllers\Api\RecruteurController;
use App\Http\Controllers\Api\NotificationController;

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
Route::apiResource('offres', OffreController::class);
Route::post('/newoffre', [OffreController::class, 'store']);
Route::put('/editoffres/{id}', [OffreController::class, 'update']);
// routes/api.php
Route::put('/offres/{id}/{approuve}', [OffreController::class, 'updateApproval']);
Route::get('/admins', [OffreController::class, 'getadmin']);


// Routes utilisateur
Route::apiResource('users', UserController::class);
Route::get('/users/{id}', [UserController::class, 'userbyid']);
// routes/api.php


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// routes/api.php


// Routes candidature
Route::apiResource('condidatures', CondidatureController::class);
Route::post('/newcondidature', [CondidatureController::class, 'store']);
Route::get('/user/{id}/condidature', [CondidatureController::class, 'showByUserId']);
//postule
Route::apiResource('postules', PostuleController::class);
//recruteur
Route::apiResource('recruteurs', RecruteurController::class);
Route::post('newcrecruteur', [RecruteurController::class, 'store']);
Route::get('/user/{id}/recruteur', [RecruteurController::class, 'showByUserId']);
Route::get('/user/{userId}/recruteur/offres', [RecruteurController::class, 'getOffresByUserId']);
//notification
Route::apiResource('notifications', NotificationController::class);
Route::post('/newnotification', [NotificationController::class, 'store']);
Route::get('notifications/condidature/{condidatureId}', [NotificationController::class, 'getNotifsByCondidature']);
//auth
use App\Http\Controllers\Api\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);