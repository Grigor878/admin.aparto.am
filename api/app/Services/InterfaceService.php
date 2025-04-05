<?php
namespace App\Services;

use App\Models\Community;
use App\Models\ConfigAddress;
use App\Models\Employe;
use App\Models\Home;
use App\Models\RecentSearch;
use Carbon\Carbon;
use DB;
use Illuminate\Support\Arr;

class InterFaceService
{
    public function processHomeData($home)
    {
        $am = json_decode($home->am);
        $ru = json_decode($home->ru);
        $en = json_decode($home->en);

        $am[1]->fields[5] = [];
        $ru[1]->fields[5] = [];
        $en[1]->fields[5] = [];
        $am[1]->fields[1]->value = '';
        $ru[1]->fields[1]->value = '';
        $en[1]->fields[1]->value = '';
        $am[1]->fields[3]->value = '';
        $ru[1]->fields[3]->value = '';
        $en[1]->fields[3]->value = '';
        $am[9]->fields = [];
        $ru[9]->fields = [];
        $en[9]->fields = [];
        $am[10] = [];
        $ru[10] = [];
        $en[10] = [];
        $am[11] = [];
        $ru[11] = [];
        $en[11] = [];

        $home->am = $am;
        $home->ru = $ru;
        $home->en = $en;
        $home->selectedTransactionType = isset($home->am[0]->fields[0]->selectedOptionName) ? $home->am[0]->fields[0]->selectedOptionName : '';
        $home->communityId = isset($home->am[1]->fields[0]->communityId) ? $home->am[1]->fields[0]->communityId : '';
        // $photo = json_decode($home->photo);
        // $filteredPhoto = [];
        // foreach ($photo as $key => $value) {

        //     if($value->visible == 'true'){
        //         array_push($filteredPhoto, $value->name);
        //     }
        // }
        // $filteredPhoto = \Arr::map($photo, function ($value, $key) {
        //     if ($value->visible == "true") {
        //         return $value;
        //     }else {
        //         return false;
        //     }
        // });
        // $home->photo = $filteredPhoto;

        return $home;
    }


