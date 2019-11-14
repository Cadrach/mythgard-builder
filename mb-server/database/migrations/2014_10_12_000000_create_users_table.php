<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->text('image')->nullable();
            $table->string('provider')->nullable();
            $table->string('provider_id')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->text('cards')->nullable();
        });

        //Add varbinary fields
        DB::statement('ALTER TABLE `users` ADD `bin_common` VARBINARY(1000)');
        DB::statement('ALTER TABLE `users` ADD `bin_uncommon` VARBINARY(1000)');
        DB::statement('ALTER TABLE `users` ADD `bin_rare` VARBINARY(1000)');
        DB::statement('ALTER TABLE `users` ADD `bin_mythic` VARBINARY(1000)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
