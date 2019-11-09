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
            'pth_icon' => 'paths/disk.png',
            'pth_image' => 'disk_of_circardia.png',
        ],[
            'id' => 3,
            'pth_name' => 'Fires of Creation',
            'pth_icon' => 'paths/forge.png',
            'pth_image' => 'fires_of_creation.png',
        ],[
            'id' => 4,
            'pth_name' => 'Journey of Souls',
            'pth_icon' => 'paths/journey.png',
            'pth_image' => 'journey_of_souls.png',
        ],[
            'id' => 5,
            'pth_name' => 'Rainbow\'s End',
            'pth_icon' => 'paths/rainbow.png',
            'pth_image' => 'rainbows_end.png',
        ],[
            'id' => 6,
            'pth_name' => 'Turn of Seasons',
            'pth_icon' => 'paths/seasons.png',
            'pth_image' => 'turn_of_seasons.png',
        ],];

        //Sort cards
        DB::table('paths')->truncate();
        DB::table('paths')->insert($paths);
    }
}
