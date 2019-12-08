<?php

use Illuminate\Database\Seeder;

use \App\Models\Puzzle;
use Illuminate\Support\Facades\DB;

class PuzzleSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        //Clear current decks
        Puzzle::truncate();

        $puzzles = [[
            'ide_user' => 1,
            'pzl_name' => "Minmaxer's Sapo isn't the biggest fish in the sea!",
            'file' => 'puzzle_1.txt',
        ],[
            'ide_user' => 1,
            'pzl_name' => "Minmaxer's Dude, where's YOUR sidecar?",
            'file' => 'puzzle_2.txt',
        ],[
            'ide_user' => 1,
            'pzl_name' => "Minmaxer's So you think you can Loop?",
            'file' => 'puzzle_3.txt',
        ],[
            'ide_user' => 1,
            'pzl_name' => "Minmaxer's Angels and Demons",
            'file' => 'puzzle_5.txt',
        ],[
            'ide_user' => 1,
            'pzl_name' => "Can you pass your initiation ritual into clan Urdnot?",
            'file' => 'puzzle_4.txt',
        ],];

        foreach($puzzles as $p){
            $p['pzl_public'] = 1;
            $p['pzl_export'] = file_get_contents(database_path("seeds/puzzle_files/{$p['file']}"));
            $p['created_at'] = $p['updated_at'] = new DateTime();
            unset($p['file']);
            Puzzle::insert($p);
        }

//		$customDeck = <<<EOT
//			INSERT INTO `puzzles` (`ide_user`, `dck_name`, `dck_public`, `dck_description`, `dck_version`, `dck_factions`, `dck_colors`, `dck_cost`, `dck_nb_cards`, `dck_nb_creatures`, `dck_nb_spells`, `dck_nb_laneenchantments`, `dck_nb_artifacts`, `dck_nb_commons`, `dck_nb_uncommons`, `dck_nb_rares`, `dck_nb_mythics`, `dck_cards`, `dck_stars`, `dck_views`, `dck_downloads`, `created_at`, `updated_at`, `test_dck_bin_common`, `test_dck_bin_uncommon`, `test_dck_bin_rare`, `test_dck_bin_mythic`, `dck_bin_common`, `dck_bin_uncommon`, `dck_bin_rare`, `dck_bin_mythic`) VALUES (1, 6, 4, 'Budget Blue-Green Tempo October 2019', 1, '{"blocks":[{"key":"as0c6","text":"Our second pick for this month is a deck that relies more on staying ahead on tempo than strictly ramming the gas pedal to the floorboard like Mono-Red enjoys doing. With a deck like Blue-Green Tempo, your success hinges on your ability to properly identify and handle threats. You need to know not just which minions actually present a problem for you, but your best way around said problem.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":392,"style":"fontsize-16"}],"entityRanges":[],"data":{}},{"key":"3q4","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"52dpf","text":"With early minions like Grinning Kolobok to get you out ahead and accelerate your large midrange threats and   to make your   or   a must-answer problem as early as turn 3, you\'re really trying to position well to be carried in the midgame by threats like   and  . Our green suite provides us some utility, with   and   making sure we see our removal options like   and  .","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":109,"style":"fontsize-16"},{"offset":110,"length":14,"style":"fontsize-16"},{"offset":125,"length":4,"style":"fontsize-16"},{"offset":130,"length":126,"style":"fontsize-16"},{"offset":257,"length":115,"style":"fontsize-16"}],"entityRanges":[{"offset":109,"length":1,"key":0},{"offset":124,"length":1,"key":1},{"offset":129,"length":1,"key":2},{"offset":256,"length":1,"key":3},{"offset":262,"length":1,"key":4},{"offset":312,"length":1,"key":5},{"offset":318,"length":1,"key":6},{"offset":364,"length":1,"key":7},{"offset":370,"length":1,"key":8}],"data":{}}],"entityMap":{"0":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":34,"name_export":"godsblud transfusion"}},"1":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":14,"name_export":"einherjar thane"}},"2":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":216,"name_export":"gallows boy"}},"3":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":55,"name_export":"blackened jotun"}},"4":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":63,"name_export":"hyperborean"}},"5":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":249,"name_export":"gamayun"}},"6":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":221,"name_export":"raid the tombs"}},"7":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":214,"name_export":"detained"}},"8":{"type":"CARD","mutability":"IMMUTABLE","data":{"id":206,"name_export":"rewind hex"}}}}', '0.16.2', '[1,2]', 'bg', 7000, 40, 23, 15, 2, 0, 18, 17, 4, 1, '[{"id":200,"count":3},{"id":214,"count":2},{"id":206,"count":1},{"id":221,"count":4},{"id":244,"count":2},{"id":210,"count":1},{"id":204,"count":1},{"id":216,"count":4},{"id":14,"count":4},{"id":249,"count":3},{"id":17,"count":1},{"id":34,"count":2},{"id":43,"count":1},{"id":42,"count":1},{"id":51,"count":2},{"id":55,"count":2},{"id":57,"count":2},{"id":62,"count":1},{"id":63,"count":2},{"id":32,"count":1}]', 0, 0, 0, '2019-11-15 23:25:32', '2019-11-15 23:42:53', '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001111000011110011000000010000000000000001000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000011110000000000000000000000000000', '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111000011000000000000000000000000000000000000000111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011011011000000001000000000011000000000000000000000000000', '00000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100001100000000000000', '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000', '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0��\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0�\0\0\0', '\0\0\0\0\0\0\0\0\0\0\0\0\0\0�\0\0\0\0�\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0�\0�\0\0\0', '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0�\0', '\0\0\0\0\0\0\0\0\0\0\0\0')
//EOT;
//
//		DB::statement($customDeck);
    }
}
