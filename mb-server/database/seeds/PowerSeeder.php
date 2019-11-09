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
            'pow_icon' => 'powers/smite.png',
            'pow_image' => 'smite.png',
        ],[
            'id' => 2,
            'pow_name' => 'Foresight',
            'pow_icon' => 'powers/foresight.png',
            'pow_image' => 'foresight.png',
        ],[
            'id' => 4,
            'pow_name' => 'Infuse',
            'pow_icon' => 'powers/infuse.png',
            'pow_image' => 'infuse.png',
        ],[
            'id' => 3,
            'pow_name' => 'Impel',
            'pow_icon' => 'powers/impel.png',
            'pow_image' => 'impel.png',
        ],[
            'id' => 6,
            'pow_name' => 'Mend',
            'pow_icon' => 'powers/mend.png',
            'pow_image' => 'mend.png',
        ],[
            'id' => 5,
            'pow_name' => 'Reconstruct',
            'pow_icon' => 'powers/reconstruct.png',
            'pow_image' => 'reconstruct.png',
        ],];

        //Sort cards
        DB::table('powers')->truncate();
        DB::table('powers')->insert($powers);
    }
}
