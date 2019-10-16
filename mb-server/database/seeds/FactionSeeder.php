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
        ],[
            'fac_code' => 'g',
            'fac_name' => 'green',
        ],[
            'fac_code' => 'o',
            'fac_name' => 'orange',
        ],[
            'fac_code' => 'p',
            'fac_name' => 'purple',
        ],[
            'fac_code' => 'r',
            'fac_name' => 'red',
        ],[
            'fac_code' => 'y',
            'fac_name' => 'yellow',
        ],];

        //Sort cards
        DB::table('factions')->truncate();
        DB::table('factions')->insert($factions);
    }
}
