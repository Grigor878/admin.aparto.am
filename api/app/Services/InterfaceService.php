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
        'Ваагни',
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

    public function getPropertyType($typeNames)
    {
        $allSelect = [
            'house' => 'Квартира',
            'privateHouse' => 'Дом',
            'commercial' => 'Коммерческая площадь'
        ];

        $readyName = [];

        foreach ($typeNames as $key => $type) {
            $readyName[] = $allSelect[$type];
        }

        return $readyName;

    }

    public function getSaleHomes()
    {
        return Home::select('id', 'home_id', 'employee_id', 'photo', 'keywords', 'status', 'am', 'ru', 'en', 'price_history', 'created_at', 'updated_at')
            ->where('status', Home::STATUS_APPROVED)
            ->get()
            ->filter(function ($home) {
                $am = json_decode($home->am);
                $ru = json_decode($home->ru);
                $en = json_decode($home->en);
                $home->photo = json_decode($home->photo);
                $home->createdAt = Carbon::parse($home->created_at)->format('d/m/Y');
                $home->updatedAt = Carbon::parse($home->updated_at)->format('d/m/Y');
                $home->selectedTransactionType = isset($home->am[0]->fields[0]->selectedOptionName) ? $home->am[0]->fields[0]->selectedOptionName : '';
                $home->keywords = json_decode($home->keywords);
                $am[1]->fields[5] = [];
                $ru[1]->fields[5] = [];
                $ru[1]->fields[5] = [];
                $am[9]->fields = [];
                $ru[9]->fields = [];
                $en[9]->fields = [];

                $home->am = $am;
                $home->ru = $ru;
                $home->en = $en;


                if ($home->am[0]->fields[0]->selectedOptionName == "sale" && $home->am[0]->fields[4]->value == "Տոպ") {
                    return true;
                }
                return false;
            })->values();

    }

    public function getRentHomes()
    {
        return Home::select('id', 'home_id', 'employee_id', 'photo', 'keywords', 'status', 'am', 'ru', 'en', 'price_history', 'created_at', 'updated_at')
            ->where('status', Home::STATUS_APPROVED)
            ->get()
            ->filter(function ($home) {
                $am = json_decode($home->am);
                $ru = json_decode($home->ru);
                $en = json_decode($home->en);
                $home->photo = json_decode($home->photo);
                $home->createdAt = Carbon::parse($home->created_at)->format('d/m/Y');
                $home->updatedAt = Carbon::parse($home->updated_at)->format('d/m/Y');
                $am[1]->fields[5] = [];
                $ru[1]->fields[5] = [];
                $ru[1]->fields[5] = [];
                $am[9]->fields = [];
                $ru[9]->fields = [];
                $en[9]->fields = [];

                $home->am = $am;
                $home->ru = $ru;
                $home->en = $en;

                $home->keywords = json_decode($home->keywords);
                $home->selectedTransactionType = isset($home->am[0]->fields[0]->selectedOptionName) ? $home->am[0]->fields[0]->selectedOptionName : '';

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

        return array_unique(array_merge($readyResult, $readyKeywords));
    }

    public function getSearchData($data)
    {
        $searchHomes = Home::get()->filter(function ($home) use ($data) {
            $am = json_decode($home->am);
            $ru = json_decode($home->ru);
            $en = json_decode($home->en);
            $isMatched = true;

            if ($data['searchData'][0]['type']) {
                if ($am[0]->fields[0]->selectedOptionName != $data['searchData'][0]['type']) {
                    $isMatched = false;
                };
            }

            if ($data['searchData'][1]['community']) {
                $communityData = $data['searchData'][1]['community'];
                $ourDate = [];
                if ($data['lang'] == "en") {
                    array_push($ourDate, strtolower($en[1]->fields[0]->value), $en[1]->fields[0]->communityStreet->value);
                } elseif ($data['lang'] == "ru") {
                    array_push($ourDate, strtolower($ru[1]->fields[0]->value), $ru[1]->fields[0]->communityStreet->value);
                } else {
                    array_push($ourDate, strtolower($am[1]->fields[0]->value), $am[1]->fields[0]->communityStreet->value);
                }
                $mergedArray = array_merge($ourDate, json_decode($home->keywords));
                $intersection = array_intersect($mergedArray, $communityData);

                if (empty($intersection)) {
                    $isMatched = false;
                }
            }

            if ($data['searchData'][2]['propertyType']) {
                $readyType = $this->getPropertyType($data['searchData'][2]['propertyType']);
                if (!(in_array($ru[0]->fields[1]->value, $readyType))) {
                    $isMatched = false;
                }
            }

            if ($data['searchData'][3]['rooms']) {
                $rooms = $data['searchData'][3]['rooms'];
                if ($data['lang'] == "en") {
                    if (!(in_array($am[3]->fields[3]->value, $rooms))) {
                        $isMatched = false;
                    }
                } else {
                    if (!(in_array($am[3]->fields[2]->value, $rooms))) {
                        $isMatched = false;
                    }
                }
            }

            if ((int) $data['searchData'][4]['price'] != 0) {
                $maxPrice = (int) $data['searchData'][4]['price'];
                $totalPrice = (int) $am[2]->fields[0]->value;

                if ($totalPrice > $maxPrice) {
                    $isMatched = false;
                }
            }

            $home->selectedTransactionType = isset($am[0]->fields[0]->selectedOptionName) ? $am[0]->fields[0]->selectedOptionName : '';
            $am[1]->fields[5] = [];
            $ru[1]->fields[5] = [];
            $ru[1]->fields[5] = [];
            $am[9]->fields = [];
            $ru[9]->fields = [];
            $en[9]->fields = [];

            $home->am = $am;
            $home->ru = $ru;
            $home->en = $en;

            $home->photo = json_decode($home->photo);
            $home->keywords = json_decode($home->keywords);
            $home->createdAt = Carbon::parse($home->created_at)->format('d/m/Y');
            $home->updatedAt = Carbon::parse($home->updated_at)->format('d/m/Y');

            return $isMatched;
        })->values();

        return $searchHomes;
    }

    public function getSeeMoreHomes($data)
    {
        return Home::select('id', 'home_id', 'employee_id', 'photo', 'keywords', 'status', 'am', 'ru', 'en', 'price_history', 'created_at', 'updated_at')
            ->where('status', Home::STATUS_APPROVED)
            ->get()
            ->filter(function ($home) use ($data) {
                $am = json_decode($home->am);
                $ru = json_decode($home->ru);
                $en = json_decode($home->en);
                $home->photo = json_decode($home->photo);
                $home->createdAt = Carbon::parse($home->created_at)->format('d/m/Y');
                $home->updatedAt = Carbon::parse($home->updated_at)->format('d/m/Y');
                $am[1]->fields[5] = [];
                $ru[1]->fields[5] = [];
                $ru[1]->fields[5] = [];
                $am[9]->fields = [];
                $ru[9]->fields = [];
                $en[9]->fields = [];

                $home->am = $am;
                $home->ru = $ru;
                $home->en = $en;

                $home->keywords = json_decode($home->keywords);
                $home->selectedTransactionType = isset($home->am[0]->fields[0]->selectedOptionName) ? $home->am[0]->fields[0]->selectedOptionName : '';

                if ($home->am[0]->fields[0]->selectedOptionName == $data['type']) {
                    return true;
                }

                return false;
            })->values();
    }

    public function getCommunitySearch($data, $lang)
    {
        if($data['ids']) {
          $address = ConfigAddress::select($lang, 'id')->whereIn('communityId', $data['ids'])->get();
        }else {
          $address = ConfigAddress::select($lang, 'id')->get();
        }
        
        return $address;
    }


}