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
        Schema::create('ads_campaigns', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ads_campaigns');
    }
};


// Name - string format.

// Dates (`from` and `to`) - date format.

// Total budget (in USD) - float format (2 decimal places).

// Daily budget (in USD) - float format (2 decimal places).

// Creative upload - multiple banner images of any size can be added. - image file upload.