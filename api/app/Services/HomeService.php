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


             
       'urgent' => [
        'am' => 'Աջափնյակ',
        'en' => 'Ajapnyak',
        'ru' => 'Аджапняк',
       ],
       'urgent' => [
        'am' => 'Արաբկիր',
        'en' => 'Arabkir',
        'ru' => 'Арабкир',
       ],
       'urgent' => [
        'am' => 'Ավան',
        'en' => 'Avan',
        'ru' => 'Аван',
       ],
       'urgent' => [
        'am' => 'Դավթաշեն',
        'en' => 'Davtashen',
        'ru' => 'Давташен',
       ],
       'urgent' => [
        'am' => 'Էրեբունի',
        'en' => 'Erebuni',
        'ru' => 'Эребуни',
       ],
       'urgent' => [
        'am' => 'Քանաքեռ-Զեյթուն',
        'en' => 'Kanaker-Zeytun',
        'ru' => 'Канакер-Зейтун',
       ],
       'urgent' => [
        'am' => 'Կենտրոն',
        'en' => 'Kentron',
        'ru' => 'Кентрон',
       ],
       'urgent' => [
        'am' => 'Malatia-Sebastia',
        'en' => 'Urgent',
        'ru' => 'Малатия-Себастия',
       ],
       'urgent' => [
        'am' => 'Nork-Marash',
        'en' => 'Urgent',
        'ru' => 'Норк-Мараш',
       ],
       'urgent' => [
        'am' => 'Նոր Նորք',
        'en' => 'Nor Nork',
        'ru' => 'Нор Норк',
       ],
       'urgent' => [
        'am' => 'Նուբարաշեն',
        'en' => 'Nubarashen',
        'ru' => 'Нубарашен',
       ],
       'urgent' => [
        'am' => 'Շենգավիթ',
        'en' => 'Shengavit',
        'ru' => 'Шенгавит',
       ],
       'urgent' => [
        'am' => 'Վահագնի թաղամաս',
        'en' => 'Vahagni',
        'ru' => 'Ваганы',
       ],
       'urgent' => [
        'am' => 'Այլ',
        'en' => 'Other',
        'ru' => 'Другой',
       ],

       'urgent' => [
        'am' => 'Բանկային փոխանցում',
        'en' => 'Bank transfer',
        'ru' => 'Банковский перевод',
       ],
       'urgent' => [
        'am' => 'Հիպոթեքային վարկ',
        'en' => 'Mortgage',
        'ru' => 'Ипотечный заем',
       ],


       'urgent' => [
        'am' => 'Ամերիա բանկ',
        'en' => 'Ameria Bank',
        'ru' => 'Америя Банк',
       ],
       'urgent' => [
        'am' => 'Էվոկաբանկ',
        'en' => 'Evocabank',
        'ru' => 'Эвокабанк',
       ],
       'urgent' => [
        'am' => 'Ինեկոբանկ',
        'en' => 'Inecobank',
        'ru' => 'Инекобанк',
       ],
       'urgent' => [
        'am' => 'ԱյԴի բանկ',
        'en' => 'ID Bank',
        'ru' => 'ID Банк',
       ],
       'urgent' => [
        'am' => 'Ակբա բանկ',
        'en' => 'Akba Bank',
        'ru' => 'Акба Банк',
       ],
       'urgent' => [
        'am' => 'Մելլաթ բանկ',
        'en' => 'Mellat Bank',
        'ru' => 'Меллат Банк',
       ],
       'urgent' => [
        'am' => 'ՀայԷկոնոմ բանկ',
        'en' => 'Armenian Economy Bank',
        'ru' => 'Армянский экономический банк',
       ],
       'urgent' => [
        'am' => 'HSBC բանկ',
        'en' => 'HSBC bank',
        'ru' => 'HSBC Банк',
       ],
       'urgent' => [
        'am' => 'Յունիբանկ',
        'en' => 'Unibank',
        'ru' => 'Юнибанк',
       ],
       'urgent' => [
        'am' => 'Հայբիզնեսբանկ',
        'en' => 'Armbusiness Bank',
        'ru' => 'Армбизнес Банк',
       ],
       'urgent' => [
        'am' => 'Կոնվերս բանկ',
        'en' => 'Converse Bank',
        'ru' => 'Конверс Банк',
       ],
       'urgent' => [
        'am' => 'Արարատ բանկ',
        'en' => 'Ararat Bank',
        'ru' => 'Арарат Банк',
       ],
       'urgent' => [
        'am' => 'Ֆասթ բանկ',
        'en' => 'Fast bank',
        'ru' => 'Фаст банк',
       ],
       'urgent' => [
        'am' => 'Արմսվիսբանկ',
        'en' => 'Armswissbank',
        'ru' => 'Армсвисбанк',
       ],
       'urgent' => [
        'am' => 'Արցախ բանկ',
        'en' => 'Artsakh Bank',
        'ru' => 'Арцах Банк',
       ],
       'urgent' => [
        'am' => 'Բիբլոս Բանկ Արմենիա',
        'en' => 'Byblos Bank Armenia',
        'ru' => 'Библос Банк Армения',
       ],
       'urgent' => [
        'am' => 'Արդշինբանկ',
        'en' => 'Ardshinbank',
        'ru' => 'Ардшинбанк',
       ],
       'urgent' => [
        'am' => 'ՎՏԲ-Հայաստան բանկ',
        'en' => 'VTB-Armenia Bank',
        'ru' => 'ВТБ-Армения Банк',
       ],

       'urgent' => [
        'am' => 'Պետական վիճակ',
        'en' => 'State condition',
        'ru' => 'Гос. состояние',
       ],
       'urgent' => [
        'am' => 'Լավ',
        'en' => 'Good',
        'ru' => 'Хороший',
       ],
       'urgent' => [
        'am' => 'Զրոյական',
        'en' => 'Zero',
        'ru' => 'Нулевое',
       ],
       'urgent' => [
        'am' => 'Վերանորոգված',
        'en' => 'Renovated - Date:',
        'ru' => 'Отремонтировано - дата:',
       ],

       'urgent' => [
        'am' => 'Քարե',
        'en' => 'Stone',
        'ru' => 'Камень',
       ],
       'urgent' => [
        'am' => 'Ստորգետնյա',
        'en' => 'Underground',
        'ru' => 'Подземный',
       ],
       'urgent' => [
        'am' => 'Բաց ավտոկայանատեղի,',
        'en' => 'Open parking',
        'ru' => 'Открытая парковка',
       ],
       'urgent' => [
        'am' => 'Ազատ տարածություն',
        'en' => 'Free space ',
        'ru' => 'Свободное место',
       ],

       'urgent' => [
        'am' => 'Առանձին',
        'en' => 'Separate',
        'ru' => 'Отдельный',
       ],
       'urgent' => [
        'am' => 'Ստուդիո',
        'en' => 'Studio',
        'ru' => 'Студия',
       ],
       'urgent' => [
        'am' => 'Նախագծված չէ',
        'en' => 'Not designed for',
        'ru' => 'Не предназначен для',
       ],


       'urgent' => [
        'am' => 'Մոնոլիտ',
        'en' => 'Monolithic',
        'ru' => 'Монолитный',
       ],
       'urgent' => [
        'am' => 'Քարե',
        'en' => 'Stone',
        'ru' => 'Каменный',
       ],
       'urgent' => [
        'am' => 'Պանելային',
        'en' => 'Panel building',
        'ru' => 'Панельный',
       ],


       'urgent' => [
        'am' => 'Հյուսիսային',
        'en' => 'North',
        'ru' => 'Северный',
       ],
       'urgent' => [
        'am' => 'Հարավային',
        'en' => 'South',
        'ru' => 'Южный',
       ],
       'urgent' => [
        'am' => 'Արևելյան',
        'en' => 'East',
        'ru' => 'Восточный',
       ],
       'urgent' => [
        'am' => 'Արևմտյան',
        'en' => 'West',
        'ru' => 'Западный',
       ],
       'urgent' => [
        'am' => 'Հարավ-Արևելյան',
        'en' => 'South-Eastern',
        'ru' => 'Юго-Восточный',
       ],
       'urgent' => [
        'am' => 'Հարավ-Արևմտյան',
        'en' => 'South-Western',
        'ru' => 'Юго-Западный',
       ],
       'urgent' => [
        'am' => 'Հյուսիս-Արևելյան',
        'en' => 'North-Eastern',
        'ru' => 'Северо-Восточный:',
       ],
       'urgent' => [
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