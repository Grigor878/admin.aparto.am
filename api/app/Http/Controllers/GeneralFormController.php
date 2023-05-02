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
                    "Հայտարարության ՆԿԱՐԱԳՐՈՒԹՅՈՒՆ",
                    "Հայտարարության ՏԵՍԱԿ",
                  ],
                  'added'=> [[ "announcement_masnik"=> "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["announcement_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
                ],
                [
                  'name'=> "location",
                  'title'=> "Գտնվելու Վայրը",
                  'data'=> [
                    "Համայնք",
                    "Փողոց",
                    "ՇԵՆՔ",
                    "ՄՈՒՏՔ",
                    "ԲՆԱԿԱՐԱՆ",
                    "ԻՐԱԿԱՆ ՀԱՍՑԵ",
                  ],
                  'added'=> [[ "announcement_masnik"=> "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["announcement_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
                ],
                [
                  'name'=> "price",
                  'title'=> "Գինը",
                  'data'=> [
                    "ԸՆԴՀԱՆՈՒՐ ԳԻՆԸ",
                    "ԳԻՆԸ 1քմ",
                    "ԿԱՆԽԱՎՃԱՐԻ ՉԱՓ",
                    "ՎՃԱՐՄԱՆ ԿԱՐԳԸ",
                    "ՆԱԽԸՆՏՐԱԾ ԲԱՆԿԸ",
                  ],
                  'added'=> [[ "announcement_masnik"=> "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["announcement_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
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
                 'added'=> [[ "announcement_masnik"=> "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["announcement_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
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
                 'added'=> [[ "announcement_masnik"=> "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["announcement_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
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
                  'added'=> [[ "announcement_masnik"=> "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["announcement_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
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
                  'added'=> [[ "announcement_masnik"=> "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["announcement_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
                ],
                [
                  'name'=> "juridical",
                  'title'=> "Իրավաբանական",
                  'data'=> ["ՍԵՓԱԿԱՆԱՏԵՐ", "ՍԵՓԱԿԱՆԱՏԻՐՈՁ ՀԵՌԱԽՈՍԱՀԱՄԱՐ"],
                  'added'=> [[ "announcement_masnik"=> "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["announcement_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
                ],
                [
                  'name'=> "information",
                  'title'=> "ԻՆՖՈՐՄԱՑԻԱ",
                  'data'=> ["ԻՆՖՈՐՄԱՑԻԱ"],
                  'added'=> [[ "announcement_masnik"=> "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["announcement_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
                ],
                [
                  'name'=> "specialists",
                  'title'=> "Կից Մասնագետներ",
                  'data'=> ["ԳՈՐԾԱԿԱԼ", "ՄԵՆԵՋԵՐ"],
                  'added'=> [[ "announcement_masnik"=> "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" ], ["announcement_orinak"=> "ԳՈՐԾԱՐՔԻ Օրինակ" ]],
                ],
              ]
        );
        $form->save();

        // $form->ru = json_decode($form->ru);
        // $form->en = json_decode($form->en);
    }
}
