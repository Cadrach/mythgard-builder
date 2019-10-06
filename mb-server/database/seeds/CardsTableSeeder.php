<?php

use Illuminate\Database\Seeder;

class CardsTableSeeder extends Seeder
{

    protected function normalize ($string) {
        $table = array(
            'Š'=>'S', 'š'=>'s', 'Đ'=>'Dj', 'đ'=>'dj', 'Ž'=>'Z', 'ž'=>'z', 'Č'=>'C', 'č'=>'c', 'Ć'=>'C', 'ć'=>'c',
            'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A', 'Ä'=>'A', 'Å'=>'A', 'Æ'=>'A', 'Ç'=>'C', 'È'=>'E', 'É'=>'E',
            'Ê'=>'E', 'Ë'=>'E', 'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I', 'Ñ'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O',
            'Õ'=>'O', 'Ö'=>'O', 'Ø'=>'O', 'Ù'=>'U', 'Ú'=>'U', 'Û'=>'U', 'Ü'=>'U', 'Ý'=>'Y', 'Þ'=>'B', 'ß'=>'Ss',
            'à'=>'a', 'á'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'a', 'å'=>'a', 'æ'=>'a', 'ç'=>'c', 'è'=>'e', 'é'=>'e',
            'ê'=>'e', 'ë'=>'e', 'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i', 'ð'=>'o', 'ñ'=>'n', 'ò'=>'o', 'ó'=>'o',
            'ô'=>'o', 'õ'=>'o', 'ö'=>'o', 'ø'=>'o', 'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ý'=>'y', 'ý'=>'y', 'þ'=>'b',
            'ÿ'=>'y', 'Ŕ'=>'R', 'ŕ'=>'r',
            "'" => '', "," => "", " " => "_", ":" => "",

        );

        return strtr($string, $table);
    }

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

        $cards = [];
        foreach($json as $card){
            $cards[] = [
                'ide_faction' => $factions[$card->faction],
                'id_rhino' => $card->cardid,
                'card_name' => $card->cardname,
                'card_name_clean' => $this->normalize(ucwords($card->cardnameclean, ' -')),
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
                'card_keywords' => !$card->keywords ? null : collect(explode(',', $card->keywords))->map(function($v){return trim($v);})->toJson(),
            ];
        }

        DB::table('cards')->truncate();
        DB::table('cards')->insert($cards);

    }
}
