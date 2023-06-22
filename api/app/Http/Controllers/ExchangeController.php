<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exchange;

class ExchangeController extends Controller
{
    public function setExchange(Request $request)
    {
        $data = $request->all();
        dd($data);

    }

    public function getExchange()
    {
        dd('Welcome get exchange');
        $exchange = Exchange::latest()->first();

        return response()->json($exchange);
    }
    
}
