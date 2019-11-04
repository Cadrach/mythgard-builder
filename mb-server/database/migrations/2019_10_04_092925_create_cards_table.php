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
            $constants = \App\Models\Card::getConstants();

            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_rhino')->unique();
            $table->unsignedTinyInteger('ide_faction')->index();

            //Stores the position of this card in the rarity binary string
            $table->unsignedInteger('card_rarity_index');

            $table->string('card_name');
            $table->string('card_name_export');
            $table->string('card_name_clean');
            $table->string('card_image');
            $table->string('card_set');
            $table->enum('card_type', $constants['TYPE']);//[Card::TYPE_CREATURE, Card::TYPE_SPELL, Card::TYPE_LANE_ENCHANTMENT, Card::TYPE_ARTIFACT]);
            $table->string('card_subtype');
            $table->enum('card_rarity', $constants['RARITY']);// [Card::RARITY_COMMON, Card::RARITY_UNCOMMON, Card::RARITY_RARE, Card::RARITY_MYTHIC]);
            $table->tinyInteger('card_max_in_deck');
            $table->unsignedTinyInteger('card_cost')->nullable();
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
