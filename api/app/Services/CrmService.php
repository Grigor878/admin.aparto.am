<?php
namespace App\Services;

use App\Http\Resources\CrmHomesResource;
use App\Models\Home;
use Carbon\Carbon;


class CrmService
{

    public function getHomesForCrm()
    {
        $allHome = Home::all();

        return CrmHomesResource::collection($allHome);

    }

 
}