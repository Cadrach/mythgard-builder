<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use App\Models\Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Console\Input\Input;

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
    public function getList(Request $request){
        //Basic requests
        $decks = Deck::where('dck_public','=',1)
            ->with('user:id,name,image');

        foreach($request->get('filters', []) as $key=>$value){
            switch($key){
                case 'cards':
                    $binaries = Helper::deckToBinaries($value);
                    foreach($binaries as $field => $bin){
                        if(strpos($bin, '1') !== false){
                            $decks->whereRaw("BIT_COUNT(b'$bin' & ~$field) = 0");
//                            $decks->whereRaw("test_$field LIKE '".str_replace('0','_', $bin)."'");
                        }
                    }
                break;
                case 'global':
                    $decks->whereRaw("(dck_name LIKE ? OR dck_description LIKE ?)");
                    $decks->addBinding(array_fill(0, 2, "%$value%"), 'where');
                break;
            }
        }

//        echo $decks->toSql();die();

        return $decks
            ->orderBy('dck_stars', 'desc')
            ->paginate(10);
    }
}
