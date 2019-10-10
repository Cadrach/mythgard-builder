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
            $table->mediumText("dck_description")->nullable();
            $table->string("dck_version", 10);

            //Stats
            $table->string("dck_factions", 50);
            $table->integer("dck_cost")->unsigned()->nullable();

            //Data
            $constants = \App\Models\Card::getConstants();
//            $table->enum("dck_path");
//            $table->enum("dck_power");
            $table->text("dck_cards");

            //Searches
            $table->binary("dck_bin_common")->nullable();
            $table->binary("dck_bin_uncommon")->nullable();
            $table->binary("dck_bin_rare")->nullable();
            $table->binary("dck_bin_mythic")->nullable();

            //Social
            $table->integer("dck_views")->unsigned()->default(0);
            $table->integer("dck_downloads")->unsigned()->default(0);

            //Times
            $table->timestamps();

            //Indexes
            $table->index('ide_user');
//            $table->index('dck_cards');
            $table->index('dck_factions');
            $table->index('dck_cost');
//            $table->index(['dck_bin_common', 'dck_bin_uncommon', 'dck_bin_rare', 'dck_bin_mythic'], 'bin_index');
        });
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
