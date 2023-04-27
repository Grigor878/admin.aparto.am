<?php
namespace App\Services;
use App\Models\GlobalForm;


class GeneralFormService
{
    public function getFormStructure()
    {
        $formStructure = FORM_STRUCTURE;
        $getForm = GlobalForm::findOrFail(1);
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

    public function addGeneralField($data) {
        $getForm = GlobalForm::findOrFail(1);
        $phpDataAm = json_decode($getForm['am'], true);
        $phpDataRu = json_decode($getForm['ru'], true);
        $phpDataEn = json_decode($getForm['en'], true);

        if($phpDataAm){
            if($data['am']){
                $key = current(array_keys($data['am']));
                if(!isset($phpDataAm[$key])){
                    $phpDataAm[$key] = [$data['am'][$key]]; 
                } else {
                    array_push($phpDataAm[$key], $data['am'][$key]);
                }
            } 
        } else {
            $key = current(array_keys($data['am']));
            $phpDataAm =  [
                $key => [
                    [
                        $data['am'][$key],
                    ],
                ]
            ];
        }
        if($phpDataRu){
            if($data['ru']){
                $key = current(array_keys($data['ru']));
                if(!isset($phpDataRu[$key])){
                    $phpDataAm[$key] = [$data['ru'][$key]]; 
                } else {
                    array_push($phpDataRu[$key], $data['ru'][$key]);
                }
            } 
        }else {
            $key = current(array_keys($data['ru']));
            $phpDataRu =  [
                $key => [
                    $data['ru'][$key]
                ],
            ];
        }
        if($phpDataEn){
            if($data['en']){
                $key = current(array_keys($data['en']));
                if(!isset($phpDataEn[$key])){
                    $phpDataAm[$key] = [$data['en'][$key]]; 
                } else {
                    array_push($phpDataEn[$key], $data['en'][$key]);
                }
        } }else {
            $key = current(array_keys($data['en']));
            $phpDataEn =  [
                $key => [
                    $data['en'][$key],
                ]
            ];
        }
        GlobalForm::where('id', 1)->update(['am'=> json_encode($phpDataAm), 'ru'=> json_encode($phpDataRu), 'en'=> json_encode($phpDataEn)]);
    }
}