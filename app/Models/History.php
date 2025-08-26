<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Pest\ArchPresets\Custom;

class History extends Model
{
    protected $fillable = [
        'container_id',
        'location_id',
        'customer_id',
        'user_id',
        'task_id',
        'type',
        'condition',
        'status',
        'event_time',
        'notes',
    ];
    public function container()
    {
        return $this->belongsTo(Container::class, 'container_id');
    }
    public function location()
    {
        return $this->belongsTo(Location::class, 'location_id');
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id');
    }
}
