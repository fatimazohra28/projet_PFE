<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recruteur extends Model
{
    use HasFactory;
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id ');
    }
    public function offres()
    {
        return $this->hasMany('App\Models\Offre'::class);
    }
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

}