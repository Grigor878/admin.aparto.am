<?php
namespace App\Services;
use App\Models\GlobalForm;
use App\Models\ConfigAddress;


class HomeService
{

      public function getAllSelect()
      {
        $allSelect = [
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
          'house' => [
          'am' => 'Բնակարան',
          'en' => 'House',
          'ru' => 'Квартира',
          ],
          'privateHouse' => [
          'am' => 'Առանձնատուն',
          'en' => 'Private House',
          'ru' => 'Дом',
          ],
          'commercialHouse' => [
          'am' => 'Կոմերցիոն (առանձնատուն)',
          'en' => 'Commercial territory',
          'ru' => 'Коммерческая площадь',
          ],
          'commercialApartment' => [
          'am' => 'Կոմերցիոն (բնակարան)',
          'en' => 'Commercial Appartment',
          'ru' => 'Коммерческая площадь',
          ],
          'simple' => [
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
          'stone' => [
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
          'parquetFloor' => [
            'am' => 'Մանրահատակ',
            'en' => 'Parquet',
            'ru' => 'Паркет',
          ],
          'laminate' => [
            'am' => 'Լամինատ',
            'en' => 'Laminate flooring',
            'ru' => 'Ламинат',
          ],
          'tile' => [
            'am' => 'Սալիկ',
            'en' => 'Tile',
            'ru' => 'Плитка',
          ],
          'concrete' => [
            'am' => 'Բետոն',
            'en' => 'Concrete',
            'ru' => 'Бетон',
          ],
          'baghdad' => [
            'am' => 'Բաղդադ',
            'en' => 'Baghdad',
            'ru' => 'Багдад',
          ],
          'concrete' => [
            'am' => 'Բետոն',
            'en' => 'Concrete',
            'ru' => 'Бетон',
          ],
          'panel' => [
            'am' => 'Պանել',
            'en' => 'Panel',
            'ru' => 'Панельный',
          ],
          'tensile' => [
            'am' => 'Ձգվող',
            'en' => 'Stretch',
            'ru' => 'Натяжной',
          ],
          'suspended' => [
            'am' => 'Կախովի',
            'en' => 'Suspended',
            'ru' => 'Подвесной',
          ],
        ];
        return $allSelect;
      }
   
      public function homeLanguageContsructor($data)
      {
        $allSelect = $this->getAllSelect();
        $keysAm = [];
        $keysRu = [];
        $keysEn = [];
        $generalForm = GlobalForm::findorFail(1);
        $copyGeneralFormAm = json_decode($generalForm->am);
        $copyGeneralFormRu = json_decode($generalForm->ru);
        $copyGeneralFormEn = json_decode($generalForm->en);

        foreach ($copyGeneralFormAm as $key => $item) {
          $keysAm[] = $item->name;
        }
        foreach ($copyGeneralFormRu as $key => $item) {
          $keysRu[] = $item->name;
        }
        foreach ($copyGeneralFormEn as $key => $item) {
          $keysEn[] = $item->name;
        }
        
        $assocCopyFormAm = array_combine($keysAm, $copyGeneralFormAm);
        $assocCopyFormRu = array_combine($keysRu, $copyGeneralFormRu);
        $assocCopyFormEn = array_combine($keysEn, $copyGeneralFormEn);

        foreach ($data as $idx => $item) {
          foreach ($item as $key => $value) {
            foreach ($assocCopyFormAm[$idx]->fields as $globKey => $globalVal) {
              if($globalVal->type == 'select') {
                if($key === $globalVal->key) {
                  $lang = $allSelect[$value];
                  $assocCopyFormAm[$idx]->fields[$globKey]->value = $lang['am'];
                  $assocCopyFormRu[$idx]->fields[$globKey]->value = $lang['ru'];
                  $assocCopyFormEn[$idx]->fields[$globKey]->value = $lang['en'];
                }
              }
              if($globalVal->type == "text"){
                if($key === $globalVal->key) {
                  foreach($value as $indText => $textItem) {
                    if($indText){
                      $langKey = strtolower(substr($indText, -2));
                      if($langKey == 'am'){
                        $assocCopyFormAm[$idx]->fields[$globKey]->value = $textItem;
                      }
                      if($langKey == 'ru'){
                        $assocCopyFormRu[$idx]->fields[$globKey]->value = $textItem;
                      }
                      if($langKey == 'en'){
                        $assocCopyFormEn[$idx]->fields[$globKey]->value = $textItem;
                      }
                    }
                  }
                }
              }
              if($globalVal->type == "inputNumber"){
                if($key === $globalVal->key) {
                  $assocCopyFormAm[$idx]->fields[$globKey]->value = $value;
                  $assocCopyFormRu[$idx]->fields[$globKey]->value = $value;
                  $assocCopyFormEn[$idx]->fields[$globKey]->value = $value;
                }
              }
              if($globalVal->type == "selectStreet"){
                if($key === $globalVal->key) {
                  if($value) {
                    $addresses = ConfigAddress::findorFail($value);
                    $assocCopyFormAm[$idx]->fields[$globKey]->value = $addresses->am;
                    $assocCopyFormRu[$idx]->fields[$globKey]->value = $addresses->ru;
                    $assocCopyFormEn[$idx]->fields[$globKey]->value = $addresses->en;
                  }
                }
              }
              if($globalVal->type == "inputText"){
                if($key === $globalVal->key) {
                  $assocCopyFormAm[$idx]->fields[$globKey]->value = $value;
                  $assocCopyFormRu[$idx]->fields[$globKey]->value = $value;
                  $assocCopyFormEn[$idx]->fields[$globKey]->value = $value;
                }
              }
              if($globalVal->type == "inputNumberSymbol"){
                if($key === $globalVal->key) {
                  if($assocCopyFormAm[$idx]->name == 'price'){
                    if (!(isset($item["priceNegotiable"]) && $item["priceNegotiable"] != "on")) {
                      $assocCopyFormAm[$idx]->fields[$globKey]->value = $value;
                      $assocCopyFormRu[$idx]->fields[$globKey]->value = $value;
                      $assocCopyFormEn[$idx]->fields[$globKey]->value = $value;
                    }
                  }else {
                    $assocCopyFormAm[$idx]->fields[$globKey]->value = $value;
                    $assocCopyFormRu[$idx]->fields[$globKey]->value = $value;
                    $assocCopyFormEn[$idx]->fields[$globKey]->value = $value;
                  }
                }
              }
              if($globalVal->type == 'multiselect') {
                if($key === $globalVal->key) {
                  $itemsAm = [];
                  $itemsRu = [];
                  $itemsEn = [];
                  foreach ($value as $multiKey => $multiItem) {
                    $lang = $allSelect[$multiItem];
                    $itemsAm[] = $lang['am'];
                    $itemsRu[] = $lang['ru'];
                    $itemsEn[] = $lang['en'];
                  }
                  $assocCopyFormAm[$idx]->fields[$globKey]->value = implode(", ", $itemsAm);
                  $assocCopyFormRu[$idx]->fields[$globKey]->value = implode(", ", $itemsRu);
                  $assocCopyFormEn[$idx]->fields[$globKey]->value = implode(", ", $itemsEn);
                }
              }
              if($globalVal->type == "checkbox"){
                if($key === $globalVal->key) {
                  $assocCopyFormAm[$idx]->fields[$globKey]->value = $value;
                  $assocCopyFormRu[$idx]->fields[$globKey]->value = $value;
                  $assocCopyFormEn[$idx]->fields[$globKey]->value = $value;
                }
              }
              if($globalVal->type == "numSelect"){
                if($key === $globalVal->key) {
                  $assocCopyFormAm[$idx]->fields[$globKey]->value = $value;
                  $assocCopyFormRu[$idx]->fields[$globKey]->value = $value;
                  $assocCopyFormEn[$idx]->fields[$globKey]->value = $value;
                }
              }
                }
            }
        }

        $normalArrayAm = array_values($assocCopyFormAm);
        $normalArrayRu = array_values($assocCopyFormRu);
        $assocCopyFormEn = array_values($assocCopyFormEn);

        return ['am'=>$normalArrayAm, 'ru'=> $normalArrayRu, 'en'=>$assocCopyFormEn];
    }

}