<?php
namespace App\Services;

use App\Models\Employe;
use App\Models\Home;

class InterFaceService
{

    public function getSaleHomes()
    {
        return Home::where('status', Home::STATUS_APPROVED)->get()->filter(function ($home) {
            $am = json_decode($home->am);

            if ($am[0]->fields[0]->selectedOptionName == "sale" && $am[0]->fields[4]->value == "Տոպ") {
                return true;
            }
            return false;
        })->values();

    }

    public function getRentHomes()
    {
        return Home::where('status', Home::STATUS_APPROVED)->get()->filter(function ($home) {
            $am = json_decode($home->am);

            if ($am[0]->fields[0]->selectedOptionName == "rent" && $am[0]->fields[4]->value == "Տոպ") {
                return true;
            }

            return false;
        })->values();
    }

    public function getGeneralAdmin()
    {
        return Employe::where('email', 'babajanian.alex@gmail.com')->first();
    }


}