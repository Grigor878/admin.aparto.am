<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Home;
use App\Services\HomeService;


class HomeController extends Controller
{
    protected $homeService;

    public function __construct(HomeService $homeService)
    {
        $this->homeService = $homeService;
    }

    public function getEng () {

        $obj = [
            "header_rent" => "For Rent",
            "header_sale"=> "For Sale",
            "header_services"=> "Our Services",
            "header_contact"=> "Contact Us"
        ];
        return response()->json($obj);
    }

    public function getRu () {

        $obj = [
            "header_rent" => "Аренда",
            "header_sale"=> "Продается",
            "header_services"=> "Наши услуги",
            "header_contact"=> "Свяжитесь с нами"
        ];
        return response()->json($obj);
    }

    public function getArm () {

        $obj = [
            "header_rent" => "Տրվում է վարձով",
            "header_sale"=> "Վաճառվում է",
            "header_services"=> "Մեր ծառայությունները",
            "header_contact"=> "Կապ մեզ հետ"
        ];
        
        return response()->json($obj);
    }

    public function addHome(Request $request) {
        $data = $request->all();
        $employee = auth()->user();
        if($employee) {
            $home = new Home();
            $home->employee_id = $employee->id;
            $home->status = $employee->role == "admin" ? Home::STATUS_APPROVED: Home::STATUS_MODERATION;
            $home->photo = '';
            $home->file = '';
            $home->keywords = '';
            $homeLanguageContsructor = $this->homeService->homeLanguageContsructor($data);
            $home->am =json_encode($homeLanguageContsructor['am']);
            $home->ru =json_encode($homeLanguageContsructor['ru']);
            $home->en =json_encode($homeLanguageContsructor['en']);
            $home->save();
            return response()->json($home->id);
        }
    }

    public function editHome($id, Request $request){
        $data = $request->all();
        $home = Home::findorFail($id);
        
        $homeLanguageContsructor = $this->homeService->homeLanguageContsructorEdit($id, $data);
        dd(1111);
        // $home->status = $employee->role == "admin" ? Home::STATUS_APPROVED: Home::STATUS_MODERATION;
        $home->am =json_encode($homeLanguageContsructor['am']);
        $home->ru =json_encode($homeLanguageContsructor['ru']);
        $home->en =json_encode($homeLanguageContsructor['en']);
        $home->save();
        return response()->json($home->id);
    }

    public function getHome() {
        $allHome = Home::orderByRaw("status = 'moderation' DESC")
        ->select('id', 'am', 'photo', 'file', 'keywords', 'status')
        ->get();
        foreach ($allHome as $key => $home) {
           $home->am = json_decode($home->am);
           $home->selectedTransationType = isset($home->am[0]->fields[0]->selectedOptionName)?$home->am[0]->fields[0]->selectedOptionName: '';
           $home->photo = json_decode($home->photo);
           $home->file = json_decode($home->file);
           $home->keywords = json_decode($home->keywords);
        }
        return response()->json($allHome);
    }

    public function multyPhoto($id, Request $request){
        $data = $request->all();
        $home = Home::findorFail($id);
        $photoName = [];
        foreach ($data as $key => $photo) {
          $fileName = round(microtime(true) * 1000).'.'.$photo->extension();
          $photo->move(public_path('images'), $fileName);
         
          if(is_numeric(strpos($key, 'visible'))) {
            $info = [
              'name' => $fileName,
              'visible' => 'true'
            ];
          } else {
            $info = [
              'name' => $fileName,
              'visible' => 'false'
            ];
          }
          $photoName[] = $info;
        }
        $home->photo = json_encode($photoName);
        $home->save();
        return true;
      }

    public function documentUpload($id, Request $request) {
        $data = $request->all();
        $home = Home::findorFail($id);
        $fileNameArray = [];
        foreach ($data as $key => $file) {
            $fileName = round(microtime(true) * 1000).'.'.$file->extension();
            $file->move(public_path('files'), $fileName);
            $fileNameArray[] = $fileName;
          }
          $home->file = json_encode($fileNameArray);
          $home->save();

          return true;
    }
  

    public function addKeyword($id, Request $request) {
        $data = $request->all();
        $home = Home::findorFail($id);
        $home->keywords = json_encode($data);
        $home->save();
        return true;
    }

    public function addYandexLocation($id, Request $request) {
        $data = $request->all();
        $home = Home::findorFail($id);

        if($home) {
            $homeAm = json_decode($home->am);
            $homeRu = json_decode($home->ru);
            $homeEn = json_decode($home->en);

            if($homeAm[1]->name == 'location'){
                $homeAm[1] = (array) $homeAm[1];
                $homeAm[1]['fields'][4]->value = $data;
            }
            if($homeRu[1]->name == 'location'){
                $homeRu[1] = (array) $homeRu[1];
                $homeRu[1]['fields'][4]->value = $data;
            }
            if($homeEn[1]->name == 'location'){
                $homeEn[1] = (array) $homeRu[1];
                $homeEn[1]['fields'][4]->value = $data;
            }

            $home->am = json_encode($homeAm);
            $home->ru = json_encode($homeRu);
            $home->en = json_encode($homeEn);

            $home->save();
        }
        return true;
    }

    

    
}
