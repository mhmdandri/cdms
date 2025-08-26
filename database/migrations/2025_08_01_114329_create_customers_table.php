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
        Schema::create('customers', function (Blueprint $table) {
            $table->id()->unique();
            $table->string('name');
            $table->string('email')->nullable(); // Optional email field
            $table->string('phone')->nullable(); // Optional phone field
            $table->text('address')->nullable(); // Optional address field
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->unsignedInteger('total_containers')->default(0); // Assuming a field to track total containers
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
