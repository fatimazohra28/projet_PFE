<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('postules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('condidature_id');
            $table->unsignedBigInteger('offre_id');
          //  $table->integer('postule');
            $table->timestamps();
            $table->foreign('condidature_id')->references('id')->on('condidatures');
            $table->foreign('offre_id')->references('id')->on('offres');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('postules');
    }
}