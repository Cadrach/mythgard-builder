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
    public static function resolveDeckComputedFields(array $deck){
        if(self::$cards === null){
            self::$cards = Card::select('id', 'card_gems', 'card_rarity', 'card_rarity_index', 'card_type')->get()->keyBy('id');
            self::$cardCountByRarities = self::$cards->groupBy('card_rarity')->map(function($v){return count($v);});
        }

        $final = [
            'dck_cost' => 0, //cost in essence
            'dck_nb_cards' => 0,
            'dck_nb_creatures' => 0,
            'dck_nb_spells' => 0,
            'dck_nb_laneenchantments' => 0,
            'dck_nb_artifacts' => 0,
            'dck_nb_commons' => 0,
            'dck_nb_uncommons' => 0,
            'dck_nb_rares' => 0,
            'dck_nb_mythics' => 0,
        ];
        $maxByRarity = Card::getMaxByRarity();
        $essenceCostByRarity = Card::getEssenceCostByRarity();

        //Fill with zeros
        $binaries = [];
        foreach(self::$cardCountByRarities as $rarity => $count){
            $binaries[$rarity] = str_repeat('0', $count * $maxByRarity[$rarity]);
        }

        //Set 1 for each card we own in the correct place
        $colors = [];
        foreach($deck as $row){
            //Card info
            $card = self::$cards[$row['id']];

            //Update deck cost in essence
            $final['dck_cost']+= $essenceCostByRarity[$card['card_rarity']] * $row['count'];
            $final['dck_nb_cards']++;
            $final['dck_nb_' . strtolower($card['card_rarity']) . 's']++;
            $final['dck_nb_' . strtolower($card['card_type']) . 's']++;

            //Update colors
            foreach(array_unique(str_split($card['card_gems'])) as $gem){
                @$colors[$gem]+=$row['count'];
            }

            //Update binary rarity field
            $start = $maxByRarity[$card['card_rarity']] * $card['card_rarity_index'];
            for($i = 0; $i<$row['count']; $i++){
                $binaries[$card['card_rarity']][$start + $i] = '1';
            }
        }

        //Colors
        asort($colors, SORT_DESC);
        $final['dck_colors'] = "'" . implode('', array_keys($colors)) . "'";

        //Binary string starts on the right, so reverse everything
        foreach($binaries as $k=>$bin){
            $b = strrev($bin);
            $final["test_dck_bin_$k"] = "'$b'";
            $final["dck_bin_$k"] = "b'$b'";
        }

        //Return the final array
        return $final;
    }
}
