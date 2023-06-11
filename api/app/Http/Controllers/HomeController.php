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
        // $home->status = $employee->role == "admin" ? Home::STATUS_APPROVED: Home::STATUS_MODERATION;
        $home->am =json_encode($homeLanguageContsructor['am']);
        $home->ru =json_encode($homeLanguageContsructor['ru']);
        $home->en =json_encode($homeLanguageContsructor['en']);
        $home->save();
        return response()->json($home->id);
    }

    public function editKeyword($id, Request $request){
        $data = $request->all();
        $home = Home::findorFail($id);
        $home->keywords = json_encode($data);
        $home->save();
    }
    public function editYandexLocation($id, Request $request){
        $data = $request->all();
        $this->homeService->addEditYandexLocation($id, $data);
        return true;
    }

    public function editMultyPhoto($id, Request $request){
        return true;
        $data = $request->all();
        dd($data);
    }
    public function editDocumentUpload($id, Request $request){
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
        \Log::info('documentUpload'.$id, $fileNameArray);
        dd($data);
        return true;
    }

    public function getHome() {
        $allHome = Home::orderByRaw("status = 'moderation' DESC")
        ->select('id', 'am', 'ru', 'en', 'photo', 'file', 'keywords', 'status')
        ->get();
        foreach ($allHome as $key => $home) {
           $home->am = json_decode($home->am);
           $home->ru = json_decode($home->ru);
           $home->en = json_decode($home->en);

           $searchAllProperty = [];
           if(isset($home->am[0]->fields[2]->value)){
            array_push($searchAllProperty, $home->am[0]->fields[2]->value);
            array_push($searchAllProperty, $home->ru[0]->fields[2]->value);
            array_push($searchAllProperty, $home->en[0]->fields[2]->value);
           }
           array_push($searchAllProperty, $home->id);
           
           $home->searchAllProperty = $searchAllProperty;
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
        \Log::info('multyPhoto'.$id, $photoName);

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
        \Log::info('documentUpload'.$id, $fileNameArray);

        return true;
    }
  

    public function addKeyword($id, Request $request) {
        $data = $request->all();
        $home = Home::findorFail($id);
        $home->keywords = json_encode($data);
        $home->save();
        \Log::info('addKeyword'.$id, $data);

        return true;
    }

    public function addYandexLocation($id, Request $request) {
        $data = $request->all();
        $this->homeService->addEditYandexLocation($id, $data);
        \Log::info('addYandexLocation'.$id, $data);
        
        return true;
    }

    

    
}
