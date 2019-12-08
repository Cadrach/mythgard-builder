<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePuzzlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('puzzles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('ide_user');

            //Info
            $table->string("pzl_name", 255);
            $table->boolean("pzl_public")->default(false);
            $table->longText("pzl_export");
            $table->mediumText("pzl_description")->nullable();
            $table->tinyInteger("pzl_difficulty")->unsigned()->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('puzzles');
    }
}
