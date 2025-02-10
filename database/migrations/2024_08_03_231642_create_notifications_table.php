<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('recruteur_id'); 
            $table->foreign('recruteur_id')->references('id')->on('recruteurs');
            $table->unsignedBigInteger('condidature_id'); 
            $table->foreign('condidature_id')->references('id')->on('condidatures');
            $table->unsignedBigInteger('offre_id'); 
            $table->foreign('offre_id')->references('id')->on('offres');
            $table->string('message',200);
            $table->string('decision',20);
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
        Schema::dropIfExists('notifications');
    }
}