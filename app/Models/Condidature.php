<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Condidature extends Model
{
    use HasFactory;
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id ');
    }
    public function offres(){
        return $this->belongsToMany(Offre::class, 'postules');
    }
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}