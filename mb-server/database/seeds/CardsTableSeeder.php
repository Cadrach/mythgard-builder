<?php

use App\Models\Faction;
use Illuminate\Database\Seeder;
use \App\Models\Card;
use \App\Models\Helper;

class CardsTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $file = database_path('seeds/mythgard-0.16.2.json');
        $json = json_decode(file_get_contents($file));

        $factions = Faction::all();
        $factionsByName = $factions->keyBy('fac_name')->toArray();
        $factionsById = $factions->keyBy('id')->toArray();

        //Default values
        $cards = [];

        //Fill rarities index with 0 for each rarity
        $rarityIndex = array_combine(Card::getConstants()['RARITY'], array_fill(0, count(Card::getConstants()['RARITY']), 0));
        $maxByRarityIndex = Card::getMaxByRarity();

        //Sort by rhino id to always create the cards in the same order
        $json = collect($json)->sortBy('cardid')->toArray();
        foreach($json as $card){
            $cleanedName = Helper::normalizeName($card->cardnameclean);
            $cards[] = [
                'ide_faction' => $factionsByName[$card->faction]['id'],
                'card_rarity_index' => $rarityIndex[$card->rarity]++,
                'id_rhino' => $card->cardid,
                'card_name' => ucwords($card->cardname),
                'card_name_export' => $card->cardnameclean,
                'card_name_clean' => $cleanedName,
                'card_image' => "$cleanedName.png",
                'card_text' => $card->text,
                'card_text_flavor' => $card->flavor,
                'card_set' => $card->set,
                'card_type' => $card->type,
                'card_subtype' => $card->subtypes,
                'card_cost' => $card->cost,
                'card_gems' => $card->influence,
                'card_attack' => $card->attack,
                'card_health' => $card->health,
                'card_rarity' => $card->rarity,
                'card_max_in_deck' => $maxByRarityIndex[$card->rarity],
                'card_keywords' => !$card->keywords ? null : collect(explode(',', $card->keywords))->map(function($v){return trim($v);})->toJson(),
                'card_color_count' => count(array_unique(str_split($card->influence))),
            ];
        }

        //Now we will be sorting cards
        usort($cards, function($a, $b) use($factionsById){
            $order = ['ide_faction', 'card_cost',];
            $a['ide_faction'] = $a['card_color_count'] > 1 ? $a['card_cost']*100:$factionsById[$a['ide_faction']]['fac_order'];
            $b['ide_faction'] = $b['card_color_count'] > 1 ? $b['card_cost']*100:$factionsById[$b['ide_faction']]['fac_order'];
            $c = '';
            foreach($order as $key){
                $c.= str_pad($a[$key] - $b[$key], 10, '0', STR_PAD_LEFT);
            }
            $c.= strcmp($a['card_name'], $b['card_name']);
            return $c;
        });

        foreach($cards as $k=>$card){
            $cards[$k]['card_order'] = $k;
        }

        //Insert cards
        DB::table('cards')->truncate();
        DB::table('cards')->insert($cards);
    }
}
