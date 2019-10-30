<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDecksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('decks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('ide_user');

            //Info
            $table->string("dck_name", 255);
            $table->boolean("dck_public")->default(false);
            $table->mediumText("dck_description")->nullable();
            $table->string("dck_version", 10)->default('0.0.0');

            //Stats
            $table->string("dck_factions", 50)->default('[]');
            $table->char("dck_colors", 10)->default('');
            $table->integer("dck_cost")->unsigned()->nullable();

            //Data
            $constants = \App\Models\Card::getConstants();
            $table->string("dck_path")->nullable();
            $table->string("dck_power")->nullable();
            $table->text("dck_cards");

            //Social
            $table->integer("dck_stars")->unsigned()->default(0);
            $table->integer("dck_views")->unsigned()->default(0);
            $table->integer("dck_downloads")->unsigned()->default(0);

            //Times
            $table->timestamps();

            //Searches
            $table->text("test_dck_bin_common")->nullable();
            $table->text("test_dck_bin_uncommon")->nullable();
            $table->text("test_dck_bin_rare")->nullable();
            $table->text("test_dck_bin_mythic")->nullable();

            //Indexes
            $table->index('ide_user');
            $table->index(['dck_stars', 'dck_public']);
            $table->index('dck_colors');
            $table->index('dck_factions');
            $table->index('dck_cost');
//            $table->index(['dck_bin_common', 'dck_bin_uncommon', 'dck_bin_rare', 'dck_bin_mythic'], 'bin_index');
        });

        //Add varbinary fields
        DB::statement('ALTER TABLE `decks` ADD `dck_bin_common` VARBINARY(1000)');
        DB::statement('ALTER TABLE `decks` ADD `dck_bin_uncommon` VARBINARY(1000)');
        DB::statement('ALTER TABLE `decks` ADD `dck_bin_rare` VARBINARY(1000)');
        DB::statement('ALTER TABLE `decks` ADD `dck_bin_mythic` VARBINARY(1000)');

        //Test mysql version
        $version = DB::select("SELECT @@version as V")[0]->V;
        if(explode('.', $version)[0] != '8'){
            throw new \Exception('Must use MySQL 8 otherwise the large VARBINARY will not work with bitwise operation. Tested on MySQL 8.0.18. Not working on MariaDB 10.1.40-MariaDB');
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('decks');
    }
}
