<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
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
        dd($data);
    }
}
