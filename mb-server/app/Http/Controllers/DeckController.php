<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use App\Models\Helper;
use Illuminate\Http\Request;

class DeckController extends Controller
{
    /**
     * Returns all the decks I own
     * @return mixed
     */
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
     * Returns the detail of a deck
     * @param $id
     * @return \Illuminate\Database\Eloquent\Model|static
     */
    public function getDetail($id){
        //TODO: allow to return a private deck, if we are the user logged-in
        return Deck::with('user:id,name')
            ->where("dck_public", "=", 1)
            ->where("id", "=", $id)
            ->firstOrFail();
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
                    $binaries = Helper::resolveDeckComputedFields($value);
                    foreach($binaries as $field => $bin){
                        if(strpos($bin, '1') !== false && strpos($field, 'dck_bin') === 0){
                            $decks->whereRaw("BIT_COUNT($bin & ~$field) = 0");
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
