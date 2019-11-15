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
        $description = '{
	"blocks": [{
			"key": "c6ati",
			"text": "This deck is a courtesy of MythgardHub. If this is your deck, you can:",
			"type": "unstyled",
			"depth": 0,
			"inlineStyleRanges": [{
					"offset": 27,
					"length": 11,
					"style": "color-rgba(255,255,255,0.65)"
				}, {
					"offset": 27,
					"length": 11,
					"style": "bgcolor-rgb(35,35,46)"
				}, {
					"offset": 27,
					"length": 11,
					"style": "fontsize-14"
				}, {
					"offset": 27,
					"length": 11,
					"style": "fontfamily-Open Sans"
				}, {
					"offset": 27,
					"length": 11,
					"style": "color-rgb(24,144,255)"
				}, {
					"offset": 27,
					"length": 11,
					"style": "bgcolor-transparent"
				}
			],
			"entityRanges": [{
					"offset": 27,
					"length": 11,
					"key": 0
				}
			],
			"data": {}
		}, {
			"key": "sn2",
			"text": "Ask for it to be linked to your account (just send me its name on Discord or Reddit)",
			"type": "unordered-list-item",
			"depth": 0,
			"inlineStyleRanges": [],
			"entityRanges": [],
			"data": {}
		}, {
			"key": "8cs3e",
			"text": "Ask for it to be removed from here (I will need the same info)",
			"type": "unordered-list-item",
			"depth": 0,
			"inlineStyleRanges": [],
			"entityRanges": [],
			"data": {}
		}, {
			"key": "2jq47",
			"text": "This deck was created by %s.",
			"type": "unstyled",
			"depth": 0,
			"inlineStyleRanges": [{
					"offset": 25,
					"length": %d,
					"style": "BOLD"
				}
			],
			"entityRanges": [],
			"data": {}
		}
	],
	"entityMap": {
		"0": {
			"type": "LINK",
			"mutability": "MUTABLE",
			"data": {
				"url": "https://mythgardhub.com/deck?id=%d",
				"title": "<span data-offset-key=\"c6ati-1-0\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span data-text=\"true\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\">MythgardHub</span></span>",
				"targetOption": "_blank",
				"_map": {
					"type": "LINK",
					"mutability": "MUTABLE",
					"data": {
						"url": "https://mythgardhub.com/deck?id=%d",
						"title": "<span data-offset-key=\"c6ati-1-0\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span data-text=\"true\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\">MythgardHub</span></span>",
						"targetOption": "_blank"
					}
				}
			}
		}
	}
}';

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

            $date = isset($deckData['deckPreviews']['nodes'][0]['deckCreated']) ? $deckData['deckPreviews']['nodes'][0]['deckCreated']:null;
            $stars = isset($deckData['deckPreviews']['nodes'][0]['votes']) ? $deckData['deckPreviews']['nodes'][0]['votes']:0;
            $author = isset($deckData['author']['username']) ? $deckData['author']['username']:'';

            $deck = new Deck();
            $deck->ide_user = 2;
            $deck->ide_power = $deckData['power']['id'];
            $deck->ide_path = $deckData['path']['id'];
            $deck->dck_name = $deckData['name'];
            $deck->dck_cards = $deckCards;
            $deck->dck_stars = $stars;
            $deck->dck_public = 1;
            $deck->dck_description = sprintf($description, $author, strlen($author), $deckData['id'], $deckData['id']);

            if($date){
                $carbonDate = \Carbon\Carbon::createFromTimeString($date)->toDateTimeString();
                $deck->created_at = $carbonDate;
                $deck->updated_at = $carbonDate;
            }

            $deck->save();
        }

		$customDeck = <<<EOT
			INSERT INTO `decks` (`ide_user`, `ide_path`, `ide_power`, `dck_name`, `dck_public`, `dck_description`, `dck_version`, `dck_factions`, `dck_colors`, `dck_cost`, `dck_nb_cards`, `dck_nb_creatures`, `dck_nb_spells`, `dck_nb_laneenchantments`, `dck_nb_artifacts`, `dck_nb_commons`, `dck_nb_uncommons`, `dck_nb_rares`, `dck_nb_mythics`, `dck_cards`, `dck_stars`, `dck_views`, `dck_downloads`, `created_at`, `updated_at`, `test_dck_bin_common`, `test_dck_bin_uncommon`, `test_dck_bin_rare`, `test_dck_bin_mythic`, `dck_bin_common`, `dck_bin_uncommon`, `dck_bin_rare`, `dck_bin_mythic`) VALUES (1, 6, 4, 'Budget Blue-Green Tempo October 2019', 1, '{"blocks":[{"key":"as0c6","text":"Our second pick for this month is a deck that relies more on staying ahead on tempo than strictly ramming the gas pedal to the floorboard like Mono-Red enjoys doing. With a deck like Blue-Green Tempo, your success hinges on your ability to properly identify and handle threats. You need to know not just which minions actually present a problem for you, but your best way around said problem.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":392,"style":"fontsize-16"}],"entityRanges":[],"data":{}},{"key":"3q4","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"52dpf","text":"With early minions like Grinning Kolobok to get you out ahead and accelerate your large midrange threats and   to make your   or   a must-answer problem as early as turn 3, you\'re really trying to position well to be carried in the midgame by threats like   and  . Our green suite provides us some utility, with   and   making sure we see our removal options like   and  .","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":109,"style":"fontsize-16"},{"offset":110,"length":14,"style":"fontsize-16"},{"offset":125,"length":4,"style":"fontsize-16"},{"offset":130,"length":126,"style":"fontsize-16"},{"offset":257,"length":115,"style":"fontsize-16"}],"entityRanges":[{"offset":109,"length":1,"key":0},{"offset":124,"length":1,"key":1},{"offset":129,"length":1,"key":2},{"offset":256,"length":1,"key":3},{"offset":262,"length":1,"key":4},{"offset":312,"length":1,"key":5},{"offset":318,"length":1,"key":6},{"offset":364,"length":1,"key":7},{"offset":370,"length":1,"key":8}],"data":{}}],"entityMap":{"0":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":34,"name_export":"godsblud transfusion"}},"1":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":14,"name_export":"einherjar thane"}},"2":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":216,"name_export":"gallows boy"}},"3":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":55,"name_export":"blackened jotun"}},"4":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":63,"name_export":"hyperborean"}},"5":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":249,"name_export":"gamayun"}},"6":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":221,"name_export":"raid the tombs"}},"7":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":214,"name_export":"detained"}},"8":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":206,"name_export":"rewind hex"}}}}', '0.16.2', '[1,2]', 'bg', 7000, 40, 23, 15, 2, 0, 18, 17, 4, 1, '[{"id":200,"count":3},{"id":214,"count":2},{"id":206,"count":1},{"id":221,"count":4},{"id":244,"count":2},{"id":210,"count":1},{"id":204,"count":1},{"id":216,"count":4},{"id":14,"count":4},{"id":249,"count":3},{"id":17,"count":1},{"id":34,"count":2},{"id":43,"count":1},{"id":42,"count":1},{"id":51,"count":2},{"id":55,"count":2},{"id":57,"count":2},{"id":62,"count":1},{"id":63,"count":2},{"id":32,"count":1}]', 0, 0, 0, '2019-11-15 23:25:32', '2019-11-15 23:42:53', '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001111000011110011000000010000000000000001000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000011110000000000000000000000000000', '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111000011000000000000000000000000000000000000000111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011011011000000001000000000011000000000000000000000000000', '00000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100001100000000000000', '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000', '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0ру\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0р\0\0\0', '\0\0\0\0\0\0\0\0\0\0\0\0\0\0Ж\0\0\0\0А\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0џ\0А\0\0\0', '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0ј\0', '\0\0\0\0\0\0\0\0\0\0\0\0')
EOT;

		DB::statement($customDeck);
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
