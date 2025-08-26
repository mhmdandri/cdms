<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Container extends Model
{
    protected $fillable = [
        'container_number',
        'size',
        'type',
        'location_id',
        'customer_id',
        'status',
        'stack_level',
    ];
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
    public function location()
    {
        return $this->belongsTo(Location::class);
    }
    public function histories()
    {
        return $this->hasMany(History::class);
    }
}
