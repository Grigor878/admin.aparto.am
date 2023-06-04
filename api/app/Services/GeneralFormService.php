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

        // $form = GlobalForm::findorFail(1);
        // $form->am = json_decode($form->am);
        // $form->ru = json_decode($form->ru);
        // $form->en = json_decode($form->en);
        //str i texy $form->am
        if($form->am){
          foreach ($form->am as $key => $value) {
            if($data['am']['name'] == $value->name){
              if(isset($value->added)){
                $value->added[] = [
                  'key' => $data['am']['id'] + 'Added',
                  "title" => $data['am']['val'],
                  "value" => '',
                  "type" => "text",
                  "style" => 'width:629px'
                ];
              }
            }
          };
        }

        if($form->ru){
          foreach ($form->ru as $key => $value) {
            if($data['ru']['name'] == $value->name){
              if(isset($value->added)){
                $value->added[] = [
                  'key' => $data['ru']['id'] + "Added",
                  "title" => $data['ru']['val'],
                  "value" => '',
                  "type" => "text",
                  "style" => 'width:629px'
                ];
              }
            }
          };
        }

        if($form->en){
          foreach ($form->en as $key => $value) {
            if($data['en']['name'] == $value->name){
              if(isset($value->added)){
                $value->added[] = [
                  'key' => $data['en']['id'] + "Added",
                  "title" => $data['en']['val'],
                  "value" => '',
                  "type" => "text",
                  "style" => 'width:629px'
                ];
              }
            }
          };
        }

        GlobalForm::findorFail(1)->update(['am'=> json_encode($form->am)]);
        // GlobalForm::findorFail(1)->update(['am'=> json_encode($form->am), 'ru'=> json_encode($form->ru), 'en'=> json_encode($form->en)]);
    }

    public function removeGeneralField ($data) {
        $form = GlobalForm::findorFail(1);
        $form->am = json_decode($form->am);
        // $form->ru = json_decode($form->ru);
        // $form->en = json_decode($form->en);
        $key = current(array_keys($data));

        if($form->am){
            foreach ($form->am as $key => $value) {
                if($data['am']['name'] == $value->name){
                  if(isset($value->added)){
                    foreach ($value->added as $idx => $field) {
                      if($field->key == $data['am']['id']){
                        unset($value->added[$idx]);
                        $value->added = array_values($value->added);
                      }
                      // $keys = array_keys(get_object_vars($field));
                      // if($keys[0] == $data['am']['id']) {
                      //   unset($value->added[$idx]);
                      //   $value->added = array_values($value->added);
                      // }
                     
                    }
                  }
                }
            };
        }
          GlobalForm::findorFail(1)->update(['am'=> json_encode($form->am)]);
    }
}