<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Postule extends Model
{
    use HasFactory;
    protected $table = 'postules';

    protected $fillable = ['condidature_id', 'offre_id'];

    public function condidature()
    {
        return $this->belongsTo(Condidature::class);
    }

    public function offre()
    {
        return $this->belongsTo(Offre::class);
    }
}