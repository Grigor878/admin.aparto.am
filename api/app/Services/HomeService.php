<?php
namespace App\Services;
use App\Models\GlobalForm;


class HomeService
{

     public function getAmDistrict () {
      $amDistrict = [
        [
          "name"=> "Choose",
        ],
        [
          "name"=> "Ajapnyak",
        ],
        [
          "name"=> "Arabkir",
        ],
        [
          "name"=> "Avan",
        ],
        [
          "name"=> "Davtashen",
        ],
        [
          "name"=> "Erebuni",
        ],
        [
          "name"=> "Kanaker-Zeytun",
        ],
        [
          "name"=> "Kentron",
        ],
        [
          "name"=> "Malatia-Sebastia",
        ],
        [
          "name"=> "Nork-Marash",
        ],
        [
          "name"=> "Nor Nork",
        ],
        [
          "name"=> "Nubarashen",
        ],
        [
          "name"=> "Shengavit",
        ],
        [
          "name"=> "Vahagni",
        ],
        [
          "name"=> "Other",
        ]
      ];
      return $amDistrict;
    }

    public function getAmForm($data)
    {
      $allSelect = [
       'forSale' => [
          'am' => 'Վաճառք',
          'en' => 'For Sale',
          'ru' => 'Продается',
       ],
       'forRent' => [
        'am' => 'Վարձակալություն',
        'en' => 'For Rent',
        'ru' => 'Aрендa',
       ],
       'apartment' => [
        'am' => 'Բնակարան',
        'en' => 'Apartment',
        'ru' => 'Квартира',
       ],
       'house' => [
        'am' => 'Առանձնատուն',
        'en' => 'House',
        'ru' => 'Дом',
       ],
       'commercialTerritory' => [
        'am' => 'Կոմերցիոն (առանձնատուն)',
        'en' => 'Commercial territory',
        'ru' => 'Коммерческая площадь',
       ],
       'commercialAppartment' => [
        'am' => 'Կոմերցիոն (բնակարան)',
        'en' => 'Commercial Appartment',
        'ru' => 'Коммерческая площадь',
       ],
       'regular' => [
        'am' => 'Հասարակ',
        'en' => 'Regular',
        'ru' => 'Обычный',
       ],
       'top' => [
        'am' => 'Տոպ',
        'en' => 'Top',
        'ru' => 'Топ',
       ],
       'urgent' => [
        'am' => 'Շտապ',
        'en' => 'Urgent',
        'ru' => 'Срочно',
       ],
       'ajapnyak' => [
        'am' => 'Աջափնյակ',
        'en' => 'Ajapnyak',
        'ru' => 'Аджапняк',
       ],
       'arabkir' => [
        'am' => 'Արաբկիր',
        'en' => 'Arabkir',
        'ru' => 'Арабкир',
       ],
       'avan' => [
        'am' => 'Ավան',
        'en' => 'Avan',
        'ru' => 'Аван',
       ],
       'davtashen' => [
        'am' => 'Դավթաշեն',
        'en' => 'Davtashen',
        'ru' => 'Давташен',
       ],
       'erebuni' => [
        'am' => 'Էրեբունի',
        'en' => 'Erebuni',
        'ru' => 'Эребуни',
       ],
       'zeytun' => [
        'am' => 'Քանաքեռ-Զեյթուն',
        'en' => 'Kanaker-Zeytun',
        'ru' => 'Канакер-Зейтун',
       ],
       'kentron' => [
        'am' => 'Կենտրոն',
        'en' => 'Kentron',
        'ru' => 'Кентрон',
       ],
       'malatia' => [
        'am' => 'Մալաթիա-Սեբաստիա',
        'en' => 'Malatia-Sebastia',
        'ru' => 'Малатия-Себастия',
       ],
       'norqMarash' => [
        'am' => 'Նորք-Մարաշ',
        'en' => 'Nork-Marash',
        'ru' => 'Норк-Мараш',
       ],
       'norNorq' => [
        'am' => 'Նոր Նորք',
        'en' => 'Nor Nork',
        'ru' => 'Нор Норк',
       ],
       'nubarashen' => [
        'am' => 'Նուբարաշեն',
        'en' => 'Nubarashen',
        'ru' => 'Нубарашен',
       ],
       'shengavit' => [
        'am' => 'Շենգավիթ',
        'en' => 'Shengavit',
        'ru' => 'Шенгавит',
       ],
       'vahagni' => [
        'am' => 'Վահագնի թաղամաս',
        'en' => 'Vahagni',
        'ru' => 'Ваганы',
       ],
       'other' => [
        'am' => 'Այլ',
        'en' => 'Other',
        'ru' => 'Другой',
       ],

       'bankTransfer' => [
        'am' => 'Բանկային փոխանցում',
        'en' => 'Bank transfer',
        'ru' => 'Банковский перевод',
       ],
       'mortgageLoan' => [
        'am' => 'Հիպոթեքային վարկ',
        'en' => 'Mortgage',
        'ru' => 'Ипотечный заем',
       ],
       'ameriaBank' => [
        'am' => 'Ամերիա բանկ',
        'en' => 'Ameria Bank',
        'ru' => 'Америя Банк',
       ],
       'evocaBank' => [
        'am' => 'Էվոկաբանկ',
        'en' => 'Evocabank',
        'ru' => 'Эвокабанк',
       ],
       'inecoBank' => [
        'am' => 'Ինեկոբանկ',
        'en' => 'Inecobank',
        'ru' => 'Инекобанк',
       ],
       'idBank' => [
        'am' => 'ԱյԴի բանկ',
        'en' => 'ID Bank',
        'ru' => 'ID Банк',
       ],
       'acbaBank' => [
        'am' => 'Ակբա բանկ',
        'en' => 'Akba Bank',
        'ru' => 'Акба Банк',
       ],
       'mellatBank' => [
        'am' => 'Մելլաթ բանկ',
        'en' => 'Mellat Bank',
        'ru' => 'Меллат Банк',
       ],
       'armeconomBank' => [
        'am' => 'ՀայԷկոնոմ բանկ',
        'en' => 'Arm Economy Bank',
        'ru' => 'Арм эконом банк',
       ],
       'HSBC' => [
        'am' => 'HSBC բանկ',
        'en' => 'HSBC bank',
        'ru' => 'HSBC Банк',
       ],
       'uniBank' => [
        'am' => 'Յունիբանկ',
        'en' => 'Unibank',
        'ru' => 'Юнибанк',
       ],
       'armbusinessMank' => [
        'am' => 'Հայբիզնեսբանկ',
        'en' => 'Armbusiness Bank',
        'ru' => 'Армбизнес Банк',
       ],
       'converseBank' => [
        'am' => 'Կոնվերս բանկ',
        'en' => 'Converse Bank',
        'ru' => 'Конверс Банк',
       ],
       'araratBank' => [
        'am' => 'Արարատ բանկ',
        'en' => 'Ararat Bank',
        'ru' => 'Арарат Банк',
       ],
       'fastBank' => [
        'am' => 'Ֆասթ բանկ',
        'en' => 'Fast bank',
        'ru' => 'Фаст банк',
       ],
       'armswissBank' => [
        'am' => 'Արմսվիսբանկ',
        'en' => 'Armswissbank',
        'ru' => 'Армсвисбанк',
       ],
       'artsakh' => [
        'am' => 'Արցախ բանկ',
        'en' => 'Artsakh Bank',
        'ru' => 'Арцах Банк',
       ],
       'biblos' => [
        'am' => 'Բիբլոս Բանկ Արմենիա',
        'en' => 'Byblos Bank Armenia',
        'ru' => 'Библос Банк Армения',
       ],
       'ardshin' => [
        'am' => 'Արդշինբանկ',
        'en' => 'Ardshinbank',
        'ru' => 'Ардшинбанк',
       ],
       'vtb' => [
        'am' => 'ՎՏԲ-Հայաստան բանկ',
        'en' => 'VTB-Armenia Bank',
        'ru' => 'ВТБ-Армения Банк',
       ],

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

       'stoned' => [
        'am' => 'Քարե',
        'en' => 'Stone',
        'ru' => 'Камень',
       ],
       'underground' => [
        'am' => 'Ստորգետնյա',
        'en' => 'Underground',
        'ru' => 'Подземный',
       ],
       'openParking' => [
        'am' => 'Բաց ավտոկայանատեղի,',
        'en' => 'Open parking',
        'ru' => 'Открытая парковка',
       ],
       'freeSpace' => [
        'am' => 'Ազատ տարածություն',
        'en' => 'Free space ',
        'ru' => 'Свободное место',
       ],

       'separately' => [
        'am' => 'Առանձին',
        'en' => 'Separate',
        'ru' => 'Отдельный',
       ],
       'studio' => [
        'am' => 'Ստուդիո',
        'en' => 'Studio',
        'ru' => 'Студия',
       ],
       'notDesigned' => [
        'am' => 'Նախագծված չէ',
        'en' => 'Not designed',
        'ru' => 'Не предназначен',
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


       'north' => [
        'am' => 'Հյուսիսային',
        'en' => 'North',
        'ru' => 'Северный',
       ],
       'south' => [
        'am' => 'Հարավային',
        'en' => 'South',
        'ru' => 'Южный',
       ],
       'east' => [
        'am' => 'Արևելյան',
        'en' => 'East',
        'ru' => 'Восточный',
       ],
       'west' => [
        'am' => 'Արևմտյան',
        'en' => 'West',
        'ru' => 'Западный',
       ],
       'southEast' => [
        'am' => 'Հարավ-Արևելյան',
        'en' => 'South-Eastern',
        'ru' => 'Юго-Восточный',
       ],
       'southWest' => [
        'am' => 'Հարավ-Արևմտյան',
        'en' => 'South-Western',
        'ru' => 'Юго-Западный',
       ],
       'northEast' => [
        'am' => 'Հյուսիս-Արևելյան',
        'en' => 'North-Eastern',
        'ru' => 'Северо-Восточный',
       ],
       'northWest' => [
        'am' => 'Հյուսիս-Արևմտյան',
        'en' => 'North-Western',
        'ru' => 'Северо-Западный',
       ],





      ];

// dd( $allSelect[$data['announcement']['transactionType']]);
        $keys = [];
        $generalForm = GlobalForm::findorFail(1);
        $copyGeneralFormAm = json_decode($generalForm->am);
        foreach ($copyGeneralFormAm as $key => $item) {
            $keys[] = $item->name;
        }
        
        $assocCopyForm = array_combine($keys, $copyGeneralFormAm);
        // $normalArray = array_values($assocCopyForm);
        
        foreach ($data as $idx => $item) {
            foreach ($item as $key => $value) {
                foreach ($assocCopyForm[$idx]->fields as $globKey => $globalVal) {
                  if($globalVal->type == 'select') {
                    if($key === $globalVal->key) {
                      $lang = $allSelect[$value];
                      $assocCopyForm[$idx]->fields[$globKey]->value = $lang['am'];
                    }
                    dd($assocCopyForm);
                  }
                    if($key === $globalVal->key) {
                        $assocCopyForm[$idx]->fields[$globKey]->value = $value;
                    }
                }
            }
        }
        $normalArray = array_values($assocCopyForm);

        return $normalArray;
        $formStructure = $copyGeneralFormAm;
        return $formStructure;
    }

}