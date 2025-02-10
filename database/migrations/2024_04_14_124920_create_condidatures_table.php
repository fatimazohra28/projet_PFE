<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCondidaturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('condidatures', function (Blueprint $table) {
            $table->id();
            $table->string('telephone',14);
            $table->string('ville',30);
            $table->string('niveau_etude',10);
            $table->string('specialite',30);
            $table->string('etablissement',30);
            $table->string('formations',200);
            $table->string('experiences',200);
            $table->string('competences',200);
            $table->string('langue',40);
            $table->string('littre_motivation',500);
            $table->string('cv',100);
            $table->unsignedBigInteger('user_id'); 
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('condidatures');
    }
}