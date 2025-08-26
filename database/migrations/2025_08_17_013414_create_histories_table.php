<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('container_id')
                ->constrained('containers')
                ->onDelete('cascade');
            $table->foreignId('location_id')
                ->constrained('locations')
                ->onDelete('cascade');
            $table->foreignId('customer_id')
                ->constrained('customers')
                ->onDelete('cascade');
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->foreignId('task_id')
                ->constrained('task')
                ->onDelete('cascade');
            $table->enum('type', ['loading', 'unloading']);
            $table->enum('condition', ['good', 'damaged', 'needs_repair'])->default('good');
            $table->enum('status', ['pending', 'completed', 'failed'])->default('completed');
            $table->timestamp('event_time')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('histories');
    }
};
