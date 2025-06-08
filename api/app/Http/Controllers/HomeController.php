<?php

namespace App\Http\Controllers;

use App\Http\Resources\AdminHomeResource;
use App\Models\Employe;
use Illuminate\Http\Request;
use App\Models\Home;
use App\Services\HomeService;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;
use DB;


class HomeController extends Controller
{
    protected $homeService;

    public function __construct(HomeService $homeService)
    {
        $this->homeService = $homeService;
    }

    public function addHome(Request $request)
    {
        $data = $request->all();
        $employee = auth()->user();
        if ($employee) {
            $home = new Home();
            $home->employee_id = $employee->id;
            $home->status = $employee->role == "admin" || $employee->role == "moderator" ? Home::STATUS_APPROVED : Home::STATUS_MODERATION;
            $home->photo = json_encode([]);
            $home->file = json_encode([]);
            $home->keywords = json_encode([]);
            $homeLanguageContsructor = $this->homeService->homeLanguageContsructor($data);
            if ($homeLanguageContsructor['priceHistory']) {
                if ($home->price_history) {
                    $prices = json_decode($home->price_history);
                    array_push($prices, [
                        "price" => $homeLanguageContsructor['priceHistory'],
                        "date" => Carbon::now()->addHours(4)->format('d/m/Y'),
                    ]);
                    $home->price_history = json_encode($prices);
                } else {
                    $priceDate = [];
                    array_push($priceDate, [
                        "price" => $homeLanguageContsructor['priceHistory'],
                        "date" => Carbon::now()->addHours(4)->format('d/m/Y'),
                    ]);

                    $home->price_history = json_encode($priceDate);
                }
            }
            $home->am = json_encode($homeLanguageContsructor['am']);
            $home->ru = json_encode($homeLanguageContsructor['ru']);
            $home->en = json_encode($homeLanguageContsructor['en']);
            $dateNow = Carbon::now()->addHours(4)->format('Y-m-d H:i:s');
            $home->update_top_at = $dateNow;
            $home->save();
            info('addHome', ['user_id' => auth()->id(), 'data' => json_encode($data)]);
            return response()->json($home->id);
        }
    }

    public function editHome($id, Request $request)
    {
        $data = $request->all();
        info('editHome', ['user_id' => auth()->id(), 'home_id' => $id, 'data' => json_encode($data)]);
        $home = Home::findorFail($id);
        $homeLanguageContsructor = $this->homeService->homeLanguageContsructorEdit($id, $data);
        if ($homeLanguageContsructor['editStatus']) {
            $home->status = auth()->user()->role == "admin" || auth()->user()->role == "moderator" ? Home::STATUS_APPROVED : Home::STATUS_MODERATION;
        }

        if (auth()->user()->role == "admin" || auth()->user()->role == "moderator") {
            $home->status = Home::STATUS_APPROVED;
        }

        if ($homeLanguageContsructor['priceHistory']) {
            if ($home->price_history) {
                $prices = json_decode($home->price_history, true);
                array_push($prices, [
                    "price" => $homeLanguageContsructor['priceHistory'],
                    "date" => Carbon::now()->addHours(4)->format('d/m/Y'),
                ]);
                $home->price_history = json_encode($prices);
            } else {

                $priceDate = [];
                array_push($priceDate, [
                    "price" => $homeLanguageContsructor['priceHistory'],
                    "date" => Carbon::now()->addHours(4)->format('d/m/Y'),
                ]);

                $home->price_history = json_encode($priceDate);
            }
        }
        $home->am = json_encode($homeLanguageContsructor['am']);
        $home->ru = json_encode($homeLanguageContsructor['ru']);
        $home->en = json_encode($homeLanguageContsructor['en']);
        $dateNow = Carbon::now()->addHours(4)->format('Y-m-d H:i:s');
        $home->update_top_at = $dateNow;
        $home->save();
        return response()->json($home->id);
    }

    public function removeUselessImages()
    {
        dd('half done');
        $photoPath = public_path('images');
        if (File::isDirectory($photoPath)) {
            $files = File::files($photoPath);
            $allPhotoNames = array_map(function ($file) {
                return $file->getFilename();
            }, $files);
        }
    }

