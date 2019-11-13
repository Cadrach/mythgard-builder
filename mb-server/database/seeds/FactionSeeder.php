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
            'fac_name' => 'blue',
            'fac_order' => 1,
        ],[
            'fac_code' => 'g',
            'fac_name' => 'green',
            'fac_order' => 4,
        ],[
            'fac_code' => 'o',
            'fac_name' => 'orange',
            'fac_order' => 5,
        ],[
            'fac_code' => 'p',
            'fac_name' => 'purple',
            'fac_order' => 6,
        ],[
            'fac_code' => 'r',
            'fac_name' => 'red',
            'fac_order' => 3,
        ],[
            'fac_code' => 'y',
            'fac_name' => 'yellow',
            'fac_order' => 2,
        ],];

        //Sort cards
        DB::table('factions')->truncate();
        DB::table('factions')->insert($factions);
    }
}
