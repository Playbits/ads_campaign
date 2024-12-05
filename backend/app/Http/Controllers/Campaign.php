<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Campaign extends Controller
{
    /**
     * Add a new ads campaign
     */
    public function add_new_campaign(Request $request)
    {
        // var_dump($request->all());
        $validated = $request->validate([
            'title' => 'required|unique:posts|max:255',
            'body' => 'required',
        ]);

        // $request->validate([
        //     'school_id' => [
        //         'required',
        //         'numeric',
        //         'exists:schools,id',
        //     ],
        //     'name' => [
        //         'required',
        //         'string',
        //         'max:255',
        //     ],
        // ]);
        // try {
        //     $ads = ads_campaign::create($request->all());
        // } catch (QueryException $e) {
        //     throw $e;
        // }
        // return response()->json([
        //     "message" => "Campaign successfully added",
        //     'data' => $ads->toArray(),
        // ]);
    }
}
