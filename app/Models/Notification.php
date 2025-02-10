<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    public function offre()
    {
        return $this->belongsTo(Offre::class);
    }
    public function recruteur()
    {
        return $this->belongsTo(Recruteur::class);
    }
    public function condidature()
    {
        return $this->belongsTo('App\Models\Condidature'::class);
    }
}