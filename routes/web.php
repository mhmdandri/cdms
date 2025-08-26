<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use \App\Http\Controllers\ContainerController;
use \App\Http\Controllers\CustomerController;
use App\Http\Controllers\HistoryController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::prefix('admin')->middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('task', TaskController::class)->names([
        'index'   => 'admin.task.index',
        'create'  => 'admin.task.create',
        'store'   => 'admin.task.store',
        'edit'    => 'admin.task.edit',
        'update'  => 'admin.task.update',
        'destroy' => 'admin.task.destroy',
        'show'    => 'admin.task.show',
    ]);
});

Route::prefix('user')->middleware(['auth', 'role:user'])->group(function () {
    Route::resource('task', TaskController::class)->names([
        'index'   => 'user.task.index',
        'show'    => 'user.task.show',
    ])->only(['index', 'show']); // User hanya lihat
    // Fix: Separate GET and POST routes with different names
    Route::get('/task/{task}/start', [TaskController::class, 'start'])
        ->name('user.task.start');
    Route::post('/task/{task}/start', [TaskController::class, 'start'])
        ->name('user.task.startPost');
    Route::post('/task/{task}/do', [TaskController::class, 'doTask'])
        ->name('user.task.doTask');
});
Route::resource('admin/containers', ContainerController::class)->middleware(['auth', 'role:admin'])->name('index', 'containers.index');
Route::resource('admin/customers', CustomerController::class)->middleware(['auth', 'role:admin'])->name('index', 'customers.index');
Route::resource('/user/positions', PositionController::class)->middleware(['auth', 'role:user'])->name('index', 'positions.index');
Route::get('/user/positions/{id}/move', [PositionController::class, 'move'])->middleware(['auth', 'role:user'])->name('positions.move');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'indexUser'])
        ->name('dashboard');
});
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])
        ->name('admin.dashboard');
});
Route::get('/admin/history', [HistoryController::class, 'index'])->middleware(['auth', 'role:admin'])->name('admin.history.index');
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
