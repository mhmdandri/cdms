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
        Schema::create('containers', function (Blueprint $table) {
            $table->id();
            $table->string('container_number')->unique();
            $table->enum('size', ['20ft', '40ft', '45ft'])->default('20ft');
            $table->enum('type', ['dry', 'refrigerated', 'open_top', 'flat_rack', 'tank'])->default('dry');
            $table->foreignId('location_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('customer_id')->nullable()->constrained()->onDelete('set null');
            $table->string('status')->default('available'); // Assuming a status field is needed
            $table->unsignedTinyInteger('stack_level')->default(1); // Assuming a stack level field is needed
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('containers');
    }
};
