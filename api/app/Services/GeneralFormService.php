<?php
namespace App\Services;
use App\Models\GlobalForm;


class GeneralFormService
{
    public function getFormStructure()
    {
        $formStructure = FORM_STRUCTURE;
        $getForm = GlobalForm::where('id', 1)->first();
        $phpData = json_decode($getForm['am'], true);
        foreach ($formStructure as $key => $value) {
            if(isset($phpData[$key])){
                foreach ($phpData[$key] as $idx => $addVal) {
                    array_push($value, $addVal);
                }
                $formStructure[$key] = $value;
            }
        }
        return $formStructure;
    }
}