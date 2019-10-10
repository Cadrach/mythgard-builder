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
Route::get('/', function () {
    return view('welcome');
});

//Home page (logged in)
Route::get('/home', 'HomeController@index')->name('home');

//Authentication
Auth::routes();
Route::get('login/{provider}', 'Auth\\SocialController@redirect');
Route::get('login/{provider}/callback','Auth\\SocialController@callback');


Route::middleware('auth:web')->prefix('json')->group(function () {
    Route::get('/cards', 'CardController@getList');

    //Deck
    Route::get('/my-decks', 'DeckController@getMyDecks');

});
