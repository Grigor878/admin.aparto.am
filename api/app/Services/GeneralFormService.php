<?php
namespace App\Services;
use App\Models\GlobalForm;


class GeneralFormService
{
    public function getFormStructure()
    {
        $formStructure = FORM_STRUCTURE;
        $getForm = GlobalForm::findOrFail(1);
        $phpData = json_decode($getForm['am'], true);
        foreach ($formStructure as $key => $value) {
            if(isset($phpData[$key])){
                foreach ($phpData[$key] as $idx => $addVal) {
                    array_push($value, $addVal);
                }
                $formStructure[$key] = $value;
            }
        }
        return $formStructure;
    }

    public function addGeneralField($data) {
      $str = json_encode([
        [
          'name' => "announcement",
          'title'=> "Հայտարարություն",
          'added'=> [],
          "fields" => [
            [
              "key" => "transactionType",
              "title" => "ԳՈՐԾԱՐՔԻ ՏԵՍԱԿ",
              "type" => "select",
              "style" => "306px",
              "option" => [
                [
                  "id"=> 1,
                  "name"=> "Ընտրեք տեսակը",
                  "value" => ""
                ],
                [
                  "id"=> 2,
                  "name"=> "Վաճառք",
                  "value" => "Վաճառք"
                ],
                [
                  "id"=> 3,
                  "name"=> "Վարձակալություն",
                  "value" => "Վարձակալություն"
                ]
              ]
            ],
            [
              "key" => "propertyType",
              "title" => "ԳՈՒՅՔԻ ՏԵՍԱԿ",
              "type" => "select",
              "style" => "306px",
              "option" => [
                [
                  "id"=> 1,
                  "name"=> "Ընտրեք տեսակը",
                  "value" => ""
                ],
                [
                  "id"=> 2,
                  "name"=> "Բնակարան",
                  "value" => "Բնակարան"
                ],
                [
                  "id"=> 3,
                  "name"=> "Առանձնատուն",
                  "value" => "Առանձնատուն"
                ],
                [
                  "id"=> 4,
                  "name"=> "Կոմերցիոն (առանձնատուն)",
                  "value" => "Կոմերցիոն (առանձնատուն)"
                ],
                [
                  "id"=> 5,
                  "name"=> "Կոմերցիոն (բնակարան)",
                  "value" => "Կոմերցիոն (բնակարան)"
                ],
              ]
            ],
            [
              "key" => "announcementTitle",
              "title" => "ՀԱՅՏԱՐԱՐՈՒԹՅԱՆ ՎԵՐՆԱԳԻՐ*",
              "type" => "text",
              "style" => "629px",
              "option" => []
            ],
            [
              "key" => "announcementDesc",
              "title" => "ՀԱՅՏԱՐԱՐՈՒԹՅԱՆ ՆԿԱՐԱԳՐՈՒԹՅՈՒՆ*",
              "type" => "text",
              "style" => "629px",
              "option" => []
            ],
           [
            "key" => "announcementType",
            "title" => "ՀԱՅՏԱՐԱՐՈՒԹՅԱՆ ՏԵՍԱԿ*",
            "type" => "select",
            "style" => "306px",
            "option" => [
              [
                "id"=> 1,
                "name"=> "Ընտրեք տեսակը",
                "value" => ""
              ],
              [
                "id"=> 2,
                "name"=> "Հասարակ",
                "value" => "Հասարակ"
              ],
              [
                "id"=> 3,
                "name"=> "Տոպ",
                "value" => "Տոպ"
              ],
              [
                "id"=> 4,
                "name"=> "Շտապ",
                "value" => "Շտապ"
              ],
            ]
          ],
          ]
        ],
        [
          'name' => "location",
          'title'=> "Գտնվելու Վայրը - Երևան",
          'added'=> [],
          "fields" => [
            [
              "key" => "community",
              "title" => "Համայնք*",
              "type" => "select",
              "style" => "629px",
              "option" => [
                [
                  "id"=> 1,
                  "name"=> "Ընտրեք",
                  "value" => ""
                ],
                [
                  "id"=> 2,
                  "name"=> "Աջափնյակ",
                  "value" => "Աջափնյակ"
                ],
                [
                  "id"=> 3,
                  "name"=> "Արաբկիր",
                  "value" => "Արաբկիր"
                ],
                [
                  "id"=> 4,
                  "name"=> "Ավան",
                  "value" => "Ավան"
                ],
                [
                  "id"=> 5,
                  "name"=> "Դավթաշեն",
                  "value" => "Դավթաշեն"
                ],
                [
                  "id"=> 6,
                  "name"=> "Էրեբունի",
                  "value" => "Էրեբունի"
                ],
                [
                  "id"=> 7,
                  "name"=> "Քանաքեռ-Զեյթուն",
                  "value" => "Քանաքեռ-Զեյթուն"
                ],
                [
                  "id"=> 8,
                  "name"=> "Կենտրոն",
                  "value" => "Կենտրոն"
                ],
                [
                  "id"=> 9,
                  "name"=> "Մալաթիա-Սեբաստիա",
                  "value" => "Մալաթիա-Սեբաստիա"
                ],
                [
                  "id"=> 10,
                  "name"=> "Նորք-Մարաշ",
                  "value" => "Նորք-Մարաշ"
                ],
                [
                  "id"=> 11,
                  "name"=> "Նոր Նորք",
                  "value" => "Նոր Նորք"
                ],
                [
                  "id"=> 12,
                  "name"=> "Նուբարաշեն",
                  "value" => "Նուբարաշեն"
                ],
                [
                  "id"=> 13,
                  "name"=> "Շենգավիթ",
                  "value" => "Շենգավիթ"
                ],
                [
                  "id"=> 14,
                  "name"=> "Վահագնի թաղամաս",
                  "value" => "Վահագնի թաղամաս"
                ],
                [
                  "id"=> 15,
                  "name"=> "Այլ",
                  "value" => "Այլ"
                ]
              ]
            ],
            [
              "key" => "street",
              "title" => "Փողոց*",
              "type" => "select",
              "style" => "283px",
              "option" => []
            ],
            [
              "key" => "building",
              "title" => "Շենք*",
              "type" => "inputNumber",
              "style" => "100px",
              "option" => []
            ],
            [
              "key" => "entrance",
              "title" => "Մուտք*",
              "type" => "inputNumber",
              "style" => "100px",
              "option" => []
            ],
            [
              "key" => "apartment",
              "title" => "Բնակարան*",
              "type" => "inputNumber",
              "style" => "100px",
              "option" => []
            ],
            [
              "key" => "map",
              "title" => "MAP PIN*",
              "type" => "map",
              "style" => "631px",
              "option" => []
            ],
            [
              "key" => "realAddress",
              "title" => "Իրական հասցե*",
              "type" => "inputText",
              "style" => "629px",
              "option" => []
            ],
          ]
        ],
        [
          'name' => "price",
          'title'=> "Գինը",
          'added'=> [
            [
              "key" => "priceAdded",
              "title" => "Ավել Գինը*",
              "type" => "inputText",
              "style" => "width:80%",
              "option" => []
            ],
          ],
          "fields" => [
            [
              "key" => "totalPrice",
              "title" => "Ընդհանուր գինը*",
              "type" => "inputNumberSymbol",
              "style" => "202px",
              "option" => [
                [
                  "id"=> "priceUsd",
                  "name"=> "Գինը դոլարով",
                  "symbol"=>'usd',
                  "value" => ""
                ],
                [
                  "id"=> "priceAmd",
                  "name"=> "Գինը դրամով",
                  "symbol"=>'amd',
                  "value" => ""
                ],
                [
                  "id"=> "priceRub",
                  "name"=> "Գինը ռուբլիով",
                  "symbol"=>'rub',
                  "value" => ""
                ]
              ]
            ],
            [
              "key" => "priceNegotiable",
              "title" => "Գինը պայմանագրային",
              "type" => "checkbox",
              "style" => "",
              "option" => [
                "status" => false
               ]
            ],
            [
              "key" => "sqmPrice",
              "title" => "Գինը 1 քմ*",
              "type" => "inputNumberSymbol",
              "style" => "202px",
              "option" => [
                [
                  "id"=> "sqmPriceUsd",
                  "name"=> "Գինը դոլարով",
                  "symbol"=>'usd',
                  "value" => ""
                ],
                [
                  "id"=> "sqmPriceAmd",
                  "name"=> "Գինը դրամով",
                  "symbol"=>'amd',
                  "value" => ""
                ],
                [
                  "id"=> "sqmPriceRub",
                  "name"=> "Գինը ռուբլիով",
                  "symbol"=>'rub',
                  "value" => ""
                ]
              ]
            ],
            [
              "key" => "downPayment",
              "title" => "Կանխավճարի չափ*",
              "type" => "inputNumberSymbol",
              "style" => "202px",
              "option" => [
                [
                  "id"=> "downPaymentUsd",
                  "name"=> "Գինը դոլարով",
                  "symbol"=>'usd',
                  "value" => ""
                ],
                [
                  "id"=> "downPaymentAmd",
                  "name"=> "Գինը դրամով",
                  "symbol"=>'amd',
                  "value" => ""
                ],
                [
                  "id"=> "downPaymentRub",
                  "name"=> "Գինը ռուբլիով",
                  "symbol"=>'rub',
                  "value" => ""
                ]
              ]
            ],
            [
              "key" => "paymentMethod",
              "title" => "Վճարման կարգը*",
              "type" => "select",
              "style" => "306px",
              "option" => [
              [
                "id"=> 0,
                "name"=> "Ընտրեք",
                "value" => ""
              ],
              [
                "id"=> 1,
                "name"=> "Բանկային փոխանցում",
                "value" => "Բանկային փոխանցում"
              ],
              [
                "id"=> 2,
                "name"=> "Հիպոթեքային վարկ",
                "value" => "Հիպոթեքային վարկ"
              ],
              [
                "id"=> 3,
                "name"=> "Այլ",
                "value" => "Այլ"
              ],
              ]
            ],
            [
            "key" => "preferredBank",
            "title" => "Նախընտրած բանկը*",
            "type" => "select",
            "style" => "306px",
            "option" => [
              [
                "id"=> 0,
                "name"=> "Ընտրեք նախընտրած բանկը",
                "value" => ""
              ],
              [
                "id"=> 1,
                "name"=> "Ամերիա բանկ",
                "value" => "Ամերիա բանկ"
              ],
              [
                "id"=> 2,
                "name"=> "Էվոկաբանկ",
                "value" => "Էվոկաբանկ"
              ],
              [
                "id"=> 3,
                "name"=> "Ինեկոբանկ",
                "value" => "Ինեկոբանկ"
              ],
              [
                "id"=> 4,
                "name"=> "ԱյԴի բանկ",
                "value" => "ԱյԴի բանկ"
              ],
              [
                "id"=> 5,
                "name"=> "Ակբա բանկ",
                "value" => "Ակբա բանկ"
              ],
              [
                "id"=> 6,
                "name"=> "Մելլաթ բանկ",
                "value" => "Մելլաթ բանկ"
              ],
              [
                "id"=> 7,
                "name"=> "ՀայԷկոնոմ բանկ",
                "value" => "ՀայԷկոնոմ բանկ"
              ],
              [
                "id"=> 8,
                "name"=> "HSBC բանկ",
                "value" => "HSBC բանկ"
              ],
              [
                "id"=> 9,
                "name"=> "Յունիբանկ",
                "value" => "Յունիբանկ"
              ],
              [
                "id"=> 10,
                "name"=> "Հայբիզնեսբանկ",
                "value" => "Հայբիզնեսբանկ"
              ],
              [
                "id"=> 11,
                "name"=> "Կոնվերս բանկ",
                "value" => "Կոնվերս բանկ"
              ],
              [
                "id"=> 12,
                "name"=> "Արարատ բանկ",
                "value" => "Արարատ բանկ"
              ],
              [
                "id"=> 13,
                "name"=> "Ֆասթ բանկ",
                "value" => "Ֆասթ բանկ"
              ],
              [
                "id"=> 14,
                "name"=> "Արմսվիսբանկ",
                "value" => "Արմսվիսբանկ"
              ],
              [
                "id"=> 15,
                "name"=> "Արցախ բանկ",
                "value" => "Արցախ բանկ"
              ],
              [
                "id"=> 16,
                "name"=> "Բիբլոս Բանկ Արմենիա",
                "value" => "Բիբլոս Բանկ Արմենիա"
              ],
              [
                "id"=> 17,
                "name"=> "Արդշինբանկ",
                "value" => "Արդշինբանկ"
              ],
              [
                "id"=> 18,
                "name"=> "ՎՏԲ-Հայաստան բանկ",
                "value" => "ՎՏԲ-Հայաստան բանկ"
              ],
              [
                "id"=> 19,
                "name"=> "Այլ",
                "value" => "Այլ"
              ],
            ]
            ],
          ]
        ],
        [
          'name' => "houseDescription",
          'title'=> "Տան Նկարագիր",
          'added'=> [],
          "fields" => [
            [
              "key" => "surface",
              "title" => "Մակերես*",
              "type" => "inputNumberSymbol",
              "style" => "306px",
              "option" => [
                [
                  "id"=> 1,
                  "name"=> "Նշեք մակերեսը",
                  "symbol"=>'մ.ք.',
                  "value" => ""
                ],
              ]
            ],
            [
              "key" => "ceilingHeight",
              "title" => "Առաստաղի բարձրությունը*",
              "type" => "inputNumberSymbol",
              "style" => "306px",
              "option" => [
                [
                  "id"=> 1,
                  "name"=> "Նշեք բարձրությունը ",
                  "symbol"=>'մետր',
                  "value" => ""
                ],
              ]
            ],
            [
              "key" => "NumberOfRooms",
              "title" => "Սենյակների քանակ*",
              "type" => "numSelect",
              "style" => "306px",
              "option" => [
                [
                  "id"=> 1,
                  "name"=> "1",
                  "value" => "1"
                ],
                [
                  "id"=> 2,
                  "name"=> "2",
                  "value" => "2"
                ],
                [
                  "id"=> 3,
                  "name"=> "3",
                  "value" => "3"
                ],
                [
                  "id"=> 4,
                  "name"=> "4",
                  "value" => "4"
                ],
                [
                  "id"=> 5,
                  "name"=> "5",
                  "value" => "5"
                ],
                [
                  "id"=> 6,
                  "name"=> "6",
                  "value" => "6"
                ],
                [
                  "id"=> 7,
                  "name"=> "7+",
                  "value" => "7+"
                ],
              ]
            ],
            [
              "key" => "NumberOfBedrooms",
              "title" => "Նջասենյակի քանակ*",
              "type" => "numSelect",
              "style" => "306px",
              "option" => [
                [
                  "id"=> 1,
                  "name"=> "1",
                  "value" => "1"
                ],
                [
                  "id"=> 2,
                  "name"=> "2",
                  "value" => "2"
                ],
                [
                  "id"=> 3,
                  "name"=> "3",
                  "value" => "3"
                ],
                [
                  "id"=> 4,
                  "name"=> "4",
                  "value" => "4"
                ],
                [
                  "id"=> 5,
                  "name"=> "5",
                  "value" => "5"
                ],
                [
                  "id"=> 6,
                  "name"=> "6",
                  "value" => "6"
                ],
                [
                  "id"=> 7,
                  "name"=> "7+",
                  "value" => "7+"
                ],
              ]
            ],
            [
              "key" => "NumberOfBathrooms",
              "title" => "Սահանգույցների քանակ*",
              "type" => "numSelect",
              "style" => "306px",
              "option" => [
                [
                  "id"=> 1,
                  "name"=> "1",
                  "value" => "1"
                ],
                [
                  "id"=> 2,
                  "name"=> "2",
                  "value" => "2"
                ],
                [
                  "id"=> 3,
                  "name"=> "3",
                  "value" => "3"
                ],
                [
                  "id"=> 4,
                  "name"=> "4",
                  "value" => "4"
                ],
                [
                  "id"=> 5,
                  "name"=> "5+",
                  "value" => "5+"
                ],
              ]
            ],
            [
              "key" => "NumberOpenBalconies",
              "title" => "Բաց պատշգամբների քանակ*",
              "type" => "numSelect",
              "style" => "306px",
              "option" => [
                [
                  "id"=> 0,
                  "name"=> "0",
                  "value" => "0"
                ],
                [
                  "id"=> 1,
                  "name"=> "1",
                  "value" => "1"
                ],
                [
                  "id"=> 2,
                  "name"=> "2",
                  "value" => "2"
                ],
                [
                  "id"=> 3,
                  "name"=> "3",
                  "value" => "3"
                ],
                [
                  "id"=> 4,
                  "name"=> "4",
                  "value" => "4"
                ],
                [
                  "id"=> 5,
                  "name"=> "5",
                  "value" => "5"
                ],
                [
                  "id"=> 6,
                  "name"=> "6",
                  "value" => "6"
                ],
              ]
            ],
            [
              "key" => "NumberCloseBalconies",
              "title" => "Փակ պատշգամբների քանակ*",
              "type" => "numSelect",
              "style" => "629px",
              "option" => [
                [
                  "id"=> 0,
                  "name"=> "0",
                  "value" => "0"
                ],
                [
                  "id"=> 1,
                  "name"=> "1",
                  "value" => "1"
                ],
                [
                  "id"=> 2,
                  "name"=> "2",
                  "value" => "2"
                ],
                [
                  "id"=> 3,
                  "name"=> "3",
                  "value" => "3"
                ],
                [
                  "id"=> 4,
                  "name"=> "4",
                  "value" => "4"
                ],
                [
                  "id"=> 5,
                  "name"=> "5",
                  "value" => "5"
                ],
                [
                  "id"=> 6,
                  "name"=> "6",
                  "value" => "6"
                ],
              ]
            ],
            [
              "key" => "floor",
              "title" => "Հարկը*",
              "type" => "inputNumber",
              "style" => "306px",
              "option" => []
            ],
            [
              "key" => "houseCondition",
              "title" => "Տան վիճակ*",
              "type" => "select",
              "style" => "306px",
              "option" => [
                [
                  "id"=> 0,
                  "name"=> "Ընտրեք տեսակը",
                  "value" => ""
                ],
                [
                  "id"=> 1,
                  "name"=> "Պետական վիճակ",
                  "value" => "Պետական վիճակ"
                ],
                [
                  "id"=> 2,
                  "name"=> "Լավ",
                  "value" => "Լավ"
                ],
                [
                  "id"=> 3,
                  "name"=> "Զրոյական",
                  "value" => "Զրոյական"
                ],
                [
                  "id"=> 4,
                  "name"=> "Վերանորոգված",
                  "value" => "Վերանորոգված"
                ],
              ]
            ],
            [
              "key" => "parking",
              "title" => "Ավտոկայանատեղի*",
              "type" => "select",
              "style" => "306px",
              "option" => [
                [
                  "id"=> 0,
                  "name"=> "Ընտրեք տեսակը",
                  "value" => ""
                ],
                [
                  "id"=> 1,
                  "name"=> "Քարե",
                  "value" => "Քարե"
                ],
                [
                  "id"=> 2,
                  "name"=> "Ստորգետնյա",
                  "value" => "Ստորգետնյա"
                ],
                [
                  "id"=> 3,
                  "name"=> "Բաց ավտոկայանատեղի",
                  "value" => "Բաց ավտոկայանատեղի"
                ],
                [
                  "id"=> 4,
                  "name"=> "Ազատ տարածություն",
                  "value" => "Ազատ տարածություն"
                ],
              ]
            ],
            [
              "key" => "kitchenType",
              "title" => "Խոհանոցի տիպ*",
              "type" => "select",
              "style" => "306px",
              "option" => [
                [
                  "id"=> 0,
                  "name"=> "Ընտրեք տեսակը",
                  "value" => ""
                ],
                [
                  "id"=> 1,
                  "name"=> "Առանձին",
                  "value" => "Առանձին"
                ],
                [
                  "id"=> 2,
                  "name"=> "Ստուդիո",
                  "value" => "Ստուդիո"
                ],
                [
                  "id"=> 3,
                  "name"=> "Նախագծված չէ",
                  "value" => "Նախագծված չէ"
                ],
              ]
            ],
          ]
        ],
        [
          'name' => "buildingDescription",
          'title'=> "Շինության նկարագիր",
          'added'=> [],
          "fields" => [
           [
            "key" => "buildingType",
            "title" => "Շինության տիպ*",
            "type" => "select",
            "style" => "306px",
            "option" => [
                [
                  "id"=> 0,
                  "name"=> "Ընտրեք տեսակը",
                  "value" => ""
                ],
                [
                  "id"=> 1,
                  "name"=> "Մոնոլիտ",
                  "value" => "Մոնոլիտ"
                ],
                [
                  "id"=> 2,
                  "name"=> "Քարե",
                  "value" => "Քարե"
                ],
                [
                  "id"=> 3,
                  "name"=> "Պանելային",
                  "value" => "Պանելային"
                ],
                [
                  "id"=> 4,
                  "name"=> "Այլ",
                  "value" => "Այլ"
                ],
            ]
           ],
           [
            "key" => "statement",
            "title" => "ՀԱՐԿԱՅՆՈՒԹՅՈՒՆ*",
            "type" => "inputText",
            "style" => "306px",
            "option" => [],
           ],
           [
            "key" => "buildingConstructionYear",
            "title" => "Շենքի կառուցման տարին*",
            "type" => "inputNumber",
            "style" => "306px",
            "option" => [],
           ],
           [
            "key" => "orentation",
            "title" => "կողմնորոշումը*",
            "type" => "select",
            "style" => "306px",
            "option" => [
              [
                "id"=> 0,
                "name"=> "Ընտրեք տեսակը",
                "value" => ""
              ],
              [
                "id"=> 1,
                "name"=> "Հյուսիսային",
                "value" => "Հյուսիսային"
              ],
              [
                "id"=> 2,
                "name"=> "Հարավային",
                "value" => "Հարավային"
              ],
              [
                "id"=> 3,
                "name"=> "Արևելյան",
                "value" => "Արևելյան"
              ],
              [
                "id"=> 4,
                "name"=> "Արևմտյան",
                "value" => "Արևմտյան"
              ],
              [
                "id"=> 5,
                "name"=> "Հարավ-Արևելյան",
                "value" => "Հարավ-Արևելյան"
              ],
              [
                "id"=> 6,
                "name"=> "Հարավ-Արևմտյան",
                "value" => "Հարավ-Արևմտյան"
              ],
              [
                "id"=> 7,
                "name"=> "Հյուսիս-Արևելյան",
                "value" => "Հյուսիս-Արևելյան"
              ],
              [
                "id"=> 8,
                "name"=> "Հյուսիս-Արևմտյան",
                "value" => "Հյուսիս-Արևմտյան"
              ],
            ]
           ],
          ]
        ]
     ] );
$str = json_decode($str);
        // $form = GlobalForm::findorFail(1);
        // $form->am = json_decode($form->am);
        // $form->ru = json_decode($form->ru);
        // $form->en = json_decode($form->en);
        //str i texy $form->am

        if($str){
          foreach ($str as $key => $value) {
            if($data['am']['name'] == $value->name){
              if(isset($value->added)){
                $value->added[] = [
                  'key' => $data['am']['name']."Added",
                  "title" => $data['am']['val'],
                  "type" => "inputText",
                  "style" => 'width:80%'
                ];
              }
            }
          };
        }
        // return $str;
        // dd($str);


        // if($form->ru){
        //   foreach ($form->ru as $key => $value) {
        //     if($data['ru']['name'] == $value->name){
        //       if(isset($value->added)){
        //         $value->added[] = [$data['ru']['id'] => $data['ru']['val']];
        //       }
        //     }
        //   };
        // }

        // if($form->en){
        //   foreach ($form->en as $key => $value) {
        //     if($data['en']['name'] == $value->name){
        //       if(isset($value->added)){
        //         $value->added[] = [$data['en']['id'] => $data['en']['val']];
        //       }
        //     }
        //   };
        // }

        GlobalForm::findorFail(1)->update(['am'=> json_encode($form->am), 'ru'=> json_encode($form->ru), 'en'=> json_encode($form->en)]);
    }

    public function removeGeneralField ($data) {
        $form = GlobalForm::findorFail(1);
        $form->am = json_decode($form->am);
        $form->ru = json_decode($form->ru);
        $form->en = json_decode($form->en);
        $key = current(array_keys($data));

        if($form->am){
            foreach ($form->am as $key => $value) {
                if($data['am']['name'] == $value->name){
                  if(isset($value->added)){
                    foreach ($value->added as $idx => $field) {
                      $keys = array_keys(get_object_vars($field));
                      if($keys[0] == $data['am']['id']) {
                        unset($value->added[$idx]);
                        $value->added = array_values($value->added);
                      }
                     
                    }
                  }
                }
            };
        }
          GlobalForm::findorFail(1)->update(['am'=> json_encode($form->am)]);
    }
}