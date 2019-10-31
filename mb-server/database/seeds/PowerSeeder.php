<?php

use Illuminate\Database\Seeder;

class PowerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $powers = [[
            'id' => 7,
            'pow_name' => 'Smite',
        ],[
            'id' => 2,
            'pow_name' => 'Foresight',
        ],[
            'id' => 4,
            'pow_name' => 'Infuse',
        ],[
            'id' => 3,
            'pow_name' => 'Impel',
        ],[
            'id' => 6,
            'pow_name' => 'Mend',
        ],[
            'id' => 5,
            'pow_name' => 'Reconstruct',
        ],];

        //Sort cards
        DB::table('powers')->truncate();
        DB::table('powers')->insert($powers);
    }
}
