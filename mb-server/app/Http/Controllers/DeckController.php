<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DeckController extends Controller
{
    public function getMyDecks(){
        $idUser = Auth::user()->id;
        return Deck::where('ide_user', '=', $idUser)->get();
    }
}
