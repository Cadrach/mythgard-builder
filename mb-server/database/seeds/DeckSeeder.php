<?php

use App\Models\Helper;
use Illuminate\Database\Seeder;

use \App\Models\Deck;
use \App\Models\Card;
use Illuminate\Support\Facades\DB;

class DeckSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Clear current decks
        Deck::truncate();

        $cards = Card::selectRaw('id, LOWER(card_name_clean) as name')->get()->pluck('id', 'name')->toArray();
//        print_r($cards);die();
        $dir = storage_path("hub_data/");
        foreach(scandir($dir) as $k=>$file){
            //Ignore non JSON
            if(pathinfo($dir.$file, PATHINFO_EXTENSION) != 'json') continue;

            //Get JSON
            $json = json_decode(file_get_contents($dir.$file), true);

            //Ignore no cards
            if( ! isset($json['cards'][0]['data']['deck']['cardDecks']['nodes'])) continue;
            echo $file."\n";

            //Prepare cards array
            $deckCards = [];
            foreach($json['cards'][0]['data']['deck']['cardDecks']['nodes'] as $card){
                $name = Helper::normalizeName($card['card']['name']);
                $deckCards[] = ['id' => $cards[$name], 'count' => min($card['quantity'], 4)];
            }

            //Data from the deck
            $deckData = $json['deck'][0]['data']['deck'];

            $deck = new Deck();
            $deck->ide_user = $deckData['author']['id'];
            $deck->ide_power = $deckData['power']['id'];
            $deck->ide_path = $deckData['path']['id'];
            $deck->dck_name = "{$deckData['name']} [{$deckData['id']}]";
            $deck->dck_cards = $deckCards;
            $deck->dck_stars = rand(0, 5000);
            $deck->dck_public = 1;
            $deck->save();
        }
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function runDeprecated()
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
            $count = 0;

            //Selecting 1 to 3 colors
            $set = $cards->random(rand(1,3))->flatten(0)->toArray();

            //Creating deck from a selection of cards
            while($count<40){
                $k = array_rand($set);
                $n = rand(1, $allowed[$set[$k]['card_rarity']]);
                $count+=$n;
                $deck[] = ['id' => $set[$k]['id'], 'count' => $n];
                $colors[] = $set[$k]['ide_faction'];
                array_splice($set, $k, 1);
            }

            //Generate binary fields
            $binaries = \App\Models\Helper::deckToBinaries($deck);

            $data = [
                'ide_user' => rand(1,1000),
                'dck_name' => "'Deck $decksToBuild'",
                'dck_version' => "'0.16.2'",
                'dck_cards' => "'".json_encode($deck)."'",
                'dck_stars' => rand(0, 5000),
                'dck_public' => 1,
                'dck_factions' => $binaries['dck_factions'],
                'dck_bin_common' => "b'{$binaries['dck_bin_common']}'",
                'dck_bin_uncommon' => "b'{$binaries['dck_bin_uncommon']}'",
                'dck_bin_rare' => "b'{$binaries['dck_bin_rare']}'",
                'dck_bin_mythic' => "b'{$binaries['dck_bin_mythic']}'",
                'test_dck_bin_common' => "'{$binaries['dck_bin_common']}'",
                'test_dck_bin_uncommon' => "'{$binaries['dck_bin_uncommon']}'",
                'test_dck_bin_rare' => "'{$binaries['dck_bin_rare']}'",
                'test_dck_bin_mythic' => "'{$binaries['dck_bin_mythic']}'",
            ];

            //Raw insert to be able to use binaries
            DB::statement("INSERT INTO decks (".implode(',', array_keys($data)).") VALUES (".implode(',', $data).")");


            echo str_pad("Decks remaining $decksToBuild", 50) . "\r";
        }
        echo "\n";
    }
}
