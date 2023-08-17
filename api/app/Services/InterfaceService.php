<?php
namespace App\Services;

use App\Models\ConfigAddress;
use App\Models\Employe;
use App\Models\Home;
use Carbon\Carbon;

class InterFaceService
{

    private function processHomeData($home)
    {
        $am = json_decode($home->am);
        $ru = json_decode($home->ru);
        $en = json_decode($home->en);


        $am[1]->fields[5] = [];
        $ru[1]->fields[5] = [];
        $ru[1]->fields[5] = [];
        $am[1]->fields[1]->value = '';
        $ru[1]->fields[1]->value = '';
        $ru[1]->fields[1]->value = '';
        $am[1]->fields[3]->value = '';
        $ru[1]->fields[3]->value = '';
        $ru[1]->fields[3]->value = '';
        $am[9]->fields = [];
        $ru[9]->fields = [];
        $en[9]->fields = [];
        $am[10] = [];
        $ru[10] = [];
        $en[10] = [];

        $home->am = $am;
        $home->ru = $ru;
        $home->en = $en;
        $home->selectedTransactionType = isset($home->am[0]->fields[0]->selectedOptionName) ? $home->am[0]->fields[0]->selectedOptionName : '';
        $photo = json_decode($home->photo);
        $filteredPhoto = \Arr::where($photo, function ($value, $key) {
            return $value->visible == "true";
        });
        $home->photo = $filteredPhoto;


        return $home;
    }


