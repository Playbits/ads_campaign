<?php

use App\Http\Controllers\Campaign;
use Illuminate\Support\Facades\Route;

Route::controller(Campaign::class)->group(function () {
    Route::prefix('campaign')->group(function () {
        Route::post('/', 'add_new_campaign')->name('add_new_campaign');
        Route::post('/upload', 'upload_campaign_media')->name('upload_campaign_images');
        // Route::get('/', 'list_campaign')->name('list_campaign');
    });
});

// Route::controller(Media::class)->group(function () {
//     Route::prefix('media')->group(function () {
//         Route::post('/', 'handle_upload')->name('upload_campaign_images');
//         // Route::get('/', 'list_campaign')->name('list_campaign');
//     });
// });