    private $multiType = [
        'stateCondition' => [
            'am' => 'Պետական վիճակ',
            'en' => 'Fixer-upper',
            'ru' => 'Требует ремонта',
        ],
        'good' => [
            'am' => 'Լավ',
            'en' => 'Good',
            'ru' => 'Хорошое состояние',
        ],
        'zero' => [
            'am' => 'Զրոյական',
            'en' => 'No renovation',
            'ru' => 'Черновая',
        ],
        'renovated' => [
            'am' => 'Վերանորոգված',
            'en' => 'Renovated',
            'ru' => 'Отремонтировано',
        ],
        'monolith' => [
            'am' => 'Մոնոլիտ',
            'en' => 'Monolith',
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

    public function coillectSearchDataConst($lang, $key)
    {
        $collects = [
            'privateHouse' => [
                'am' => 'Առանձնատուն',
                'en' => 'privateHouse',
                'ru' => 'Дом',
            ],
            'commercial' => [
                'am' => 'Կոմերցիոն',
                'en' => 'Commercial',
                'ru' => 'Коммерческая',
            ],
            'house' => [
                'am' => 'Բնակարան',
                'en' => 'Apartment',
                'ru' => 'Квартира',
            ],
            'sale' => [
                'am' => 'Վաճառք',
                'en' => 'For Sale',
                'ru' => 'Продается',
            ],
            'rent' => [
                'am' => 'Վարձակալություն',
                'en' => 'For Rent',
                'ru' => 'Aрендa',
            ],
        ];

        if ($collects[$key][$lang]) {
            return $collects[$key][$lang];
        }

        return $key;

    }

    public function collectSearchMultiConst($lang, $items)
    {
        $collects = [
            'privateHouse' => [
                'am' => 'Առանձնատուն',
                'en' => 'privateHouse',
                'ru' => 'Дом',
            ],
            'commercial' => [
                'am' => 'Կոմերցիոն',
                'en' => 'Commercial',
                'ru' => 'Коммерческая',
            ],
            'house' => [
                'am' => 'Բնակարան',
                'en' => 'Apartment',
                'ru' => 'Квартира',
            ],
        ];

        $readyArr = [];
        foreach ($items as $key => $value) {
            if ($collects[$value][$lang]) {
                $readyArr[] = $collects[$value][$lang];
            }
        }

        return $readyArr;

    }

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

    public function getSaleHomes($lang)
    {
        $searchHomeArray = [];

        Home::query()
            ->orderByRaw("COALESCE(update_top_at, updated_at) DESC")
            ->select('id', 'home_id', 'employee_id', 'photo', 'keywords', 'status', 'am', 'ru', 'en', 'price_history', 'created_at', 'updated_at')
            ->where('status', Home::STATUS_APPROVED)
            ->get()
            ->filter(function ($home) use ($lang, &$searchHomeArray) {
                $home = $this->processHomeData($home);

                if ($home->am[0]->fields[0]->selectedOptionName == "sale") {
                    $prepareData =$this->mapSearchHomeDetail($home, $lang);
                    $prepareData['photo'] = Arr::get($prepareData, 'photo.0', '');
                    $searchHomeArray[] = $prepareData;
                    return true;
                }
                return false;
            })->values();

            return collect($searchHomeArray)->take(20);
    }

    public function getRentHomes($lang)
    {
        $searchHomeArray = [];

        Home::query()
            ->orderByRaw("COALESCE(update_top_at, updated_at) DESC")
            ->select('id', 'home_id', 'employee_id', 'photo', 'keywords', 'status', 'am', 'ru', 'en', 'price_history', 'created_at', 'updated_at')
            ->where('status', Home::STATUS_APPROVED)
            ->get()
            ->filter(function ($home) use ($lang, &$searchHomeArray) {
                $home = $this->processHomeData($home);

                if ($home->am[0]->fields[0]->selectedOptionName == "rent") {
                    $prepareData = $this->mapSearchHomeDetail($home, $lang);
                    $prepareData['photo'] = Arr::get($prepareData, 'photo.0', '');
                    $searchHomeArray[] = $prepareData;
                    return true;
                }

                return false;
            })->values();

            return collect($searchHomeArray)->take(20);
    }

    public function getGeneralAdmin()
    {
        $admin = Employe::where('email', 'babajanian.alex@gmail.com')->first();
        $admin->full_name = json_decode($admin['full_name'], true);
        $admin->phone = json_decode($admin['phone'], true);

        return $admin;
    }

    public function getSearchAttributes($lang='en'): array
    {
        return Community::query()
            ->whereNot('en', 'other')
            ->select('id', $lang)
            ->get()
            ->pluck($lang)
            ->filter()
            ->toArray();
    }


    public function getSearchData($data, $lang)
    {
        $searchInfo = "";
        $searchHomeArray = [];

        $allCommunities = Community::get();
        $allStreets = ConfigAddress::get();
        $addresses = ConfigAddress::select('id', 'communityId')->get()->keyBy('id');
        $getKeyWords = [];

        $rooms = [];

        if ($data['searchData'][3]['rooms']) {
            $rooms = $data['searchData'][3]['rooms'];
            if ($lang == "en") {
                foreach ($rooms as $key => $room) {
                    if ($room === "1") {
                        $rooms[$key] = "studio";
                    } elseif ($room === "7+") {
                        $rooms[$key] = "6+";
                    } else {
                        $rooms[$key] = (string) ((int) $room - 1);
                    }
                }
            }
        }

        try {
            Home::orderByRaw("COALESCE(update_top_at, updated_at) DESC")
                ->select('id', 'home_id', 'employee_id', 'photo', 'keywords', 'status', 'am', 'ru', 'en', 'price_history', 'created_at', 'updated_at')
                ->where('status', Home::STATUS_APPROVED)
                ->get()->filter(function ($home) use ($addresses, $data, $allCommunities, $lang, $allStreets, &$searchHomeArray, &$getKeyWords, $rooms) {
                    $home = $this->processHomeData($home);
                    $isMatched = true;

                    if ($data['searchData'][0]['type']) {
                        if ($home->am[0]->fields[0]->selectedOptionName != $data['searchData'][0]['type']) {
                            return false;
                        };
                    }

                    if ($communityData = $data['searchData'][1]['community']) {
                        $allCommunities = $allCommunities->whereIn($lang, $communityData);

                        $allStreetsCommunity = $allStreets->whereIn($lang, $communityData);

                        //add Merging for filter key word in communityData
                        $mergedCommunityStreets = array_merge($allCommunities->pluck($lang)->toArray(), $allStreetsCommunity->pluck($lang)->toArray());
                        $getKeyWords = array_diff($communityData, $mergedCommunityStreets);

                        if ($getKeyWords) {
                            $homeKeyWord = json_decode($home->keywords);
                            $intersectionKeyWord = array_intersect($homeKeyWord, $communityData);

                            if (empty($intersectionKeyWord)) {
                                $isMatched = false;
                            }
                        }

                        $communityIds = $allCommunities->pluck('id')->toArray();

                        if ($communityIds) {
                            if ($ourCommunityId = $home->am[1]->fields[0]->communityId) {
                                $resultCommunity = array_search($ourCommunityId, $communityIds);
                                if (!is_numeric($resultCommunity)) {
                                    $isMatched = false;
                                }
                            }
                        }
                        $searchDataStreetsId = $allStreetsCommunity->pluck('id')->toArray();

                        if (
                            $searchDataStreetsId
                        ) {
                            if (
                                $communityIds
                            ) {
                                if (
                                    in_array($home->am[1]->fields[0]->communityId, $communityIds)
                                ) {
                                    foreach ($searchDataStreetsId as $key => $add) {
                                        if ($home->am[1]->fields[0]->communityId == $addresses[$add]->communityId) {
                                            $resultStreet = in_array($home->am[1]->fields[0]->communityStreet->streetId, $searchDataStreetsId);
                                            if (!$resultStreet) {
                                                $isMatched = false;
                                            }
                                        }
                                    }

                                }

                            } else {
                                $resultStreet = in_array($home->am[1]->fields[0]->communityStreet->streetId, $searchDataStreetsId);
                                if (!$resultStreet) {
                                    $isMatched = false;
                                }
                            }
                        }

                    }

                    if ($data['searchData'][2]['propertyType']) {
                        $readyType = $this->getPropertyType($data['searchData'][2]['propertyType']);
                        if (!(in_array($home->ru[0]->fields[1]->value, $readyType))) {
                            $isMatched = false;
                        }
                    }

                    if ($rooms) {
                        // $rooms = $data['searchData'][3]['rooms'];
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

                    if ((int) $data['searchData'][4]['price'] != 0) {
                        $maxPrice = (int) $data['searchData'][4]['price'];
                        $totalPrice = (int) $home->am[2]->fields[0]->value;

                        if ($totalPrice > $maxPrice) {
                            $isMatched = false;
                        }
                    }

                    if ($isMatched) {
                        $prepareData = $this->mapSearchHomeDetail($home, $lang);
                        $prepareData['photo'] = Arr::get($prepareData, 'photo.0', '');
                        $searchHomeArray[] = $prepareData;
                    }

                    return $isMatched;
                })->values();
        } catch (\Exception $e) {
            info('getSearchData', [$e]);
        } catch (\Error $e) {
            info('getSearchData', [$e]);
        }


        $findAddresses = [];
        $findCommunity = [];

        $allCommunityes = Community::whereIn($lang, $data['searchData'][1]['community'])->get('id')->toArray();
        foreach ($allCommunityes as $key => $community) {
            $findCommunity[] = $community['id'];
        }
        $allAddresses = ConfigAddress::whereIn($lang, $data['searchData'][1]['community'])->get();
        foreach ($allAddresses as $key => $address) {
            $findAddresses[] = $address->id;
            $findCommunity[] = (int) $address->communityId;
        }


        $searchDataType = '(' . $this->coillectSearchDataConst($lang, $data['searchData'][0]['type']) . ')';

        $searchDataCommunity = '';
        if (!empty($data['searchData'][1]['community'])) {
            $searchDataCommunity = '(' . join(', ', $data['searchData'][1]['community']) . ')';
        }

        $searchDataPropertyType = '';
        if (!empty($data['searchData'][2]['propertyType'])) {
            $readyArr = $this->collectSearchMultiConst($lang, $data['searchData'][2]['propertyType']);
            $searchDataPropertyType = '(' . join(', ', $readyArr) . ')';
        }

        $searchDataRooms = '';
        if (!empty($data['searchData'][3]['rooms'])) {
            $searchDataRooms = '(' . join(', ', $data['searchData'][3]['rooms']) . ')';
        }

        $searchDataPrice = '';
        if (!empty($data['searchData'][4]['price'])) {
            $searchDataPrice = '(' . $data['searchData'][4]['price'] . ')';
        }

        $searchInfo = $searchDataType . $searchDataCommunity . $searchDataPropertyType . $searchDataRooms . $searchDataPrice;

        if ($searchInfo) {
            RecentSearch::create([
                'searchText' => $searchInfo,
                'resultCount' => count($searchHomeArray),
                'date' => Carbon::now()->addHours(4)
            ]);
        }

        if ($data['searchData'][5]['page'] && $data['searchData'][6]['perPage']) {
            if ($getKeyWords) {
                $getKeyWords = implode(" / ", $getKeyWords);
            }

            $page = $data['searchData'][5]['page'];
            $perPage = $data['searchData'][6]['perPage'];
            $paginatedArray = array_slice($searchHomeArray, ($page - 1) * $perPage, $perPage);
            $paginatedArray = new \Illuminate\Pagination\LengthAwarePaginator($paginatedArray, count($searchHomeArray), $perPage, $page);
            $info = ['addresses' => $findAddresses, 'community' => array_values(array_unique($findCommunity)), 'data' => $paginatedArray, 'keywords' => $getKeyWords];

            return $info;
        }
        return $searchHomeArray;
    }

    public function getSeeMoreHomes($data, $lang)
    {
        $searchHomeArray = [];
        Home::orderByRaw("COALESCE(update_top_at, updated_at) DESC")->select('id', 'home_id', 'employee_id', 'photo', 'keywords', 'status', 'am', 'ru', 'en', 'price_history', 'created_at', 'updated_at')
            ->where('status', Home::STATUS_APPROVED)
            ->get()
            ->filter(function ($home) use ($data, $lang, &$searchHomeArray) {
                $home = $this->processHomeData($home);

                if ($home->am[0]->fields[0]->selectedOptionName == $data['type']) {
                    $searchHomeArray[] = $this->mapSearchHomeDetail($home, $lang);
                    return true;
                }

                return false;
            })->values();

        return $searchHomeArray;

    }

    public function mapDetail($home)
    {
        $mapDetails = [
            "id" => $home->id,
            "home_id" => $home->home_id,
            "photo" => !empty($home->photo) && isset($home->photo[0]) ? $home->photo[0] : [],
            "price" => $home->am[2]->fields[0]->value,
            "title" => $home->am[0]->fields[2]->value,
            "street" => $home->am[1]->fields[0]->communityStreet->value,
            "rooms" => $home->am[3]->fields[2]->value,
            "buildingType" => $home->am[4]->fields[0]->value,
            "surface" => $home->am[3]->fields[0]->value,
            "locate" => $home->am[1]->fields[4]->value,
        ];

        return $mapDetails;

    }

    public function mapSearchHomeDetail($home, $lang)
    {
        $photo = json_decode($home->photo);

        $filteredPhoto = [];

        if ($photo !== null) {
            foreach ($photo as $key => $value) {
                if ($value->visible == 'true') {
                    array_push($filteredPhoto, $value->name);
                }
            }
        }

        if ($lang == "am") {
            $mapDetails = [
                "id" => $home->id,
                "home_id" => $home->home_id,
                "photo" => $filteredPhoto,
                "price" => $home->am[2]->fields[0]->value,
                "title" => $home->am[0]->fields[2]->value,
                "community" => $home->am[1]->fields[0]->value,
                "street" => $home->am[1]->fields[0]->communityStreet->value,
                "rooms" => $home->am[3]->fields[2]->value,
                "buildingType" => $home->am[4]->fields[0]->value,
                "surface" => $home->am[3]->fields[0]->value,
                "locate" => $home->am[1]->fields[4]->value,
                "urlSlug" => $home->am[12]->fields['0']->value.'/'.$home->id,
            ];
        } elseif ($lang == "ru") {

            $mapDetails = [
                "id" => $home->id,
                "home_id" => $home->home_id,
                "photo" => $filteredPhoto,
                "price" => $home->ru[2]->fields[0]->value,
                "title" => $home->ru[0]->fields[2]->value,
                "community" => $home->ru[1]->fields[0]->value,
                "street" => $home->ru[1]->fields[0]->communityStreet->value,
                "rooms" => $home->ru[3]->fields[2]->value,
                "buildingType" => $home->ru[4]->fields[0]->value,
                "surface" => $home->ru[3]->fields[0]->value,
                "locate" => $home->ru[1]->fields[4]->value,
                "urlSlug" => $home->ru[12]->fields['0']->value.'/'.$home->id,
            ];
        } elseif ($lang == "en") {
            $mapDetails = [
                "id" => $home->id,
                "home_id" => $home->home_id,
                "photo" => $filteredPhoto,
                "price" => $home->en[2]->fields[0]->value,
                "title" => $home->en[0]->fields[2]->value,
                "community" => $home->en[1]->fields[0]->value,
                "street" => $home->en[1]->fields[0]->communityStreet->value,
                "rooms" => $home->en[3]->fields[3]->value,
                "buildingType" => $home->en[4]->fields[0]->value,
                "surface" => $home->en[3]->fields[0]->value,
                "locate" => $home->en[1]->fields[4]->value,
                "urlSlug" => $home->en[12]->fields['0']->value.'/'.$home->id,
            ];
        }


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

    public function getInterfaceProperties($lang, $id)
    {
        $home = Home::where('status', Home::STATUS_APPROVED)
            ->orderBy('created_at', 'desc')
            ->select(
                'home_id',
                'am',
                'ru',
                'en',
                'photo',
                DB::raw('price_history as priceHistory'),
            )
            ->findOrFail($id);

        $am = json_decode($home->am);
        $ru = json_decode($home->ru);
        $en = json_decode($home->en);

        $home = $this->processHomeData($home);
        $photo = json_decode($home->photo);
        $filteredPhoto = [];
        if ($photo !== null) {
            foreach ($photo as $key => $value) {
                if ($value->visible == "true") {
                    array_push($filteredPhoto, $value);
                }
            }
        }
        $home->photo = $filteredPhoto;
        $home->priceHistory = json_decode($home->priceHistory);

        if ($am[0]->fields[1]->value === "Կոմերցիոն (առանձնատուն)" || $am[0]->fields[1]->value === "Կոմերցիոն (բնակարան)") {
            $am[0]->fields[1]->value = 'Կոմերցիոն';
            $ru[0]->fields[1]->value = 'Коммерческая';
            $en[0]->fields[1]->value = 'Commercial';
        }

        $firstVisiblePhotoData = Arr::first($home->photo, function ($value, $key) {
            return filter_var($value->visible, FILTER_VALIDATE_BOOLEAN);
        });
        $seo = [];
        switch ($lang) {
            case 'am':
                $seo = $am[12];
                break;

            case 'ru':
                $seo = $ru[12];
                break;

            case 'en':
                $seo = $en[12];
                break;
            default:
                throw new \InvalidArgumentException('The lang key is invalid.');
        }

        $readySeo = [
            'image' => $firstVisiblePhotoData ? env('REACT_APP_BASE_API_RELEASE') . "images/" . $firstVisiblePhotoData->name : '',
            'urlSlug' => $seo->fields['0']->value,
            'title' => $seo->fields['1']->value,
            'description' => $seo->fields['2']->value,
            'altText' => $seo->fields['3']->value,
        ];
        $home->seo = $readySeo;

        $home->am = $am;
        $home->ru = $ru;
        $home->en = $en;

        return $home;
    }

    public function getProperty($lang, $id)
    {
        $home = Home::where('status', Home::STATUS_APPROVED)
            ->orderBy('created_at', 'desc')
            ->select(
                'home_id',
                'am',
                'ru',
                'en',
                'photo',
                DB::raw('price_history as priceHistory'),
                DB::raw("JSON_EXTRACT(am, '$[1].fields[0].communityId') as communityId"),
                DB::raw("JSON_EXTRACT(am, '$[0].fields[0].selectedOptionName') as selectedTransactionType"),
            )
            ->findOrFail($id);

        $am = json_decode($home->am);
        $ru = json_decode($home->ru);
        $en = json_decode($home->en);

        $home = $this->processHomeData($home);
        $photo = json_decode($home->photo);
        $filteredPhoto = [];
        if ($photo !== null) {
            foreach ($photo as $key => $value) {
                if ($value->visible == "true") {
                    array_push($filteredPhoto, $value);
                }
            }
        }
        $home->photo = $filteredPhoto;

        if ($am[0]->fields[1]->value === "Կոմերցիոն (առանձնատուն)" || $am[0]->fields[1]->value === "Կոմերցիոն (բնակարան)") {
            $am[0]->fields[1]->value = 'Կոմերցիոն';
            $ru[0]->fields[1]->value = 'Коммерческая';
            $en[0]->fields[1]->value = 'Commercial';
        }

        $firstVisiblePhotoData = Arr::first($home->photo, function ($value, $key) {
            return filter_var($value->visible, FILTER_VALIDATE_BOOLEAN);
        });
        $seo = [];
        switch ($lang) {
            case 'am':
                $seo = $am[12];
                break;

            case 'ru':
                $seo = $ru[12];
                break;

            case 'en':
                $seo = $en[12];
                break;
            default:
                throw new \InvalidArgumentException('The lang key is invalid.');
        }

        $readySeo = [
            'image' => $firstVisiblePhotoData ? env('REACT_APP_BASE_API_RELEASE') . "images/" . $firstVisiblePhotoData->name : '',
            'urlSlug' => $seo->fields['0']->value,
            'title' => $seo->fields['1']->value,
            'description' => $seo->fields['2']->value,
            'altText' => $seo->fields['3']->value,
        ];
        $home->seo = $readySeo;

        $home->recomendeds = $this->getRecomendeds($lang, $id, $home->communityId);
        switch ($lang) {
            case 'am':
                $home->am = $am;
                unset($home->ru, $home->en);
                break;
            case 'ru':
                $home->ru = $ru;
                unset($home->am, $home->en);
                break;
            case 'en':
                $home->en = $en;
                unset($home->am, $home->ru);
                break;

            default:
                new \InvalidArgumentException('The lang key is invalid.');
                break;
        }

        return $home;
    }

    public function getResultPageData($data, $lang)
    {
        $searchHomeArray = [];
        $conditionType = [];
        $buildingType = [];

        // $addresses = ConfigAddress::get()->pluck('communityId');
        $addresses = ConfigAddress::select('id', 'communityId')->get()->keyBy('id');

        if ($data['searchData']['propertyCondition']) {
            foreach ($data['searchData']['propertyCondition'] as $key => $type) {
                $conditionType[] = $this->multiType[$type][$lang];
            }
        }

        if ($data['searchData']['buildingType']) {
            foreach ($data['searchData']['buildingType'] as $key => $type) {
                $buildingType[] = $this->multiType[$type][$lang];
            }
        }

        $rooms = [];

        if ($data['searchData']['rooms']) {
            $rooms = $data['searchData']['rooms'];
            if ($lang == "en") {
                foreach ($rooms as $key => $room) {
                    if ($room === "1") {
                        $rooms[$key] = "studio";
                    } elseif ($room === "7+") {
                        $rooms[$key] = "6+";
                    } else {
                        $rooms[$key] = (string) ((int) $room - 1);
                    }
                }
            }
        }


        $searchHomes = Home::orderByRaw("COALESCE(update_top_at, updated_at) DESC")
            ->where('status', Home::STATUS_APPROVED)
            ->get()
            ->filter(function ($home) use ($data, $lang, $addresses, &$searchHomeArray, &$conditionType, &$buildingType, $rooms) {
                $home = $this->processHomeData($home);
                // $home->keywords = json_decode($home->keywords);
    
                $isMatched = true;

                if ($data['searchData']['type']) {
                    if ($home->am[0]->fields[0]->selectedOptionName != $data['searchData']['type']) {
                        return false;
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
                        return false;
                        // $isMatched = false;
                    }
                }

                if ($data['searchData']['community']) {
                    $communityData = $data['searchData']['community'];
                    if ($ourCommunityId = $home->am[1]->fields[0]->communityId) {
                        $resultCommunity = array_search($ourCommunityId, $communityData);
                        if (!is_numeric($resultCommunity)) {
                            $isMatched = false;
                        }
                    }
                }

                if (
                    $data['searchData']['streets']
                ) {
                    if (
                        $data['searchData']['community']
                    ) {
                        if (
                            in_array($home->am[1]->fields[0]->communityId, $data['searchData']['community'])
                        ) {
                            foreach ($data['searchData']['streets'] as $key => $add) {
                                if ($home->am[1]->fields[0]->communityId == $addresses[$add]->communityId) {
                                    $resultStreet = in_array($home->am[1]->fields[0]->communityStreet->streetId, $data['searchData']['streets']);
                                    if (!$resultStreet) {
                                        $isMatched = false;
                                    }
                                }
                            }

                        }

                    } else {
                        $resultStreet = in_array($home->am[1]->fields[0]->communityStreet->streetId, $data['searchData']['streets']);
                        if (!$resultStreet) {
                            $isMatched = false;
                        }
                    }
                }

                if ($rooms) {
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

                if ($buildingType) {
                    // $buildingType = [];
                    // foreach ($data['searchData']['buildingType'] as $key => $type) {
                    //     $buildingType[] = $this->multiType[$type][$lang];
                    // }
                    $result = array_search($home[$lang][4]->fields[0]->value, $buildingType);
                    if (!is_numeric($result)) {
                        $isMatched = false;
                    }
                }

                if ($conditionType) {
                    // $conditionType = [];
                    // foreach ($data['searchData']['propertyCondition'] as $key => $type) {
                    //     $conditionType[] = $this->multiType[$type][$lang];
                    // }
                    $result = array_search($home[$lang][3]->fields[9]->value, $conditionType);
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
                        $intersection = array_intersect($trimArr, json_decode($home->keywords));
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

                if ($isMatched) {
                    $prepareData = $this->mapSearchHomeDetail($home, $lang);
                    $prepareData['photo'] = Arr::get($prepareData, 'photo.0', '');
                    $searchHomeArray[] = $prepareData;
                }

                return $isMatched;
            })->values();

        if ($data['searchData']['page'] && $data['searchData']['perPage']) {
            $page = $data['searchData']['page'];
            $perPage = $data['searchData']['perPage'];
            $paginatedArray = array_slice($searchHomeArray, ($page - 1) * $perPage, $perPage);
            $paginatedArray = new \Illuminate\Pagination\LengthAwarePaginator($paginatedArray, count($searchHomeArray), $perPage, $page);
            return $paginatedArray;
        }

        return $searchHomeArray;

        // return  Crypt::encrypt(json_encode($searchHomeArray)); 

    }

    public function getRecentSearch()
    {
        $recentSearch = RecentSearch::select(['id', 'searchText', 'resultCount', 'date'])
            ->orderBy('id', 'desc')
            ->get();
        return $recentSearch;
    }

    public function getRecomendeds($lang, $homeId, $communityId)
    {
        return Home::query()
            ->where('status', Home::STATUS_APPROVED)
            ->where('id', '!=', $homeId)
            ->whereRaw("JSON_EXTRACT(am, '$[1].fields[0].communityId') = ?", [$communityId])
            ->orderBy('id', 'desc')
            ->limit(7)
            ->get()
            ->map(function ($home) use ($lang) {
                $home = $this->processHomeData($home);
                $home = $this->mapSearchHomeDetail($home, $lang);
                $home['photo'] = Arr::get($home['photo'], '0', '');
                ;
                return $home;
            });

    }

    public function getPropertiSeo($lang, $homeId)
    {
        $home = Home::query()
            ->where('status', Home::STATUS_APPROVED)
            ->where('id', $homeId)
            ->first();

        $firstVisiblePhotoData = $this->getFirstVisiblePhoto(json_decode($home->photo, true));

        switch ($lang) {
            case 'am':
                $homeLangJson = json_decode($home->am, true);
                break;

            case 'ru':
                $homeLangJson = json_decode($home->ru, true);
                break;

            case 'en':
                $homeLangJson = json_decode($home->en, true);
                break;
            default:
                throw new \InvalidArgumentException('The lang key is invalid.');
        }

        $prepareSeo = $homeLangJson[12];

        return ['seo' => $this->getPrepareSeo($prepareSeo, $firstVisiblePhotoData)];


    }

    public function getPrepareSeo($seo, $firstVisiblePhotoData)
    {
        return [
            'image' => $firstVisiblePhotoData ? env('REACT_APP_BASE_API_RELEASE') . "images/" . $firstVisiblePhotoData['name'] : '',
            'urlSlug' => $seo['fields']['0']['value'],
            'title' => $seo['fields']['1']['value'],
            'description' => $seo['fields']['2']['value'],
            'altText' => $seo['fields']['3']['value'],
        ];
    }

    public function getFirstVisiblePhoto($photos)
    {
        return Arr::first($photos, function ($value, $key) {
            return filter_var($value['visible'], FILTER_VALIDATE_BOOLEAN);
        });
    }




}