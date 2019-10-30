<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Helper extends Model
{
    protected static $cards = null;

    protected static $cardCountByRarities = null;


    /**
     * Clean up a card name
     * @param $string
     * @return string
     */
    public static function normalizeName ($string) {
        $table = array(
            '�'=>'S', '�'=>'s', '?'=>'Dj', '?'=>'dj', '�'=>'Z', '�'=>'z', '?'=>'C', '?'=>'c', '?'=>'C', '?'=>'c',
            '�'=>'A', '�'=>'A', '�'=>'A', '�'=>'A', '�'=>'A', '�'=>'A', '�'=>'A', '�'=>'C', '�'=>'E', '�'=>'E',
            '�'=>'E', '�'=>'E', '�'=>'I', '�'=>'I', '�'=>'I', '�'=>'I', '�'=>'N', '�'=>'O', '�'=>'O', '�'=>'O',
            '�'=>'O', '�'=>'O', '�'=>'O', '�'=>'U', '�'=>'U', '�'=>'U', '�'=>'U', '�'=>'Y', '�'=>'B', '�'=>'Ss',
            '�'=>'a', '�'=>'a', /*'�'=>'a',*/ '�'=>'a', '�'=>'a', '�'=>'a', '�'=>'a', '�'=>'c', '�'=>'e', '�'=>'e',
            '�'=>'e', '�'=>'e', '�'=>'i', '�'=>'i', '�'=>'i', '�'=>'i', '�'=>'o', '�'=>'n', '�'=>'o', '�'=>'o',
            '�'=>'o', '�'=>'o', '�'=>'o', '�'=>'o', '�'=>'u', '�'=>'u', '�'=>'u', '�'=>'y', '�'=>'y', '�'=>'b',
            '�'=>'y', '?'=>'R', '?'=>'r',
            "'" => '', "," => "", " " => "_", ":" => "", '"' => "",

        );

        return preg_replace("/[^a-zA-Z0-9_]+/", "", strtolower(strtr(ucwords($string, ' -'), $table)));
    }

    /**
     * Creates the 4 binaries comparison strings from deck data
     * @param array $deck
     * @return array
     */
    public static function deckToBinaries(array $deck){
        if(self::$cards === null){
            self::$cards = Card::select('id', 'card_rarity', 'card_rarity_index')->get()->keyBy('id');
            self::$cardCountByRarities = self::$cards->groupBy('card_rarity')->map(function($v){return count($v);});
        }

        $costs = Card::getCosts();

        //Fill with zeros
        $binaries = [];
        foreach(self::$cardCountByRarities as $rarity => $count){
            $binaries[$rarity] = str_repeat('0', $count * $costs[$rarity]);
        }

        //Set 1 for each card we own in the correct place
        foreach($deck as $row){
            $card = self::$cards[$row['id']];
            $start = $costs[$card['card_rarity']] * $card['card_rarity_index'];
            for($i = 0; $i<$row['count']; $i++){
                $binaries[$card['card_rarity']][$start + $i] = '1';
            }
        }

        //Binary string starts on the right, so reverse everything
        $final = [];
        foreach($binaries as $k=>$bin){
            $final["dck_bin_$k"] = strrev($bin);
        }

        //Return the final array
        return $final;
    }
}
