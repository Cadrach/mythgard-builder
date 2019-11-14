<?php

use Illuminate\Database\Seeder;

class FactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $factions = [[
            'fac_code' => 'b',
            'fac_name' => 'Norden',
            'fac_color_name' => 'blue',
            'fac_order' => 1,
            'fac_image' => 'factions/blue.png',
        ],[
            'fac_code' => 'g',
            'fac_name' => 'Dreni',
            'fac_color_name' => 'green',
            'fac_order' => 4,
            'fac_image' => 'factions/green.png',
        ],[
            'fac_code' => 'o',
            'fac_name' => 'Parsa',
            'fac_color_name' => 'orange',
            'fac_order' => 5,
            'fac_image' => 'factions/orange.png',
        ],[
            'fac_code' => 'p',
            'fac_name' => 'Harmony',
            'fac_color_name' => 'purple',
            'fac_order' => 6,
            'fac_image' => 'factions/purple.png',
        ],[
            'fac_code' => 'r',
            'fac_name' => 'Orboros',
            'fac_color_name' => 'red',
            'fac_order' => 3,
            'fac_image' => 'factions/red.png',
        ],[
            'fac_code' => 'y',
            'fac_name' => 'Aztlan',
            'fac_color_name' => 'yellow',
            'fac_order' => 2,
            'fac_image' => 'factions/yellow.png',
        ],];

        //Sort cards
        DB::table('factions')->truncate();
        DB::table('factions')->insert($factions);
    }
}
