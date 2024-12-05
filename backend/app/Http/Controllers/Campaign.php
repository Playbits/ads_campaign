<?php

namespace App\Http\Controllers;

use App\Models\ads_campaign;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class Campaign extends Media
{
    /**
     * Add a new ads campaign
     */
    public function add_new_campaign(Request $request)
    {

        $request->validate([
            'name' => 'required|max:255',
            'total_budget' => 'required|numeric',
            'daily_budget' => 'required|numeric',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
            'images' => 'required|array',
        ]);

        try {
            $ads = ads_campaign::create($request->all());
        } catch (QueryException $e) {
            throw $e;
        }
        return response()->json([
            "message" => "Campaign successfully added",
            'data' => $ads->toArray(),
        ]);
    }
    public function upload_campaign_media(Request $request)
    {
        return $this->handle_upload($request);

    }
    public function edit_new_campaign(Request $request)
    {}
}
