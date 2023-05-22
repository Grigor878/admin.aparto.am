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