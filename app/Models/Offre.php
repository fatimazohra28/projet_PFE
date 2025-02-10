<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offre extends Model
{
    use HasFactory;
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id ');
    }
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
    public function condidatures()
    {
        return $this->belongsToMany(condidature::class, 'postules');
    }

}