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

    public function getGeneralAdmin()
    {
        $generalAdmin = $this->interfaceService->getGeneralAdmin();
        return response()->json($generalAdmin);
    }

    public function addRecentSearch(Request $request)
    {
        dd($request->all());
    }

    public function getSearchAttributes($lang)
    {
        $searchList = $this->interfaceService->getSearchAttributes($lang);
        return response()->json($searchList);
    }

    public function getSearchData(Request $request)
    {
        $data = $request->all();
        $generalSearchList = $this->interfaceService->getSearchData($data);

        return response()->json($generalSearchList);
    }

    public function getSeeMoreHomes(Request $request)
    {
        $data = $request->all();
        $getSeeMoreHomeData = $this->interfaceService->getSeeMoreHomes($data);

        return response()->json($getSeeMoreHomeData);
    }

    public function getCommunitySearch(Request $request, $lang)
    {
        $data = $request->all();
        $getCommunitySearchData = $this->interfaceService->getCommunitySearch($data, $lang);

        return response()->json($getCommunitySearchData);
    }

    public function getInterfaceProperties($id)
    {
        $home = $this->interfaceService->getInterfaceProperties($id);

        return response()->json($home);
    }

    public function getResultPageData(Request $request, $lang)
    {
        $data = $request->all();
        $homes = $this->interfaceService->getResultPageData($data, $lang);

        return response()->json($homes);
    }
    
}
