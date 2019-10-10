<?php

use Illuminate\Database\Seeder;

use \App\Models\Deck;
use \App\Models\Card;

class DeckSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $decksToBuild = 20000;

        //By rarity
        $allowed = [
            Card::RARITY_MYTHIC => 1,
            Card::RARITY_RARE => 2,
            Card::RARITY_UNCOMMON => 3,
            Card::RARITY_COMMON => 4,
        ];

        //Clear current decks
        Deck::truncate();

        //Get cards and group them by colors
        $cards = Card::all()->groupBy('ide_faction');

        while($decksToBuild-->0){
            $deck = [];
            $colors = [];
            $count = 0;

            //Selecting 1 to 3 colors
            $set = $cards->random(rand(1,3))->flatten(0)->toArray();

            //Creating deck from a selection of cards
            while($count<40){
                $k = array_rand($set);
                $n = rand(1, $allowed[$set[$k]['card_rarity']]);
                $count+=$n;
                $deck[] = ['id' => $set[$k]['id_card'], 'count' => $n];
                $colors[] = $set[$k]['ide_faction'];
                array_splice($set, $k, 1);
            }

            //Work on colors
            sort($colors);
            $colors = array_values(array_unique($colors));

            //Generate binary fields
            $binaries = \App\Models\Helper::deckToBinaries($deck);

            //Insert
            Deck::insert(array_merge([
                'ide_user' => rand(1,1000),
                'dck_name' => "Deck $decksToBuild",
                'dck_version' => "0.16.2",
                'dck_cards' => json_encode($deck),
                'dck_factions' => json_encode($colors),
            ], $binaries));

            echo str_pad("Decks remaining $decksToBuild", 50) . "\r";
        }
        echo "\n";
    }
}
