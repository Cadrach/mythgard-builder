<?php

use Illuminate\Database\Seeder;

class PathSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $paths = [[
            'id' => 2,
            'pth_name' => 'Disk of Circadia',
        ],[
            'id' => 3,
            'pth_name' => 'Fires of Creation',
        ],[
            'id' => 4,
            'pth_name' => 'Journey of Souls',
        ],[
            'id' => 5,
            'pth_name' => 'Rainbow\'s End',
        ],[
            'id' => 6,
            'pth_name' => 'Turn of Seasons',
        ],];

        //Sort cards
        DB::table('paths')->truncate();
        DB::table('paths')->insert($paths);
    }
}
