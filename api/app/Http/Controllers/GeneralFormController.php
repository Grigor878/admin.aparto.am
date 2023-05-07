<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GlobalForm;
use App\Services\GeneralFormService;


class GeneralFormController extends Controller
{
    protected $generalFormService;

    public function __construct(GeneralFormService $generalFormService)
    {
        $this->generalFormService = $generalFormService;
    }
    
    public function addGlobalForm(Request $request) {
        $data = $request->all();
        $formAm = new GlobalForm();
        $formAm->am = json_encode($data);
        $formAm->save();

    }

    public function getAddedFields () {
        $form = GlobalForm::findorFail(1);

        $form->am = json_decode($form->am);
        $form->ru = json_decode($form->ru);
        $form->en = json_decode($form->en);
        return response()->json($form);
    }

    public function getFormStructure() {

        // $structure = $this->generalFormService->getFormStructure();
        $form = GlobalForm::findorFail(1);
        // $obj = [
        //   'am' => [
        //     'name'=> "announcement",
        //     'id' => 'announcement_id1',
        //     'val' => 'Ավելացրած'
        //   ]
        // ] ;
        $form->am = json_decode($form->am);
        $form->ru = json_decode($form->ru);
        $form->en = json_decode($form->en);

return json_decode(GlobalForm::findorFail(1)->am);
    }

    public function addGlobalFormField(Request $request) {
        $data = $request->all();
        $this->generalFormService->addGeneralField($data);
        return json_decode(GlobalForm::findorFail(1)->am);
    }

    public function removeGlobalFormField(Request $request) {
        $data = $request->all();
        $this->generalFormService->removeGeneralField($data);
        return json_decode(GlobalForm::findorFail(1)->am);
    }

