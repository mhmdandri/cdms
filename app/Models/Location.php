<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [
        'zone',
        'rows',
        'columns',
    ];

    public function containers()
    {
        return $this->hasMany(Container::class);
    }
    public function histories()
    {
        return $this->hasMany(History::class);
    }
}
