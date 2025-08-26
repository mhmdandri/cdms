<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'status',
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
