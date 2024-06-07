<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CrmUserRequest;
use App\Models\CrmUser;
use App\Services\CrmService;
use Illuminate\Http\Request;

class CrmController extends Controller
{   
    protected $crmService;

    public function __construct(CrmService $crmService)
    {
        $this->crmService = $crmService;
    }

    public function addCrmUser(CrmUserRequest $request)
    {
        $createdUser = $this->crmService->addCrmUser($request->all());

        if($createdUser){
            return response()->json(['status' => 'success', 'message' => 'Հաջողությամբ ավելացված է'], 200);
        }

        return response()->json(['message' => 'Ինչ որ բան սխալ է.'], 500);

    }

    public function getHomesForCrm()
    {
        $homes = $this->crmService->getHomesForCrm();

        return response()->json($homes);
        
    }

    public function editCrmUser(CrmUserRequest $request, $idCrm)
    {
        $editUser = $this->crmService->editCrmUser($request->all(), $idCrm);
         //dzel statusy
        return $editUser;

    }

    public function getCrmUsers()
    {
        $users = $this->crmService->getCrmUsers();

        return response()->json($users);

    }

    public function getEditCrmUser($id)
    {
        $user = $this->crmService->getEditUser($id);
        
        return response()->json($user);
    }
}
