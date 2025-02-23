<?php

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

//Welcome page (not logged in)
Route::get('/', 'HomeController@index');

//Authentication
Auth::routes();
Route::get('login/{provider}', 'Auth\\SocialController@redirect');
Route::get('login/{provider}/callback','Auth\\SocialController@callback');
Route::get('logout','Auth\\LoginController@logout');

//Authenticated pages
Route::middleware('auth:web')->group(function(){
    //Home page (logged in)
    Route::get('/home', 'HomeController@index')->name('home');
});

//Unauthenticated pages under "json" prefix
Route::prefix('json')->group(function(){
    Route::post('/decks', 'DeckController@getList');
    Route::get('/deck/{id}', 'DeckController@getDetail');
    Route::get('/dictionaries', 'HomeController@getDictionaries');
    Route::get('/update-deck-download/{id}', 'DeckController@getUpdateDeckDownload');
    Route::post('/puzzles', 'PuzzleController@getList');
});

//Authenticated pages under "json" prefix
Route::middleware('auth:web')->prefix('json')->group(function () {
    //Deck
    Route::get('/my-decks', 'DeckController@getMyDecks');
    Route::post('/deck/save', 'DeckController@postSave');
    Route::post('/save-user-cards', 'DeckController@postSaveUserCards');
    Route::post('/toggle-favorite', 'DeckController@postToggleFavorite');
});
