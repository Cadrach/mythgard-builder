<?php

namespace App\Http\Controllers;

use App\Models\Card;

class CardController extends Controller
{
    public function getList(){
        return Card::all();
    }
}
