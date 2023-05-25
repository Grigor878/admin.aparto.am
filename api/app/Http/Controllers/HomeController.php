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
            $homeLanguageContsructor = $this->homeService->homeLanguageContsructor($data);
            $home->am =json_encode($homeLanguageContsructor['am']);
            $home->ru =json_encode($homeLanguageContsructor['ru']);
            $home->en =json_encode($homeLanguageContsructor['en']);
            $home->save();
            return response()->json($home->id);
        }
    }

    public function addKeyword(Request $request) {
        $data = $request->all();
        dd($data);
    }

    public function addYandexLocation(Request $request) {
        $data = $request->all();
        dd($data);
    }

    

    
}
