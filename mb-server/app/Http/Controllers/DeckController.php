<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Deck;
use App\Models\Favorite;
use App\Models\Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $req = Deck::with('user:id,name')
            ->select('decks.*')
            ->where("dck_public", "=", 1)
            ->where("decks.id", "=", $id);

        $user = $this->_user();
        if($user){
            $req->selectRaw('IF(favorites.id IS NULL, 0, 1) as is_favorite');
            $req->leftJoin('favorites', function($join) use ($user){
                $join->on('favorites.ide_deck', '=', 'decks.id');
                $join->on('favorites.ide_user', '=', DB::raw($user->id));
            });
        }

        return $req->firstOrFail();
    }

    /**
     * Get list of decks
     * @return mixed
     */
    public function getList(Request $request){
        //Basic requests
        $decks = Deck::where('dck_public','=',1)
            ->with('user:id,name,image');

        //Sorting
        $sorter = $request->get('sorter');
        $sorter = isset($sorter['field']) ? $sorter : ['field' => 'dck_stars', 'order' => 'descend'];

        //If we have a user, we can compute more information
        $user = $this->_user();
        if($user && $user->cards){
            //Join current user
            $decks->leftJoin("users", "users.id", "=", DB::raw($user->id));

            //Create stats points based on user cards
            $rarities = Card::getEssenceCostByRarity();
            $sqlTotal = $sqlCount = [];
            foreach($rarities as $rarity => $cost){
                $rarityCount = "BIT_COUNT(dck_bin_{$rarity} & ~bin_{$rarity})";
                $sqlTotal[] = "$rarityCount * $cost";
                $sqlCount[] = "dck_nb_{$rarity}s - $rarityCount as user_cards_{$rarity}s";
            }

            //Select the data
            $decks->selectRaw("
                decks.*,
                ".implode(' + ', $sqlTotal)." as user_cost,
                ".implode(', ', $sqlCount)
            );

            if(isset($sorter['field']) && $sorter['field'] == 'dck_cost'){
                $sorter['field'] = 'user_cost';
            }
        }

        foreach($request->get('filters', []) as $key=>$value){
            switch($key){
                case 'cards':
                    $binaries = Helper::resolveDeckComputedFields($value);
                    foreach($binaries as $field => $bin){
                        //$bin = the cards that are requested by me
                        //$field contains the cards in the deck
                        //We want all the decks that have the card that I have
                        if(strpos($bin, '1') !== false && strpos($field, 'dck_bin') === 0){
                            $decks->whereRaw("BIT_COUNT($bin & ~$field) = 0");
//                            $decks->whereRaw("test_$field LIKE '".str_replace('0','_', $bin)."'");
                        }
                    }
                break;
                case 'colors':
                    if(count($value)){
                        $search = "[" . collect($value)->map(function($v){return intval($v['id']);})->sort()->implode(',') . "]";
                        $decks->where('dck_factions', '=', $search);
                    }
                    break;
                case 'global':
                    $decks->whereRaw("(dck_name LIKE ? OR dck_description LIKE ?)");
                    $decks->addBinding(array_fill(0, 2, "%$value%"), 'where');
                break;
            }
        }

//        echo($decks->toSql());
//        die();

        return $decks
            ->orderBy($sorter['field'], $sorter['order'] == 'descend' ? 'desc':'asc')
            ->paginate(10);
    }

    /**
     * Save current user cards
     * @param Request $request
     */
    public function postSaveUserCards(Request $request){
        $cards = $request->all();
        $user = $this->_user();
        $user->cards = $cards;
        $user->save();
        $binaries = Helper::resolveDeckComputedFields($cards);

        //Update the line. WARNING: this is not protected so careful what you put there!
        DB::update("
            UPDATE {$user->getTable()} SET
                bin_common = {$binaries['dck_bin_common']},
                bin_uncommon = {$binaries['dck_bin_uncommon']},
                bin_rare = {$binaries['dck_bin_rare']},
                bin_mythic = {$binaries['dck_bin_mythic']}
            WHERE id={$user->id}
        ");
    }

    /**
     * Toggle favorite
     * @param Request $request
     * @return array
     */
    public function postToggleFavorite(Request $request){
        $deckId = $request->get('id');
        $userId = $this->_user()->id;
        $deck = Deck::findOrFail($deckId);
        $deck->timestamps = false;
        $favorite = Favorite::where('ide_user', '=', $userId)->where('ide_deck', '=', $deckId)->first();


        $isFavorite = 0;
        if($favorite){
            $favorite->delete();
            $deck->dck_stars--;
            $deck->save();
        }
        else{
            $isFavorite = 1;
            $favorite = new Favorite();
            $favorite->ide_user = $userId;
            $favorite->ide_deck = $deckId;
            $favorite->save();
            $deck->dck_stars++;
            $deck->save();
        }

        return [
            'is_favorite' => $isFavorite,
            'dck_stars' => $deck->dck_stars,
        ];
    }

    /**
     * Tracks download of a deck
     * @param Request $request
     * @param $id
     * @return array
     */
    public function getUpdateDeckDownload(Request $request, $id){
        $session = $request->session();
        $exported = $session->get('exportedDeck', []);
        if( ! in_array($id, $exported)){
            $exported[] = $id;
            $session->put('exportedDeck', $exported);
            DB::statement("UPDATE decks SET dck_downloads = dck_downloads+1 WHERE id = ?", [$id]);
            return ['tracked' => true];
        }
        return ['tracked' => false];
    }
}
