<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use Illuminate\Http\Request;

class DeckController extends Controller
{
    public function getMyDecks(){
        $idUser = $this->_user()->id;
        return Deck::where('ide_user', '=', $idUser)->get();
    }

    /**
     * Save a deck
     * @param Request $request
     * @return Deck
     */
    public function postSave(Request $request){
        $idUser = $this->_user()->id;
        $data = $request->all();

        if(isset($data['id']) && $data['id']){
            //Retrieve the owned deck
            $deck = Deck::where('ide_user', '=', $idUser)->where('id', '=', $data['id'])->firstOrFail();
            $deck->fill($data);
            $deck->save();
        }
        else{
            //Create a new deck
            $deck = new Deck();
            $deck->fill($data);
            $deck->ide_user = $idUser;
            $deck->dck_version = '0.16.2';
            $deck->dck_factions = [];
            $deck->save();
            $deck = $deck->fresh();
        }

        return $deck;
    }

    /**
     * Get list of decks
     * @return mixed
     */
    public function getList(){
        return Deck::where('dck_public','=',1)
            ->with('user:id,name,image')
            ->orderBy('dck_stars', 'desc')
            ->paginate(10);
    }
}
