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
          "transactionType" => [
            "key" => "transactionType",
            "title" => "ԳՈՐԾԱՐՔԻ ՏԵՍԱԿ",
            "type" => "select",
            "class" => "margin:left",
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
          "propertyType" => [
            "key" => "propertyType",
            "title" => "ԳՈՒՅՔԻ ՏԵՍԱԿ",
            "type" => "select",
            "class" => "margin:right",
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
          "announcementTitle" => [
            "key" => "announcementTitle",
            "title" => "ՀԱՅՏԱՐԱՐՈՒԹՅԱՆ ՎԵՐՆԱԳԻՐ*",
            "type" => "text",
            "class" => "width:80%",
            "option" => []
          ],
          "announcementDesc" => [ "key" => "announcementDesc",
          "title" => "ՀԱՅՏԱՐԱՐՈՒԹՅԱՆ ՆԿԱՐԱԳՐՈՒԹՅՈՒՆ*",
          "type" => "text",
          "class" => "width:80%",
          "option" => []
        ],
        "announcementType" => [
          "key" => "announcementType",
          "title" => "ՀԱՅՏԱՐԱՐՈՒԹՅԱՆ ՏԵՍԱԿ*",
          "type" => "select",
          "class" => "margin:left",
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