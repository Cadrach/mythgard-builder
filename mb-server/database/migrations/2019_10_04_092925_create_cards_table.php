<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use \App\Models\Card;

class CreateCardsTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cards', function (Blueprint $table) {
            $table->bigIncrements('id_card');
            $table->unsignedBigInteger('id_rhino')->unique();
            $table->unsignedTinyInteger('ide_faction')->index();

            $table->string('card_name');
            $table->string('card_name_export');
            $table->string('card_name_clean');
            $table->string('card_set');
            $table->enum('card_type', [Card::TYPE_CREATURE, Card::TYPE_SPELL, Card::TYPE_LANE_ENCHANTMENT, Card::TYPE_ARTIFACT]);
            $table->string('card_subtype');
            $table->enum('card_rarity', [Card::RARITY_COMMON, Card::RARITY_UNCOMMON, Card::RARITY_RARE, Card::RARITY_MYTHIC]);
            $table->unsignedTinyInteger('card_cost');
            $table->string('card_gems', 10);
            $table->unsignedTinyInteger('card_attack');
            $table->unsignedTinyInteger('card_health');
            $table->text('card_keywords')->nullable();

            $table->text('card_text');
            $table->text('card_text_flavor');

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
        Schema::dropIfExists('cards');
    }
}
