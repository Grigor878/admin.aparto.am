<?php
namespace App\Services;

use App\Models\ConfigAddress;
use App\Models\Employe;
use App\Models\Home;
use Carbon\Carbon;

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
            $home->am = json_decode($home->am);
            $home->ru = json_decode($home->ru);
            $home->en = json_decode($home->en);
            $home->photo = json_decode($home->photo);
            $home->file = json_decode($home->file);
            $home->createdAt = Carbon::parse($home->created_at)->format('d/m/Y');
            $home->updatedAt = Carbon::parse($home->updated_at)->format('d/m/Y');

            $home->keywords = json_decode($home->keywords);

            if ($home->am[0]->fields[0]->selectedOptionName == "sale" && $home->am[0]->fields[4]->value == "Տոպ") {
                return true;
            }
            return false;
        })->values();

    }

    public function getRentHomes()
    {
        return Home::where('status', Home::STATUS_APPROVED)->get()->filter(function ($home) {
            $home->am = json_decode($home->am);
            $home->ru = json_decode($home->ru);
            $home->en = json_decode($home->en);
            $home->photo = json_decode($home->photo);
            $home->file = json_decode($home->file);
            $home->createdAt = Carbon::parse($home->created_at)->format('d/m/Y');
            $home->updatedAt = Carbon::parse($home->updated_at)->format('d/m/Y');

            $home->keywords = json_decode($home->keywords);

            if ($home->am[0]->fields[0]->selectedOptionName == "rent" && $home->am[0]->fields[4]->value == "Տոպ") {
                return true;
            }

            return false;
        })->values();
    }

    public function getGeneralAdmin()
    {
        $admin = Employe::where('email', 'babajanian.alex@gmail.com')->first();
        $admin->full_name = json_decode($admin['full_name'], true);
        $admin->phone = json_decode($admin['phone'], true);

        return $admin;
    }

    public function getSearchAttributes($lang)
    {
        $homeKeywords = Home::select('keywords')->get();
        $readyKeywords = [];

        foreach ($homeKeywords as $key => $home) {
            if (json_decode($home['keywords'])) {
                $readyKeywords = array_unique(array_merge($readyKeywords, json_decode($home['keywords'])));
            }
        }

        if ($lang == "am") {
            $address = ConfigAddress::pluck('am')->toArray();
            $readyResult = array_merge($address, $this->communityAm);
        }

        if ($lang == "ru") {
            $address = ConfigAddress::pluck('ru')->toArray();
            $readyResult = array_merge($address, $this->communityRu);
        }

        if ($lang == "en") {
            $address = ConfigAddress::pluck('en')->toArray();
            $readyResult = array_merge($address, $this->communityEn);
        }
        
        return array_unique(array_merge($readyKeywords, $readyResult));
    }


}