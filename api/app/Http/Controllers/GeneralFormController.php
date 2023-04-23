<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GlobalForm;


class GeneralFormController extends Controller
{
    public function addGlobalForm(Request $request) {
        $data = $request->all();
        $formAm = new GlobalForm();
        $formAm->am = json_encode($data);
        $formAm->save();

    }

    public function addGlobalFormField(Request $request) {
        dd($request->all());
        $getForm = GlobalForm::where('id', 1)->first();
        foreach ($request->all() as $key => $value) {
            $phpData = json_decode($getForm['am'], true);
            if($value) {
                $phpData[$value['val']] = null;
                $getForm->am = json_encode($phpData);
                $getForm->save();
            }
            dd($value);
          }
        dd($request->all());
        $data = $request->all();
        $getForm = GlobalForm::where('id', 1)->first();
        $phpData = json_decode($getForm['am'], true);
        $phpData[$data['addField']] = null;
        $getForm->am = json_encode($phpData);
        $getForm->save();
        dd($phpData);
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
