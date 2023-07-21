<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Home;
use App\Services\InterFaceService;
use Illuminate\Http\Request;

class InterfaceController extends Controller
{
    protected $interfaceService;

    public function __construct(InterFaceService $interfaceService)
    {
        $this->interfaceService = $interfaceService;
    }
    public function getSaleHomes()
    {
        $homes = $this->interfaceService->getSaleHomes();
        return response()->json($homes);
    }

    public function getRentHomes()
    {
        $homes = $this->interfaceService->getRentHomes();
        return response()->json($homes);
    }
}
