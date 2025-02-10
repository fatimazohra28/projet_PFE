<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOffresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('offres', function (Blueprint $table) {
            $table->id();
            $table->string('intitule',30);
            $table->string('salaire',15);
            $table->string('type_contrat',10);
            $table->string('niveau_etude',30);
            $table->string('description',500);
            $table->string('nombre_posts',10);
            $table->string('ville',20);
            $table->string('langues',30);
            $table->string('categorie',50);
            $table->string('competense',200);
            $table->string('logo',100);
            $table->string('statut',50)->default('Non approuvée');
            $table->unsignedBigInteger('recruteur_id'); 
            $table->timestamps();
            $table->foreign('recruteur_id')->references('id')->on('recruteurs');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('offres');
       
    }
}