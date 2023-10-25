<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\CrmService;
use Illuminate\Http\Request;

class CrmController extends Controller
{   
    protected $crmService;

    public function __construct(CrmService $crmService)
    {
        $this->crmService = $crmService;
    }
}
