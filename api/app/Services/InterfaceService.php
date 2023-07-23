<?php
namespace App\Services;

use App\Models\ConfigAddress;
use App\Models\Employe;
use App\Models\Home;

class InterFaceService
{
    public $communityAm = [
        "Աջափնյակ",
        "Արաբկիր",
        "Ավան",
        "Դավթաշեն",
        "Էրեբունի",
        "Քանաքեռ-Զեյթուն",
        "Կենտրոն",
        "Մալաթիա-Սեբաստիա",
        "Նորք-Մարաշ",
        "Նոր Նորք",
        "Նուբարաշեն",
        "Շենգավիթ",
        "Վահագնի թաղամաս",
    ];

    public $communityRu = [
        'Аджапняк',
        'Арабкир',
        'Аван',
        'Давташен',
        'Эребуни',
        'Канакер-Зейтун',
        'Кентрон',
        'Малатия-Себастия',
        'Норк-Мараш',
        'Нор Норк',
        'Нубарашен',
        'Шенгавит',
        'Ваганы',
    ];
    public $communityEn = [
        'Ajapnyak',
        'Arabkir',
        'Avan',
        'Davtashen',
        'Erebuni',
        'Kanaker-Zeytun',
        'Kentron',
        'Malatia-Sebastia',
        'Nork-Marash',
        'Nor Nork',
        'Nubarashen',
        'Shengavit',
        'Vahagni',
    ];

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

    public function getSearchAttributes($lang)
    {
        if ($lang == "am") {
            $address = ConfigAddress::pluck('am')->toArray();
            $readyResult = array_merge($address, $this->communityAm);
            return $readyResult;
        }

        if ($lang == "ru") {
            $address = ConfigAddress::pluck('ru')->toArray();
            $readyResult = array_merge($address, $this->communityRu);
            return $readyResult;
        }

        if ($lang == "en") {
            $address = ConfigAddress::pluck('en')->toArray();
            $readyResult = array_merge($address, $this->communityEn);
            return $readyResult;
        }
    }


}