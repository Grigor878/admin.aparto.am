<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GlobalForm;
use App\Services\GeneralFormService;


class GeneralFormController extends Controller
{
    protected $generalFormService;

    public function __construct(GeneralFormService $generalFormService)
    {
        $this->generalFormService = $generalFormService;
    }
    
    public function addGlobalForm(Request $request) {
        $data = $request->all();
        $formAm = new GlobalForm();
        $formAm->am = json_encode($data);
        $formAm->save();

    }

    public function getFormStructure() {
        $structure = $this->generalFormService->getFormStructure();
        return response()->json($structure);
    }

    public function addGlobalFormField(Request $request) {
        $data = $request->all();
        $this->generalFormService->addGeneralField($data);
        $structure = $this->generalFormService->getFormStructure();
        return response()->json($structure);
    }

    public function removeGlobalFormField(Request $request) {
        $data = $request->all();
        $getForm = GlobalForm::where('id', 1)->first();
        $phpData = json_decode($getForm['am'], true);
        unset($phpData[$data['removeField']]);
        $getForm->am = json_encode($phpData);
        $getForm->save();
        dd($data);
    }
}
