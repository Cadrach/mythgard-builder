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
            'Š'=>'S', 'š'=>'s', '?'=>'Dj', '?'=>'dj', 'Ž'=>'Z', 'ž'=>'z', '?'=>'C', '?'=>'c', '?'=>'C', '?'=>'c',
            'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A', 'Ä'=>'A', 'Å'=>'A', 'Æ'=>'A', 'Ç'=>'C', 'È'=>'E', 'É'=>'E',
            'Ê'=>'E', 'Ë'=>'E', 'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I', 'Ñ'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O',
            'Õ'=>'O', 'Ö'=>'O', 'Ø'=>'O', 'Ù'=>'U', 'Ú'=>'U', 'Û'=>'U', 'Ü'=>'U', 'Ý'=>'Y', 'Þ'=>'B', 'ß'=>'Ss',
            'à'=>'a', 'á'=>'a', /*'â'=>'a',*/ 'ã'=>'a', 'ä'=>'a', 'å'=>'a', 'æ'=>'a', 'ç'=>'c', 'è'=>'e', 'é'=>'e',
            'ê'=>'e', 'ë'=>'e', 'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i', 'ð'=>'o', 'ñ'=>'n', 'ò'=>'o', 'ó'=>'o',
            'ô'=>'o', 'õ'=>'o', 'ö'=>'o', 'ø'=>'o', 'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ý'=>'y', 'ý'=>'y', 'þ'=>'b',
            'ÿ'=>'y', '?'=>'R', '?'=>'r',
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
