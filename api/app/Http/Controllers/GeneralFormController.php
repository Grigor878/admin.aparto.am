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

    public function addNow() {
        $form = GlobalForm::findorFail(1);


        $form->am = json_encode(
          [
            [
              'name' => "announcement",
               'title'=> "Հայտարարություն",
              'data'=> [
                "ԳՈՐԾԱՐՔԻ ՏԵՍԱԿ",
                "ԳՈՒՅՔԻ ՏԵՍԱԿ",
                "Հայտարարության վերնագիր",
                "Հայտարարության Նկարագիր",
                "Հայտարարության ՏԵՍԱԿ",
              ],
              'added'=> [["announcement_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["announcement_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
            [
              'name'=> "location",
              'title'=> "Գտնվելու Վայրը - Երևան",
              'data'=> [
                "Համայնք",
                "Փողոց",
                "ՇԵՆՔ",
                "ՄՈՒՏՔ",
                "ԲՆԱԿԱՐԱՆ",
                "Քարտեզ",
                "ԻՐԱԿԱՆ ՀԱՍՑԵ",
              ],
              'added'=> [["location_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["location_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
            [
              'name'=> "price",
              'title'=> "Գինը",
              'data'=> [
                "ԸՆԴՀԱՆՈՒՐ ԳԻՆԸ",
                "ԳԻՆԸ ՊԱՅՄԱՆԱԳՐԱՅԻՆ",
                "ԳԻՆԸ 1քմ",
                "ՆԱԽԸՆՏՐԵԼԻ ԿԱՆԽԱՎՃԱՐԻ ՉԱՓ",
                "ՎՃԱՐՄԱՆ ԿԱՐԳԸ",
                "ՆԱԽԸՆՏՐԱԾ ԲԱՆԿԸ",
              ],
              'added'=> [["price_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["price_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
            [
              'name'=> "houseDescription",
              'title'=> "Տան Նկարագիր",
              'data'=> [
                "ՄԱԿԵՐԵՍ",
                "ԱՌԱՍՏԱՂԻ ԲԱՐՁՐՈՒԹՅՈՒՆԸ",
                "ՍԵՆՅԱԿՆԵՐԻ ՔԱՆԱԿ",
                "ՆՆՋԱՍԵՆՅԱԿՆԵՐԻ ՔԱՆԱԿ",
                "ՍԱՆՀԱՆԳՈՒՅՑՆԵՐԻ ՔԱՆԱԿ",
                "ԲԱՑ ՊԱՏՇԳԱՄԲՆԵՐԻ ՔԱՆԱԿ",
                "ՓԱԿ ՊԱՏՇԳԱՄԲՆԵՐԻ ՔԱՆԱԿ",
                "ՀԱՐԿԸ",
                "ՏԱՆ ՎԻՃԱԿ",
                "ԱՎՏՈԿԱՅԱՆԱՏԵՂԻ",
                "ԽՈՀԱՆՈՑԻ ՏԻՊ",
              ],
              'added'=> [["houseDescription_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["houseDescription_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
            [
              'name'=> "buildingDescription",
              'title'=> "Շինության Նկարագիր",
              'data'=> [
                "ՇԻՆՈՒԹՅԱՆ ՏԻՊ",
                "ՀԱՐԿԱՅՆՈՒԹՅՈՒՆ",
                "ՇԵՆՔԻ ԿԱՌՈՒՑՄԱՆ ՏԱՐԻՆ",
                "ԿՈՂՄՆՈՐՈՇՈՒՄԸ",
                "ՏԱՐԵԿԱՆ ԳՈՒՅՔԱՀԱՐԿ",
                "ԱՄՍԱԿԱՆ ՍՊԱՍԱՐԿՄԱՆ ՎՃԱՐ",
              ],
              'added'=> [["buildingDescription_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["buildingDescription_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
            [
              'name'=> "mainFacilities",
              'title'=> "Կոմունալ Հարմարություններ",
              'data'=> [
                "ԱՆՀԱՏԱԿԱՆ ՋԵՌՈՒՑՄԱՆ ՀԱՄԱԿԱՐԳ",
                "Կենտրոնացված ջեռուցման համակարգ",
                "Օդորակիչ",
                "ԿԵՆՏՐՈՆԱՑԱԾ ՀՈՎԱՑՄԱՆ ՀԱՄԱԿԱՐԳ",
                "ԷԼԵԿՏՐՈԷՆԵՐԳԻԱ",
                "ԳԱԶ",
              ],
              'added'=> [["mainFacilities_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["mainFacilities_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
             [
              'name'=> "otherFacilities",
              'title'=> "Այլ Հարմարություններ",
              'data'=> [
                "ԿԱՀՈՒՅՔ",
                "Տեխնիկա",
                "Վերելակ",
                "ՓԱԿ ՏՆՏԵՍԱԿԱՆ ՊԱՏՇԳԱՄԲ",
                "ԵՎՐՈՊԱՏՈՒՀԱՆ",
                "ԼԱՄԻՆԱՏ",
                "ՄԱՆՐԱՀԱՏԱԿ",
                "ՍԱԼԻԿԱՊԱՏՎԱԾ",
                "ՊՌԵՍԳՐԱՆԻՏ",
                "ԳԵՂԵՑԻԿ ՏԵՍԱՐԱՆ",
                "ԱՆՎՏԱՆԳՈՒԹՅԱՆ ՀԱՄԱԿԱՐԳ",
                "ԽԱՂԱՀՐԱՊԱՐԱԿ",
                "ԵՐԿԿՈՂՄԱՆԻ ԴԻՐՔ",
                "ՇՈԳԵԲԱՂՆԻՔ",
                "ԼՈՋԱ",
                "ԽՈՐԴԱՆՈՑ",
                "ԶԳԵՍՏԱՊԱՀԱՐԱՆ",
                "ԼՎԱՑՔԱՏՈՒՆ",
                "ԶԲՈՍԱՅԳԻ",
                "ԱՌԱՋԻՆ ԳԻԾ",
                "ՄԻՋԲԱԿԱՅԻՆ ՇԵՆՔ",
                "ԿԱՆԳԱՌԻ ՄՈՏ",
                "ԱՐԵՎԿՈՂՄ",
                "ՏԱՔԱՑՎՈՂ ՀԱՏԱԿ",
                "ԴԱՐՊԱՍ",
                "ՊԱՐՍՊԱՊԱՏ",
                "ԵՐԿԿՈՂՄԱՆԻ ՄՈՒՏՔ",
                "ԵՐԿԱԹՅԱ ԴՈՒՌ",
                "ԼՈՂԱՎԱԶԱՆ",
                "ՀԱՏԱԿ",
                "ԱՌԱՍՏԱՂ",
                "ԾԱԾԿԵՐ",
              ],
              'added'=> [],
            ],
            [
              'name'=> "juridical",
              'title'=> "Իրավաբանական",
              'data'=> ["ՍԵՓԱԿԱՆԱՏԵՐ", "ՍԵՓԱԿԱՆԱՏԻՐՈՁ ՀԵՌԱԽՈՍԱՀԱՄԱՐ"],
              'added'=> [],
            ],
            [
              'name'=> "information",
              'title'=> "Լրացուցիչ ինֆորմացիա",
              'data'=> ["ԻՆՖՈՐՄԱՑԻԱ", "ՓԱՍԹԱԹՈՒՂԹ"],
              'added'=> [],
            ],
            [
              'name'=> "specialists",
              'title'=> "Կից Մասնագետներ",
              'data'=> ["ԳՈՐԾԱԿԱԼ", "ՄԵՆԵՋԵՐ"],
              'added'=> [],
            ],
          ]
        );

        $form->ru = json_encode(
          [
            [
              'name' => "announcement",
              'title'=> "Объявление",
              'data'=> [
                "Тип операции",
                "Тип недвижимости",
                "Название объявления",
                "Описание объявления",
                "Тип объявления",
              ],
              'added'=> [["announcement_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["announcement_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
            [
              'name'=> "location",
              'title'=> "Расположение - Ереван",
              'data'=> [
                "Административный район",
                "Улица",
                "ЗДАНИЕ",
                "Вход",
                "Квартира",
                "На карте",
                "Реальный адрес",
              ],
              'added'=> [["location_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["location_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
            [
              'name'=> "price",
              'title'=> "Цена",
              'data'=> [
                "Цена",
                "Цена договорная",
                "Цена/ кв. м.",
                "Сумма предоплаты",
                "Способ оплаты",
                "Предпочтительный банк владельца",
              ],
              'added'=> [["price_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["price_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
            [
              'name'=> "houseDescription",
              'title'=> "Описание дома",
              'data'=> [
                "Площадь",
                "Высота потолка",
                "Кол-во комнат",
                "Кол-во спален",
                "Кол-во ванных комнат",
                "Кол-во открытых балконов",
                "Кол-во закрытых балконов",
                "Этаж",
                "Состояние квартиры",
                "Парковка",
                "Тип кухни",
              ],
              'added'=> [["houseDescription_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["houseDescription_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
            [
              'name'=> "buildingDescription",
              'title'=> "Описание Здания",
              'data'=> [
                "Тип здания",
                "Кольво этажей",
                "Дата строительства",
                "Ориентация",
                "Ежегодный налог на недвижимость",
                "Ежемесячная плата за обслуживание",
              ],
              'added'=> [["buildingDescription_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["buildingDescription_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
            [
              'name'=> "mainFacilities",
              'title'=> "Коммунальные услуги",
              'data'=> [
                "Индивидуальная система отопления",
                "Центральная система отопления",
                "Кондиционер",
                "Концентрированная система охлаждения",
                "Электричество",
                "Газ",
              ],
              'added'=> [["mainFacilities_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["mainFacilities_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
             [
              'name'=> "otherFacilities",
              'title'=> "Другие удобства",
              'data'=> [
                "МЕБЕЛЬ",
                "Техника",
                "Лифт",
                "Закрытый балкон",
                "ЕВРОПЕЙСКОЕ ОКНО",
                "ЛАМИНАТ",
                "Паркет",
                "Плиточный",
                "Керамогранит",
                "Красивый вид",
                "Система безопасности",
                "Детская площадка",
                "Двусторонняя позиция",
                "Сауна",
                "Лоджия",
                "Чулан",
                "Гардероб",
                "Прачечная",
                "Парк",
                "Первая линия",
                "Внутридворовое здание",
                "Рядом с остановкой",
                "На солнечной стороне",
                "Тёплые полы",
                "Ворота",
                "Огорожен",
                "Двусторонний вход",
                "Железная дверь",
                "Бассейн",
                "Пол",
                "Потолок",
                "Покрытия",
              ],
              'added'=> [],
            ],
            [
              'name'=> "juridical",
              'title'=> "Юридический",
              'data'=> ["Владелец", "Номер телефона владельца"],
              'added'=> [],
            ],
            [
              'name'=> "information",
              'title'=> "Дополнительная информация",
              'data'=> ["Информация", "Документ"],
              'added'=> [],
            ],
            [
              'name'=> "specialists",
              'title'=> "Дополнительные специалисты",
              'data'=> ["Агент", "Менеджер"],
              'added'=> [],
            ],
]
        );

        $form->en = json_encode(
          [
            [
              'name' => "announcement",
               'title'=> "Announcement",
              'data'=> [
                "Transactions",
                "Property Type",
                "Announcement Title",
                "Announcement Description",
                "Announcement Type",
              ],
              'added'=> [["announcement_gorcarq" => "dfsdfsdf" ], ["announcement_orinak"=> "sdfsdf" ]],
            ],
            [
              'name'=> "location",
              'title'=> "Location - Yerevan",
              'data'=> [
                "Administrative District",
                "Street",
                "Building",
                "Entrance",
                "Apartment",
                "See on Map",
                "Real Address",
              ],
              'added'=> [["location_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["location_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
            [
              'name'=> "price",
              'title'=> "Price",
              'data'=> [
                "Price",
                "Price negotiable",
                "SQM /price",
                "Down Payment",
                "Payment method",
                "Owner's preferred bank",
              ],
              'added'=> [["price_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["price_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
            [
              'name'=> "houseDescription",
              'title'=> "House Description",
              'data'=> [
                "Area",
                "Ceiling height",
                "Number of rooms:",
                "Number of bedrooms:",
                "Number of bathrooms",
                "Number of open balconies",
                "Number of closed balconies",
                "Floor",
                "Home Conditions",
                "Parking lot",
                "Kitchen type",
              ],
              'added'=> [["houseDescription_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["houseDescription_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
            [
              'name'=> "buildingDescription",
              'title'=> "Building Description",
              'data'=> [
                "Building type",
                "Number of floors",
                "Construction date",
                "Orientation",
                "Yearly property tax",
                "Monthly service fee",
              ],
              'added'=> [["buildingDescription_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["buildingDescription_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
            [
              'name'=> "mainFacilities",
              'title'=> "Utility Facilities",
              'data'=> [
                "Individual heating system",
                "Central heating system",
                "A/C",
                "Concentrated cooling system",
                "Electricity",
                "Gas",
              ],
              'added'=> [["mainFacilities_gorcarq" => "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["mainFacilities_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
            ],
             [
              'name'=> "otherFacilities",
              'title'=> "Other Facilities",
              'data'=> [
                "Furniture",
                "Equipment",
                "Elevator",
                "Closed balcony",
                "European window",
                "Laminate flooring",
                "Parquet",
                "Tiled",
                "Porcelain stoneware",
                "Beautiful view",
                "Security system",
                "Playground",
                "Two-way position",
                "Sauna",
                "Loggia",
                "Storage room",
                "Wardrobe",
                "Laundry",
                "Park",
                "First line",
                "Courtyard building",
                "Near the stop",
                "Sun-facing",
                "Heated floors",
                "Gate",
                "Fenced",
                "Two-way entrance",
                "Iron door",
                "Pool",
                "Floor",
                "Ceiling",
                "Wall-covering",
              ],
              'added'=> [],
            ],
            [
              'name'=> "juridical",
              'title'=> "Juridical",
              'data'=> ["Owner", "Owner's telephone number"],
              'added'=> [],
            ],
            [
              'name'=> "information",
              'title'=> "Additional Information",
              'data'=> ["Information", "Document"],
              'added'=> [],
            ],
            [
              'name'=> "specialists",
              'title'=> "Adjunct Specialists",
              'data'=> ["Agent", "Moderator"],
              'added'=> [],
            ],
]

        );
        $form->save();

        // $form->ru = json_decode($form->ru);
        // $form->en = json_decode($form->en);
    }
}
