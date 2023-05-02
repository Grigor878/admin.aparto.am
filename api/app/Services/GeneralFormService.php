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
        $form = GlobalForm::findorFail(1);
        $form->am = json_decode($form->am);
        $form->ru = json_decode($form->ru);
        $form->en = json_decode($form->en);

        if($form->am){
          foreach ($form->am as $key => $value) {
            if($data['am']['name'] == $value->name){
              if(isset($value->added)){
                $value->added[] = [$data['am']['id'] => $data['am']['val']];
              }
            }
          };
        }

        // if($form->ru){
        //   foreach ($form->ru as $key => $value) {
        //     if($data['ru']['name'] == $value->name){
        //       if(isset($value->added)){
        //         $value->added[] = [$data['ru']['id'] => $data['ru']['val']];
        //       }
        //     }
        //   };
        // }

        // if($form->en){
        //   foreach ($form->en as $key => $value) {
        //     if($data['en']['name'] == $value->name){
        //       if(isset($value->added)){
        //         $value->added[] = [$data['en']['id'] => $data['en']['val']];
        //       }
        //     }
        //   };
        // }

        GlobalForm::findorFail(1)->update(['am'=> json_encode($form->am), 'ru'=> json_encode($form->ru), 'en'=> json_encode($form->en)]);
    }

    public function removeGeneralField ($data) {
        $form = GlobalForm::findorFail(1);
        $form->am = json_decode($form->am);
        $form->ru = json_decode($form->ru);
        $form->en = json_decode($form->en);
        $key = current(array_keys($data));

        if($form->am){
            foreach ($form->am as $key => $value) {
                if($data['am']['name'] == $value->name){
                  if(isset($value->added)){
                    foreach ($value->added as $idx => $field) {
                      $keys = array_keys(get_object_vars($field));
                      if($keys[0] == $data['am']['id']) {
                        unset($value->added[$idx]);
                      }
                     
                    }
                  }
                }
            };
        }
          GlobalForm::findorFail(1)->update(['am'=> json_encode($form->am)]);
    }
}