    private $multiType = [
        'stateCondition' => [
            'am' => 'Պետական վիճակ',
            'en' => 'State condition',
            'ru' => 'Гос. состояние',
        ],
        'good' => [
            'am' => 'Լավ',
            'en' => 'Good',
            'ru' => 'Хороший',
        ],
        'zero' => [
            'am' => 'Զրոյական',
            'en' => 'Zero',
            'ru' => 'Нулевое',
        ],
        'renovated' => [
            'am' => 'Վերանորոգված',
            'en' => 'Renovated',
            'ru' => 'Отремонтировано',
        ],
        'monolith' => [
            'am' => 'Մոնոլիտ',
            'en' => 'Monolithic',
            'ru' => 'Монолитный',
        ],
        'panel' => [
            'am' => 'Պանելային',
            'en' => 'Panel building',
            'ru' => 'Панельный',
        ],
        'stone' => [
            'am' => 'Քարե',
            'en' => 'Stone',
            'ru' => 'Камень',
        ],
        'other' => [
            'am' => 'Այլ',
            'en' => 'Other',
            'ru' => 'Другой',
        ],
    ];

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
        return Home::latest()->take(20)->select('id', 'home_id', 'employee_id', 'photo', 'keywords', 'status', 'am', 'ru', 'en', 'price_history', 'created_at', 'updated_at')
            ->where('status', Home::STATUS_APPROVED)
            ->get()
            ->filter(function ($home) {
                $home = $this->processHomeData($home);
                $home->createdAt = Carbon::parse($home->created_at)->format('d/m/Y');
                $home->updatedAt = Carbon::parse($home->updated_at)->format('d/m/Y');
                $home->keywords = json_decode($home->keywords);

                if ($home->am[0]->fields[0]->selectedOptionName == "sale") {
                    return true;
                }
                return false;
            })->values();

    }

    public function getRentHomes()
    {
        return Home::latest()->take(20)->select('id', 'home_id', 'employee_id', 'photo', 'keywords', 'status', 'am', 'ru', 'en', 'price_history', 'created_at', 'updated_at')
            ->where('status', Home::STATUS_APPROVED)
            ->get()
            ->filter(function ($home) {
                $home = $this->processHomeData($home);
                $home->createdAt = Carbon::parse($home->created_at)->format('d/m/Y');
                $home->updatedAt = Carbon::parse($home->updated_at)->format('d/m/Y');
                $home->keywords = json_decode($home->keywords);

                if ($home->am[0]->fields[0]->selectedOptionName == "rent") {
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
        $searchInfo = "";
        $searchHomes = Home::select('id', 'home_id', 'employee_id', 'photo', 'keywords', 'status', 'am', 'ru', 'en', 'price_history', 'created_at', 'updated_at')
            ->where('status', Home::STATUS_APPROVED)
            ->get()->filter(function ($home) use ($data) {
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
                    if ($data['language'] == "en") {
                        array_push($ourDate, strtolower($en[1]->fields[0]->value), $en[1]->fields[0]->communityStreet->value);
                    } elseif ($data['language'] == "ru") {
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
                    if ($data['language'] == "en") {
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

                $home = $this->processHomeData($home);
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
                $home = $this->processHomeData($home);
                $home->createdAt = Carbon::parse($home->created_at)->format('d/m/Y');
                $home->updatedAt = Carbon::parse($home->updated_at)->format('d/m/Y');
                $home->keywords = json_decode($home->keywords);

                if ($home->am[0]->fields[0]->selectedOptionName == $data['type']) {
                    return true;
                }

                return false;
            })->values();

        }
        
    public function mapDetail($home) 
    {
        $mapDetails = [
            "id" => $home->id,
            "home_id" => $home->home_id,
            "photo" => !empty($home->photo) && isset($home->photo[0])?$home->photo[0]:[],
            "price" => $home->am[2]->fields[0]->value,
            "title" => $home->am[0]->fields[2]->value,
            "street" => $home->am[1]->fields[0]->communityStreet->value,
            "rooms" => $home->am[3]->fields[2]->value,
            "buildingType" => $home->am[4]->fields[0]->value,
            "surface" =>$home->am[3]->fields[0]->value,
            "locate" =>$home->am[1]->fields[4]->value,
        ];

        return $mapDetails;

    }

    public function getCommunitySearch($data, $lang)
    {
        if ($data['ids']) {
            $address = ConfigAddress::select($lang, 'id')->whereIn('communityId', $data['ids'])->get();
        } else {
            $address = ConfigAddress::select($lang, 'id')->get();
        }

        return $address;
    }

    public function getInterfaceProperties($id)
    {
        $home = Home::select('home_id', 'am', 'ru', 'en', 'photo', 'price_history')
            ->find($id);
        if ($home) {
            $home = $this->processHomeData($home);
            $home->priceHistory = json_decode($home->price_history);

            return $home;

        }
        return response()->json([
            'status' => 'error',
            'errors' => "Home not found"
        ], 422);
    }

    public function getResultPageData($data, $lang)
    {
        $mapArray = [];

        $searchHomes = Home::where('status', Home::STATUS_APPROVED)->get()->filter(function ($home) use ($data, $lang, &$mapArray) {
            $home = $this->processHomeData($home);
            $home->keywords = json_decode($home->keywords);
            $mapArray[]= $this->mapDetail($home);

            $isMatched = true;

            if ($data['searchData']['type']) {
                if ($home->am[0]->fields[0]->selectedOptionName != $data['searchData']['type']) {
                    $isMatched = false;
                };
            }

            if ($data['searchData']['propertyType']) {
                $readyType = $this->getPropertyType($data['searchData']['propertyType']);
                if (!(in_array($home->ru[0]->fields[1]->value, $readyType))) {
                    $isMatched = false;
                }
            }

            if ($data['searchData']['newBuild'] !== 'on') {
                if ($home->am[4]->fields[2]->value !== true) {
                    $isMatched = false;
                }
            }

            if ($data['searchData']['community']) {
                $communityData = $data['searchData']['community'];
                if ($home->am[1]->fields[0]->communityId) {
                    $ourCommunityId = $home->am[1]->fields[0]->communityId;
                    $resultCommunity = array_search($ourCommunityId, $communityData);
                    if (!is_numeric($resultCommunity)) {
                        $isMatched = false;
                    }
                }
            }

            if ($data['searchData']['streets']) {
                $streetData = $data['searchData']['streets'];
                if ($home->am[1]->fields[0]->communityStreet->streetId) {
                    $ourStreetId = $home->am[1]->fields[0]->communityStreet->streetId;
                    $resultStreet = array_search($ourStreetId, $streetData);
                    if (!is_numeric($resultStreet)) {
                        $isMatched = false;
                    }
                }
            }

            if ($data['searchData']['rooms']) {
                $rooms = $data['searchData']['rooms'];
                
                if ($lang == "en") {
                    if (!(in_array($home->am[3]->fields[3]->value, $rooms))) {
                        $isMatched = false;
                    }
                } else {
                    if (!(in_array($home->am[3]->fields[2]->value, $rooms))) {
                        $isMatched = false;
                    }
                }
            }

            if ($data['searchData']['squareMin'] || $data['searchData']['squareMax']) {
                $minSquare = $data['searchData']['squareMin'] ? (int) $data['searchData']['squareMin'] : 0;
                $maxSquare = ($data['searchData']['squareMax']) ? (int) $data['searchData']['squareMax'] : 1000000000;
                $surface = (int) $home->am[3]->fields[0]->value;
                if ($surface < $minSquare || $surface > $maxSquare) {
                    $isMatched = false;
                }
            }

            if ($data['searchData']['priceMin'] || $data['searchData']['priceMax']) {
                $minPrice = $data['searchData']['priceMin'] ? (int) $data['searchData']['priceMin'] : 0;
                $maxPrice = ($data['searchData']['priceMax']) ? (int) $data['searchData']['priceMax'] : 1000000000;
                $homePrice = (int) $home->am[2]->fields[0]->value;
                if ($homePrice < $minPrice || $homePrice > $maxPrice) {
                    $isMatched = false;
                }
            }

            if ($data['searchData']['buildingType']) {
                $buildingType = [];
                foreach ($data['searchData']['buildingType'] as $key => $type) {
                    $buildingType[] = $this->multiType[$type][$lang];
                }
                $result = array_search($home->am[4]->fields[0]->value, $buildingType);
                if (!is_numeric($result)) {
                    $isMatched = false;
                }
            }

            if ($data['searchData']['propertyCondition']) {
                $conditionType = [];
                foreach ($data['searchData']['propertyCondition'] as $key => $type) {
                    $conditionType[] = $this->multiType[$type][$lang];
                }
                $result = array_search($home->am[3]->fields[9]->value, $conditionType);
                if (!is_numeric($result)) {
                    $isMatched = false;
                }
            }

            if ($data['searchData']['floorMin'] || $data['searchData']['floorMax']) {
                $minFloor = $data['searchData']['floorMin'] ? (int) $data['searchData']['floorMin'] : 0;
                $maxFloor = $data['searchData']['floorMax'] ? (int) $data['searchData']['floorMax'] : 10000;
                $homeFloor = (int) $home->am[3]->fields[8]->value;
                if ($homeFloor < $minFloor || $homeFloor > $maxFloor) {
                    $isMatched = false;
                }
            }

            if ($data['searchData']['description']) {
                $wordsArr = explode("/", $data['searchData']['description']);
                $trimArr = array_map('trim', $wordsArr);
                if ($trimArr) {
                    $intersection = array_intersect($trimArr, $home->keywords);

                    if (empty($intersection)) {
                        $isMatched = false;
                    }

                }
            }

            if ($data['searchData']['id']) {
                $length = strlen($data['searchData']['id']);
                if (substr((string) $home->home_id, 0, $length) != $data['searchData']['id']) {
                    $isMatched = false;
                }
            }

            $home->createdAt = Carbon::parse($home->created_at)->format('d/m/Y');
            $home->updatedAt = Carbon::parse($home->updated_at)->format('d/m/Y');

            return $isMatched;
        })->values();

        return ['homes' => $searchHomes, 'mapArray' => $mapArray];

    }


}