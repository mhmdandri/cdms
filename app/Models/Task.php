<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'task';
    protected $fillable = [
        'title',
        'description',
        'type',
        'status',
        'container_id',
        'customer_id',
        'requested_by'
    ];
    public function container()
    {
        return $this->belongsTo(Container::class, 'container_id');
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
    public function admin()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }
    public function workers()
    {
        return $this->belongsToMany(User::class, 'task_assignments', 'task_id', 'user_id')->withPivot('assigned_at', 'started_at', 'completed_at');
    }
    public function users()
    {
        return $this->belongsToMany(User::class, 'task_user', 'task_id', 'user_id');
    }
    public function histories()
    {
        return $this->hasMany(History::class);
    }
}