    public function editKeyword($id, Request $request)
    {
        $data = $request->all();
        info('editKeyword', ['user_id' => auth()->id(), 'home_id' => $id, 'data' => json_encode($data)]);
        $home = Home::findorFail($id);
        $home->keywords = json_encode($data);
        $home->save();
    }
    public function editYandexLocation($id, Request $request)
    {
        $data = $request->all();
        info('editYandexLocation', ['user_id' => auth()->id(), 'data' => json_encode($data)]);
        $this->homeService->addEditYandexLocation($id, $data);
        return true;
    }

    public function activateHomeStatus($id)
    {
        info('activateHomeStatus', ['user_id' => auth()->id(), 'data' => json_encode($id)]);
        $home = Home::findOrFail($id);
        $home->update([
            'status' => Home::STATUS_APPROVED,
            'update_top_at' => Carbon::now()->addHours(4)->format('Y-m-d H:i:s')
        ]);
        return response()->json([
            'success' => "Գույքը Ակտիվացված է:"
        ], 200);
    }

    public function archiveHomeStatus($id)
    {
        info('archiveHomeStatus', ['user_id' => auth()->id(), 'data' => json_encode($id)]);
        $home = Home::find($id);
        if ($home) {
            $home->update(['status' => Home::STATUS_ARCHIVED]);
            return response()->json([
                'success' => "Գույքը Ապաակտիվացված է:"
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'errors' => "Գույքը չի գտնվել"
        ], 404);
    }

    public function addReservPhoto($id, Request $request)
    {
        $data = $request->all();
        info('addReservPhoto', ['user_id' => auth()->id(), 'home_id' => $id, 'data' => json_encode($data)]);
        $home = Home::find($id);
        if ($home) {
            $photoName = json_decode($home->photo);
            foreach ($data as $key => $photo) {
                preg_match_all('/\d+/', $key, $matches);
                $fileName = round(microtime(true) * 1000) . '.' . $photo->extension();
                $photo->move(public_path('images'), $fileName);

                if (is_numeric(strpos($key, 'visible'))) {
                    $info = [
                        'name' => $fileName,
                        'visible' => 'true'
                    ];
                } else {
                    $info = [
                        'name' => $fileName,
                        'visible' => 'false'
                    ];
                }
                $photoName[] = $info;
            }
            $home->photo = json_encode($photoName);
            $home->save();
        }
        return true;
    }

    public function addEditReservPhoto($id, Request $request)
    {
        $data = $request->all();
        info('addEditReservPhoto', ['user_id' => auth()->id(), 'home_id' => $id, 'data' => json_encode($data)]);
        if (!$data) {
            $home = Home::find($id);
            if ($home) {
                $home->update(['photo' => json_encode([])]);
            }
        } else {
            $home = Home::find($id);
            if ($home) {
                $photoName = json_decode($home->photo);
                for ($i = 0; $i < count($data); $i++) {
                    $photoName[] = "";
                }
                $condition = true;
                foreach ($data as $key => $photo) {
                    preg_match_all('/\d+/', $key, $matches);
                    $indexArray = (int) $matches[0][0];
                    if (gettype($photo) == 'string') {
                        if (is_numeric(strpos($key, 'visible'))) {
                            $info = [
                                'name' => $photo,
                                'visible' => 'true'
                            ];
                        } else {
                            $info = [
                                'name' => $photo,
                                'visible' => 'false'
                            ];
                        }
                        $photoName[$indexArray] = $info;
                    }
                    if (gettype($photo) == 'object') {
                        if ($condition) {
                            $home->status = auth()->user()->role == "admin" || auth()->user()->role == "moderator" ? Home::STATUS_APPROVED : Home::STATUS_MODERATION;
                            $condition = false;
                        }
                        $fileName = round(microtime(true) * 1000) . '.' . $photo->extension();
                        $photo->move(public_path('images'), $fileName);

                        if (is_numeric(strpos($key, 'visible'))) {
                            $info = [
                                'name' => $fileName,
                                'visible' => 'true'
                            ];
                        } else {
                            $info = [
                                'name' => $fileName,
                                'visible' => 'false'
                            ];
                        }
                        $photoName[$indexArray] = $info;
                    }

                }
                $home->photo = json_encode($photoName);
                $home->save();
            }
        }
        return true;
    }



    public function editMultyPhoto($id, Request $request)
    {
        $data = $request->all();
        info('editMultyPhoto', ['user_id' => auth()->id(), 'home_id' => $id, 'data' => json_encode($data)]);
        if (!$data) {
            $home = Home::find($id);
            if ($home) {
                $home->update(['photo' => json_encode([])]);
            }
        } else {
            $home = Home::find($id);
            if ($home) {
                $photoName = array_fill(0, count($data), '');
                // logger('beforeEditPhoto', ['photoName' => json_encode($photoName), 'home_id' => $id, 'auth_user'=>auth()->user()->id]);
                $condition = true;
                foreach ($data as $key => $photo) {
                    preg_match_all('/\d+/', $key, $matches);
                    $indexArray = (int) $matches[0][0];
                    if (gettype($photo) == 'string') {
                        if (is_numeric(strpos($key, 'visible'))) {
                            $info = [
                                'name' => $photo,
                                'visible' => 'true'
                            ];
                        } else {
                            $info = [
                                'name' => $photo,
                                'visible' => 'false'
                            ];
                        }
                        $photoName[$indexArray] = $info;
                    }
                    if (gettype($photo) == 'object') {
                        if ($condition) {
                            $home->status = auth()->user()->role == "admin" || auth()->user()->role == "moderator" ? Home::STATUS_APPROVED : Home::STATUS_MODERATION;
                            $condition = false;
                        }
                        $fileName = round(microtime(true) * 1000) . '.' . $photo->extension();
                        $photo->move(public_path('images'), $fileName);

                        if (is_numeric(strpos($key, 'visible'))) {
                            $info = [
                                'name' => $fileName,
                                'visible' => 'true'
                            ];
                        } else {
                            $info = [
                                'name' => $fileName,
                                'visible' => 'false'
                            ];
                        }
                        $photoName[$indexArray] = $info;
                    }

                }
                // logger('EditPhoto', ['photoName' => json_encode($photoName), 'home_id' => $id, 'auth_user'=>auth()->user()->id]);
                $home->photo = json_encode($photoName);
                $home->save();
            }
        }
        return true;
    }

    public function editDocumentUpload($id, Request $request)
    {
        $data = $request->all();
        info('editDocumentUpload', ['user_id' => auth()->id(), 'home_id' => $id, 'data' => json_encode($data)]);
        if (!$data) {
            $home = Home::find($id);
            if ($home) {
                $home->update(['file' => json_encode([])]);
            }
        } else {
            $home = Home::find($id);
            $fileNameArray = [];

            foreach ($data as $key => $file) {
                if (gettype($file) == 'string') {
                    $fileNameArray[] = $file;
                }
                if (gettype($file) == 'object') {
                    $fileName = round(microtime(true) * 1000) . '.' . $file->extension();
                    $file->move(public_path('files'), $fileName);
                    $fileNameArray[] = $fileName;
                }
                $home->file = json_encode($fileNameArray);
                $home->save();
            }

        }
        return true;
    }

    public function getHome(Request $request)
    {
        $data = $request->all();

        $allHome = $this->homeService->getAllHomes($data);

        return AdminHomeResource::collection($allHome);
    }

    public function multyPhoto($id, Request $request)
    {
        $data = $request->all();
        info('getHome', ['user_id' => auth()->id(), 'home_id' => $id, 'data' => json_encode($data)]);
        $home = Home::findorFail($id);
        $photoName = [];
        foreach ($data as $key => $photo) {
            $fileName = round(microtime(true) * 1000) . '.' . $photo->extension();
            $photo->move(public_path('images'), $fileName);

            if (is_numeric(strpos($key, 'visible'))) {
                $info = [
                    'name' => $fileName,
                    'visible' => 'true'
                ];
            } else {
                $info = [
                    'name' => $fileName,
                    'visible' => 'false'
                ];
            }
            $photoName[] = $info;
        }
        $home->photo = json_encode($photoName);
        $home->save();

        return true;
    }

    public function documentUpload($id, Request $request)
    {
        $data = $request->all();
        info('documentUpload', ['user_id' => auth()->id(), 'home_id' => $id, 'data' => json_encode($data)]);
        $home = Home::findorFail($id);
        $fileNameArray = [];
        foreach ($data as $key => $file) {
            $fileName = round(microtime(true) * 1000) . '.' . $file->extension();
            $file->move(public_path('files'), $fileName);
            $fileNameArray[] = $fileName;
        }
        $home->file = json_encode($fileNameArray);
        $home->save();

        return true;
    }


    public function addKeyword($id, Request $request)
    {
        $data = $request->all();
        info('addKeyword', ['user_id' => auth()->id(), 'home_id' => $id, 'data' => json_encode($data)]);
        $home = Home::findorFail($id);
        $home->keywords = json_encode($data);
        $home->save();

        return true;
    }

    public function addYandexLocation($id, Request $request)
    {
        $data = $request->all();
        info('addYandexLocation', ['user_id' => auth()->id(), 'home_id' => $id, 'data' => json_encode($data)]);
        $this->homeService->addEditYandexLocation($id, $data);

        return true;
    }

    public function getProperties($id)
    {
        $home = Home::select(
            'id',
            'home_id',
            'am',
            'photo',
            'file',
            'keywords',
            'status',
            DB::raw("
            CONCAT(
                JSON_UNQUOTE(JSON_EXTRACT(en, '$[12].fields[0].value')),
                '/',
                id
            ) AS urlSlug
            "),
            'price_history',
            'created_at',
            'updated_at'
        )
            ->find($id);

        if ($home) {
            $am = json_decode($home->am);
            $agentId = (int) $am[11]->fields[0]->id;
            $managerId = (int) $am[11]->fields[1]->id;
            if (isAgent()) {
                $authHomeids = HomeService::getAuthHomesId();
                if (!in_array($id, $authHomeids)) {
                    unset($am[9]);
                }
            }

            $employee = Employe::get();
            Employe::getAgentMangerData($agentId, $managerId, $employee, $am, null, null);
            $home->selectedTransactionType = isset($am[0]->fields[0]->selectedOptionName) ? $am[0]->fields[0]->selectedOptionName : '';
            $home->photo = json_decode($home->photo);
            $home->file = json_decode($home->file);
            $home->createdAt = Carbon::parse($home->created_at)->format('d/m/Y');
            $home->updatedAt = Carbon::parse($home->updated_at)->format('d/m/Y');
            $home->keywords = json_decode($home->keywords);
            $home->priceHistory = json_decode($home->price_history);
            $home->am = $am;
            info('getProperties', ['user_id' => auth()->id(), 'home_id' => $id, 'data' => json_encode($home)]);
            return response()->json($home);

        }
        return response()->json([
            'status' => 'error',
            'errors' => "Home not found"
        ], 422);
    }

    public function updateHomeDate($id)
    {
        $home = Home::find($id);
        info('updateHomeDate', ['user_id' => auth()->id(), 'home_id' => $id, 'data' => json_encode($home)]);
        if ($home) {
            $dateNow = Carbon::now()->addHours(4)->format('Y-m-d H:i:s');
            $home->update(['update_top_at' => $dateNow]);
            return response()->json([
                'success' => "Գույքը թարմացված է"
            ], 200);
        }
        return response()->json([
            'status' => 'error',
            'errors' => "Գույքը չի գտնվել"
        ], 404);
    }

    public function addInactiveHome($id, Request $request)
    {
        $data = $request->all();
        info('addInactiveHome', ['user_id' => auth()->id(), 'home_id' => $id, 'data' => json_encode($data)]);
        $home = Home::find($id);
        if ($home) {
            $home->update(['status' => Home::STATUS_INACTIVE, 'inactive_at' => Carbon::parse($data['date'])->format('Y-m-d')]);
            return response()->json([
                'success' => "Գույքը թարմացված է"
            ], 200);
        }
        return response()->json([
            'status' => 'error',
            'errors' => "Գույքը չի գտնվել"
        ], 404);
    }

    public function getEditHome($id)
    {
        if (isAgent()) {
            $this->haveEditPerrmission($id);
        }

        $home = $this->homeService->getEditHome($id);
        info('getEditHome', ['user_id' => auth()->id(), 'home_id' => $id]);

        return response()->json($home);
    }

    public function haveEditPerrmission($id)
    {
        $authHomeids = HomeService::getAuthHomesId();

        if (!in_array($id, $authHomeids)) {
            abort(403);
            return response()->json(['status' => 'error'], 403);
        }
        return true;
    }


}