    public function getAllStructure() {
      // $form = GlobalForm::findorFail(1);
      // $form->am = json_decode($form->am);
      // $form->ru = json_decode($form->ru);
      // $form->en = json_decode($form->en);
      // return response()->json($form);
      $str = [
        [
          'name' => "announcement",
          'title'=> "Հայտարարություն",
          'added'=> [],
          "fields" => [
            [
              "key" => "transactionType",
              "title" => "ԳՈՐԾԱՐՔԻ ՏԵՍԱԿ",
              "type" => "select",
              "style" => "margin:left",
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
              "style" => "margin:right",
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
              "style" => "width:80%",
              "option" => []
            ],
            [
            "key" => "announcementDesc",
            "title" => "ՀԱՅՏԱՐԱՐՈՒԹՅԱՆ ՆԿԱՐԱԳՐՈՒԹՅՈՒՆ*",
            "type" => "text",
            "style" => "width:80%",
            "option" => []
          ],
           [
            "key" => "announcementType",
            "title" => "ՀԱՅՏԱՐԱՐՈՒԹՅԱՆ ՏԵՍԱԿ*",
            "type" => "select",
            "style" => "margin:left",
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
              "style" => "margin:left",
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
            "type" => "streetSelect",
            "style" => "margin:right",
            "option" => [ ]
            ],
           [
              "key" => "building",
              "title" => "Շենք*",
              "type" => "inputText",
              "style" => "width:80%",
              "option" => []
            ],
            [
              "key" => "entrance",
              "title" => "Մուտք*",
              "type" => "inputNumber",
              "style" => "width:80%",
              "option" => []
            ],
            [
              "key" => "apartment",
              "title" => "Բնակարան*",
              "type" => "inputNumber",
              "style" => "margin:left",
              "option" => []
            ],
            [
              "key" => "realAddress",
              "title" => "Իրական հասցե*",
              "type" => "inputText",
              "style" => "margin:left",
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
              "style" => "margin:left",
              "option" => [
                [
                  "id"=> 1,
                  "name"=> "Գինը դոլարով",
                  "symbol"=>'usd',
                  "value" => ""
                ],
                [
                  "id"=> 2,
                  "name"=> "Գինը դրամով",
                  "symbol"=>'amd',
                  "value" => ""
                ],
                [
                  "id"=> 3,
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
              "style" => "margin:right",
              "option" => [
                "status" => false
               ]
            ],
            [
              "key" => "sqmPrice",
              "title" => "Գինը 1 քմ*",
              "type" => "inputNumberSymbol",
              "style" => "margin:left",
              "option" => [
                [
                  "id"=> 1,
                  "name"=> "Գինը դոլարով",
                  "symbol"=>'usd',
                  "value" => ""
                ],
                [
                  "id"=> 2,
                  "name"=> "Գինը դրամով",
                  "symbol"=>'amd',
                  "value" => ""
                ],
                [
                  "id"=> 3,
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
              "style" => "margin:left",
              "option" => [
                [
                  "id"=> 1,
                  "name"=> "Գինը դոլարով",
                  "symbol"=>'usd',
                  "value" => ""
                ],
                [
                  "id"=> 2,
                  "name"=> "Գինը դրամով",
                  "symbol"=>'amd',
                  "value" => ""
                ],
                [
                  "id"=> 3,
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
            "style" => "margin:left",
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
            "style" => "margin:left",
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
//                 "Number of rooms:",
//                 "Number of bedrooms:",
//                 "Number of bathrooms",
//                 "Number of open balconies",
//                 "Number of closed balconies",
//                 "Floor",
//                 "Home Conditions",
//                 "Parking lot",
//                 "Kitchen type",
        [
          'name' => "houseDescription",
          'title'=> "Տան Նկարագիր",
          'added'=> [],
          "fields" => [
            [
              "key" => "surface",
              "title" => "Մակերես*",
              "type" => "inputNumberSymbol",
              "style" => "margin:left",
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
              "style" => "margin:left",
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
              "style" => "margin:left",
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
              "style" => "margin:left",
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
              "style" => "margin:left",
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
              "style" => "margin:left",
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
              "style" => "margin:left",
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
              "type" => "inputText",
              "style" => "width:80%",
              "option" => []
            ],
            [
              "key" => "houseCondition",
              "title" => "Տան վիճակ*",
              "type" => "select",
              "style" => "margin:left",
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
              "style" => "margin:left",
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
              "style" => "margin:left",
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
        
     ] ;
     
     return response()->json($str);
  }

  public function addNow() {
//         $form = GlobalForm::findorFail(1);


//         $form->am = json_encode(
//           [
//             [
//               'name' => "announcement",
//                'title'=> "Հայտարարություն",
//               'data'=> [
//                 "ԳՈՐԾԱՐՔԻ ՏԵՍԱԿ" => [
//                   "Ընտրեք տեսակը",
//                   "Վարձակալություն",
//                   "Վաճառք",
//                 ],
//                 "ԳՈՒՅՔԻ ՏԵՍԱԿ" => [
//                   "Ընտրեք տեսակը",
                  
//                 ],
//                 "Հայտարարության վերնագիր",
//                 "Հայտարարության Նկարագիր",
//                 "Հայտարարության ՏԵՍԱԿ",
//               ],
//               'added'=> [],
//             ],
//             [
//               'name'=> "location",
//               'title'=> "Գտնվելու Վայրը - Երևան",
//               'data'=> [
//                 "Համայնք",
//                 "Փողոց",
//                 "ՇԵՆՔ",
//                 "ՄՈՒՏՔ",
//                 "ԲՆԱԿԱՐԱՆ",
//                 "Քարտեզ",
//                 "ԻՐԱԿԱՆ ՀԱՍՑԵ",
//               ],
//               'added'=> [],
//             ],
//             [
//               'name'=> "price",
//               'title'=> "Գինը",
//               'data'=> [
//                 "ԸՆԴՀԱՆՈՒՐ ԳԻՆԸ",
//                 "ԳԻՆԸ ՊԱՅՄԱՆԱԳՐԱՅԻՆ",
//                 "ԳԻՆԸ 1քմ",
//                 "ՆԱԽԸՆՏՐԵԼԻ ԿԱՆԽԱՎՃԱՐԻ ՉԱՓ",
//                 "ՎՃԱՐՄԱՆ ԿԱՐԳԸ",
//                 "ՆԱԽԸՆՏՐԱԾ ԲԱՆԿԸ",
//               ],
//               'added'=> [],
//             ],
//             [
//               'name'=> "houseDescription",
//               'title'=> "Տան Նկարագիր",
//               'data'=> [
//                 "ՄԱԿԵՐԵՍ",
//                 "ԱՌԱՍՏԱՂԻ ԲԱՐՁՐՈՒԹՅՈՒՆԸ",
//                 "ՍԵՆՅԱԿՆԵՐԻ ՔԱՆԱԿ",
//                 "ՆՆՋԱՍԵՆՅԱԿՆԵՐԻ ՔԱՆԱԿ",
//                 "ՍԱՆՀԱՆԳՈՒՅՑՆԵՐԻ ՔԱՆԱԿ",
//                 "ԲԱՑ ՊԱՏՇԳԱՄԲՆԵՐԻ ՔԱՆԱԿ",
//                 "ՓԱԿ ՊԱՏՇԳԱՄԲՆԵՐԻ ՔԱՆԱԿ",
//                 "ՀԱՐԿԸ",
//                 "ՏԱՆ ՎԻՃԱԿ",
//                 "ԱՎՏՈԿԱՅԱՆԱՏԵՂԻ",
//                 "ԽՈՀԱՆՈՑԻ ՏԻՊ",
//               ],
//               'added'=> [],
//             ],
//             [
//               'name'=> "buildingDescription",
//               'title'=> "Շինության Նկարագիր",
//               'data'=> [
//                 "ՇԻՆՈՒԹՅԱՆ ՏԻՊ",
//                 "ՀԱՐԿԱՅՆՈՒԹՅՈՒՆ",
//                 "ՇԵՆՔԻ ԿԱՌՈՒՑՄԱՆ ՏԱՐԻՆ",
//                 "ԿՈՂՄՆՈՐՈՇՈՒՄԸ",
//                 "ՏԱՐԵԿԱՆ ԳՈՒՅՔԱՀԱՐԿ",
//                 "ԱՄՍԱԿԱՆ ՍՊԱՍԱՐԿՄԱՆ ՎՃԱՐ",
//               ],
//               'added'=> [],
//             ],
//             [
//               'name'=> "mainFacilities",
//               'title'=> "Կոմունալ Հարմարություններ",
//               'data'=> [
//                 "ԱՆՀԱՏԱԿԱՆ ՋԵՌՈՒՑՄԱՆ ՀԱՄԱԿԱՐԳ",
//                 "Կենտրոնացված ջեռուցման համակարգ",
//                 "Օդորակիչ",
//                 "ԿԵՆՏՐՈՆԱՑԱԾ ՀՈՎԱՑՄԱՆ ՀԱՄԱԿԱՐԳ",
//                 "ԷԼԵԿՏՐՈԷՆԵՐԳԻԱ",
//                 "ԳԱԶ",
//               ],
//               'added'=> [],
//             ],
//              [
//               'name'=> "otherFacilities",
//               'title'=> "Այլ Հարմարություններ",
//               'data'=> [
//                 "ԿԱՀՈՒՅՔ",
//                 "Տեխնիկա",
//                 "Վերելակ",
//                 "ՓԱԿ ՏՆՏԵՍԱԿԱՆ ՊԱՏՇԳԱՄԲ",
//                 "ԵՎՐՈՊԱՏՈՒՀԱՆ",
//                 "ԼԱՄԻՆԱՏ",
//                 "ՄԱՆՐԱՀԱՏԱԿ",
//                 "ՍԱԼԻԿԱՊԱՏՎԱԾ",
//                 "ՊՌԵՍԳՐԱՆԻՏ",
//                 "ԳԵՂԵՑԻԿ ՏԵՍԱՐԱՆ",
//                 "ԱՆՎՏԱՆԳՈՒԹՅԱՆ ՀԱՄԱԿԱՐԳ",
//                 "ԽԱՂԱՀՐԱՊԱՐԱԿ",
//                 "ԵՐԿԿՈՂՄԱՆԻ ԴԻՐՔ",
//                 "ՇՈԳԵԲԱՂՆԻՔ",
//                 "ԼՈՋԱ",
//                 "ԽՈՐԴԱՆՈՑ",
//                 "ԶԳԵՍՏԱՊԱՀԱՐԱՆ",
//                 "ԼՎԱՑՔԱՏՈՒՆ",
//                 "ԶԲՈՍԱՅԳԻ",
//                 "ԱՌԱՋԻՆ ԳԻԾ",
//                 "ՄԻՋԲԱԿԱՅԻՆ ՇԵՆՔ",
//                 "ԿԱՆԳԱՌԻ ՄՈՏ",
//                 "ԱՐԵՎԿՈՂՄ",
//                 "ՏԱՔԱՑՎՈՂ ՀԱՏԱԿ",
//                 "ԴԱՐՊԱՍ",
//                 "ՊԱՐՍՊԱՊԱՏ",
//                 "ԵՐԿԿՈՂՄԱՆԻ ՄՈՒՏՔ",
//                 "ԵՐԿԱԹՅԱ ԴՈՒՌ",
//                 "ԼՈՂԱՎԱԶԱՆ",
//                 "ՀԱՏԱԿ",
//                 "ԱՌԱՍՏԱՂ",
//                 "ԾԱԾԿԵՐ",
//               ],
//               'added'=> [],
//             ],
//             [
//               'name'=> "juridical",
//               'title'=> "Իրավաբանական",
//               'data'=> ["ՍԵՓԱԿԱՆԱՏԵՐ", "ՍԵՓԱԿԱՆԱՏԻՐՈՁ ՀԵՌԱԽՈՍԱՀԱՄԱՐ"],
//               'added'=> [],
//             ],
//             [
//               'name'=> "information",
//               'title'=> "Լրացուցիչ ինֆորմացիա",
//               'data'=> ["ԻՆՖՈՐՄԱՑԻԱ", "ՓԱՍԹԱԹՈՒՂԹ"],
//               'added'=> [],
//             ],
//             [
//               'name'=> "specialists",
//               'title'=> "Կից Մասնագետներ",
//               'data'=> ["ԳՈՐԾԱԿԱԼ", "ՄԵՆԵՋԵՐ"],
//               'added'=> [],
//             ],
//           ]
//         );

//         $form->ru = json_encode(
//           [
//             [
//               'name' => "announcement",
//               'title'=> "Объявление",
//               'data'=> [
//                 "Тип операции",
//                 "Тип недвижимости",
//                 "Название объявления",
//                 "Описание объявления",
//                 "Тип объявления",
//               ],
//               'added'=> [],
//             ],
//             [
//               'name'=> "location",
//               'title'=> "Расположение - Ереван",
//               'data'=> [
//                 "Административный район",
//                 "Улица",
//                 "ЗДАНИЕ",
//                 "Вход",
//                 "Квартира",
//                 "На карте",
//                 "Реальный адрес",
//               ],
//               'added'=>[],
//             ],
//             [
//               'name'=> "price",
//               'title'=> "Цена",
//               'data'=> [
//                 "Цена",
//                 "Цена договорная",
//                 "Цена/ кв. м.",
//                 "Сумма предоплаты",
//                 "Способ оплаты",
//                 "Предпочтительный банк владельца",
//               ],
//               'added'=> [],
//             ],
//             [
//               'name'=> "houseDescription",
//               'title'=> "Описание дома",
//               'data'=> [
//                 "Площадь",
//                 "Высота потолка",
//                 "Кол-во комнат",
//                 "Кол-во спален",
//                 "Кол-во ванных комнат",
//                 "Кол-во открытых балконов",
//                 "Кол-во закрытых балконов",
//                 "Этаж",
//                 "Состояние квартиры",
//                 "Парковка",
//                 "Тип кухни",
//               ],
//               'added'=> [],
//             ],
//             [
//               'name'=> "buildingDescription",
//               'title'=> "Описание Здания",
//               'data'=> [//                 "Тип здания",
//                 "Кольво этажей",
//                 "Дата строительства",
//                 "Ориентация",
//                 "Ежегодный налог на недвижимость",
//                 "Ежемесячная плата за обслуживание",
//               ],
//               'added'=>[],
//             ],
//             [
//               'name'=> "mainFacilities",
//               'title'=> "Коммунальные услуги",
//               'data'=> [
//                 "Индивидуальная система отопления",
//                 "Центральная система отопления",
//                 "Кондиционер",
//                 "Концентрированная система охлаждения",
//                 "Электричество",
//                 "Газ",
//               ],
//               'added'=> [],
//             ],
//              [
//               'name'=> "otherFacilities",
//               'title'=> "Другие удобства",
//               'data'=> [
//                 "МЕБЕЛЬ",
//                 "Техника",
//                 "Лифт",
//                 "Закрытый балкон",
//                 "ЕВРОПЕЙСКОЕ ОКНО",
//                 "ЛАМИНАТ",
//                 "Паркет",
//                 "Плиточный",
//                 "Керамогранит",
//                 "Красивый вид",
//                 "Система безопасности",
//                 "Детская площадка",
//                 "Двусторонняя позиция",
//                 "Сауна",
//                 "Лоджия",
//                 "Чулан",
//                 "Гардероб",
//                 "Прачечная",
//                 "Парк",
//                 "Первая линия",
//                 "Внутридворовое здание",
//                 "Рядом с остановкой",
//                 "На солнечной стороне",
//                 "Тёплые полы",
//                 "Ворота",
//                 "Огорожен",
//                 "Двусторонний вход",
//                 "Железная дверь",
//                 "Бассейн",
//                 "Пол",
//                 "Потолок",
//                 "Покрытия",
//               ],
//               'added'=> [],
//             ],
//             [
//               'name'=> "juridical",
//               'title'=> "Юридический",
//               'data'=> ["Владелец", "Номер телефона владельца"],
//               'added'=> [],
//             ],
//             [
//               'name'=> "information",
//               'title'=> "Дополнительная информация",
//               'data'=> ["Информация", "Документ"],
//               'added'=> [],
//             ],
//             [
//               'name'=> "specialists",
//               'title'=> "Дополнительные специалисты",
//               'data'=> ["Агент", "Менеджер"],
//               'added'=> [],
//             ],
// ]
//         );
//         $form->en = json_encode(
//           [
//             [
//               'name' => "announcement",
//                'title'=> "Announcement",
//               'data'=> [
//                 "Transactions",
//                 "Property Type",
//                 "Announcement Title",
//                 "Announcement Description",
//                 "Announcement Type",
//               ],
//               'added'=> [],
//             ],
//             [
//               'name'=> "location",
//               'title'=> "Location - Yerevan",
//               'data'=> [
//                 "Administrative District",
//                 "Street",
//                 "Building",
//                 "Entrance",
//                 "Apartment",
//                 "See on Map",
//                 "Real Address",
//               ],
//               'added'=>[],
//             ],
//             [
//               'name'=> "price",
//               'title'=> "Price",
//               'data'=> [
//                 "Price",
//                 "Price negotiable",
//                 "SQM /price",
//                 "Down Payment",
//                 "Payment method",
//                 "Owner's preferred bank",
//               ],
//               'added'=> [],
//             ],
//             [
//               'name'=> "houseDescription",
//               'title'=> "House Description",
//               'data'=> [
//                 "Area",
//                 "Ceiling height",
//                 "Number of rooms:",
//                 "Number of bedrooms:",
//                 "Number of bathrooms",
//                 "Number of open balconies",
//                 "Number of closed balconies",
//                 "Floor",
//                 "Home Conditions",
//                 "Parking lot",
//                 "Kitchen type",
//               ],
//               'added'=> [],
//             ],
//             [
//               'name'=> "buildingDescription",
//               'title'=> "Building Description",
//               'data'=> [
//                 "Building type",
//                 "Number of floors",
//                 "Construction date",
//                 "Orientation",
//                 "Yearly property tax",
//                 "Monthly service fee",
//               ],
//               'added'=>[],
//             ],
//             [
//               'name'=> "mainFacilities",
//               'title'=> "Utility Facilities",
//               'data'=> [
//                 "Individual heating system",
//                 "Central heating system",
//                 "A/C",
//                 "Concentrated cooling system",
//                 "Electricity",
//                 "Gas",
//               ],
//               'added'=> [],
//             ],
//              [
//               'name'=> "otherFacilities",
//               'title'=> "Other Facilities",
//               'data'=> [
//                 "Furniture",
//                 "Equipment",
//                 "Elevator",
//                 "Closed balcony",
//                 "European window",
//                 "Laminate flooring",
//                 "Parquet",
//                 "Tiled",
//                 "Porcelain stoneware",
//                 "Beautiful view",
//                 "Security system",
//                 "Playground",
//                 "Two-way position",
//                 "Sauna",
//                 "Loggia",
//                 "Storage room",
//                 "Wardrobe",
//                 "Laundry",
//                 "Park",
//                 "First line",
//                 "Courtyard building",
//                 "Near the stop",
//                 "Sun-facing",
//                 "Heated floors",
//                 "Gate",
//                 "Fenced",
//                 "Two-way entrance",
//                 "Iron door",
//                 "Pool",
//                 "Floor",
//                 "Ceiling",
//                 "Wall-covering",
//               ],
//               'added'=> [],
//             ],
//             [//               'name'=> "juridical",
//               'title'=> "Juridical",
//               'data'=> ["Owner", "Owner's telephone number"],
//               'added'=> [],
//             ],
//             [
//               'name'=> "information",
//               'title'=> "Additional Information",
//               'data'=> ["Information", "Document"],
//               'added'=> [],
//             ],
//             [
//               'name'=> "specialists",
//               'title'=> "Adjunct Specialists",
//               'data'=> ["Agent", "Moderator"],
//               'added'=> [],
//             ],
// ]

//         );
//         $form->save();

    }
  }