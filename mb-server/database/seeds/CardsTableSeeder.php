<?php

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
        $file = database_path('seeds/mythgard-0.16.1.json');
        $json = json_decode(file_get_contents($file));

        $factions = [
            'blue' => 1,
            'green' => 2,
            'orange' => 3,
            'purple' => 4,
            'red' => 5,
            'yellow' => 6,
        ];

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
                'ide_faction' => $factions[$card->faction],
                'card_rarity_index' => $rarityIndex[$card->rarity]++,
                'id_rhino' => $card->cardid,
                'card_name' => $card->cardname,
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
            ];
        }

        //Insert cards
        DB::table('cards')->truncate();
        DB::table('cards')->insert($cards);

    }
}
