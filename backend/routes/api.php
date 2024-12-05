<?php

use App\Http\Controllers\Campaign;
use Illuminate\Support\Facades\Route;

Route::controller(Campaign::class)->group(function () {
    Route::prefix('campaign')->group(function () {
        Route::post('/', 'add_new_campaign')->name('add_new_campaign');
        // Route::get('/', 'list_campaign')->name('list_campaign');
    });
});
