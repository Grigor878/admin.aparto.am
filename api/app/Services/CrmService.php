<?php
namespace App\Services;

use App\Http\Resources\CrmHomesResource;
use App\Http\Resources\CrmUserResource;
use App\Http\Resources\CrmUserStructureResource;
use App\Models\CrmUser;
use App\Models\CrmUserHasFile;
use App\Models\CrmUserHasHome;
use App\Models\Employe;
use App\Models\Home;
use Carbon\Carbon;


class CrmService
{
    public $keyToValue = [
        "new-client"=> "Նոր հաճախորդ",
        "contract-show"=> "Պայմանագիր-ցուցադրություն",
        "pay"=> "Նախավճար",
        "apartment"=> "Բնակարան",
        "open"=> "Գործարքի բացում",
        "fail"=> "Ձախողում",
        "sucess"=> "Հաջողված գործարք",
        'privateHouse' => "Առանձնատուն",
        'commercial' => "Կոմերցիոն",
        'sale' => "Վաճառք",
        'rent' => "Վարձակալություն",
        'private_house' => "Առանձնատուն",
    ];


    public function getHomesForCrm()
    {
        $allHome = Home::orderBy('id', 'desc')
                    ->get();

        return CrmHomesResource::collection($allHome);

    }

    public function addCrmUser($request)
    {
        $user = new CrmUser();
        $user->name = $request['name'];
        $user->phone = $request['phone'];
        $user->email = $request['email']??"";
        $user->employee_id = $request['specialist'];
        $user->contract_number = $request['contractNumber']??"";
        $user->source = $request['source'];
        $user->deal = $request['deal'];
        $user->property_type = $request['propertyType'];
        $user->room = $request['room'];
        $user->budget = $request['budget'];
        $user->comment = $request['comment']??"";
        $user->status = $request['status'];
        $user->save();

        $displayedHomes = json_decode($request['displayedHomes'], true);

        $homeToInsert = [];
        foreach ($displayedHomes as $key => $home) {
            $date = Carbon::createFromFormat('d/m/Y', $home['date']);

            $homeToInsert[] = [
                'user_id' => $user->id,
                'home_id' => $home['id'],
                'display_at' => $date->format('Y-m-d'),
            ];
        }


        if($homeToInsert) { 
            CrmUserHasHome::insert($homeToInsert);
        }

        $filesToInsert = [];
        foreach ($request as $key => $item) {
            if(gettype($item) == 'object'){
                $fileName = round(microtime(true) * 1000).'.'.$item->extension();
                $realName = $item->getClientOriginalName();
                $path = 'crmfiles/' . $fileName;
                $filesToInsert[] = [
                    'user_id' => $user->id,
                    'name' => $fileName,
                    'real_name' => $realName,
                    'path' => $path,
                ];
                $item->move(public_path('crmfiles'), $fileName);

            }
        }

        if($filesToInsert) { 
            CrmUserHasFile::insert($filesToInsert);
        }

        return $user;
    }

    public function editCrmUser($request, $idCrm)
    {
        if($this->recoverEmployeeRights($idCrm)){
            $user = CrmUser::find($idCrm);

            if($user) {
                $user->name = $request['name'];
                $user->phone = $request['phone'];
                $user->email = $request['email']??"";
                $user->employee_id = $request['specialist'];
                $user->contract_number = $request['contractNumber']??"";
                $user->source = $request['source'];
                $user->deal = $request['deal'];
                $user->property_type = $request['propertyType'];
                $user->room = $request['room'];
                $user->budget = $request['budget'];
                $user->comment = $request['comment']??"";
                $user->status = $request['status'];
                $user->save();
            }

            CrmUserHasHome::where('user_id', $idCrm)->delete();

            $displayedHomes = json_decode($request['displayedHomes'], true);

            $homeToInsert = [];
            foreach ($displayedHomes as $key => $home) {
            $date = Carbon::createFromFormat('d/m/Y', $home['date']);

                $homeToInsert[] = [
                    'user_id' => $idCrm,
                    'home_id' => $home['id'],
                    'display_at' => $date->format('Y-m-d'),
                ];
            }
    
            if($homeToInsert) { 
                CrmUserHasHome::insert($homeToInsert);
            }

            $filesToInsert = [];
            $existingFile = CrmUserHasFile::where('user_id', $idCrm)->get()->pluck('path');
            $getCrmExistFile = [];

            foreach ($request as $key => $item) {
                if(str_contains($key, 'file') && gettype($item) == 'string') {
                   $getCrmExistFile[] = $item;
                }
                if(gettype($item) == 'object'){
                    $fileName = round(microtime(true) * 1000).'.'.$item->extension();
                    $realName = $item->getClientOriginalName();
                    $path = 'crmfiles/' . $fileName;
                    $filesToInsert[] = [
                        'user_id' => $user->id,
                        'name' => $fileName,
                        'real_name' => $realName,
                        'path' => $path,
                    ];
                    $item->move(public_path('crmfiles'), $fileName);
                }
            }
            $diff = $existingFile->diff($getCrmExistFile);
            CrmUserHasFile::whereIn('path', $diff->all())->delete();
            
            if($filesToInsert) { 
                CrmUserHasFile::insert($filesToInsert);
            }

            return true;

        }

        return response()->json(['message' => 'Ինչ որ բան սխալ է.'], 500);
    }

    public function getCrmUsers()
    {
        $users = CrmUser::with('homes')->get();
        // dd($users);
        $customResoucre = $this->makeCollectionResource($users);
        // return CrmUserResource::collection($users);

        return $customResoucre;
        
    }

    public function makeCollectionResource($users)
    {

        $employee = Employe::all();
        $homes = Home::all();

        $customResource = [];

        foreach ($users as $user) {
            $searchable = [];
            $checkUserAgent = $this->recoverEmployeeRights($user->id);
            $agent = $this->getAgentName($employee, $user->employee_id);
            if($user->homes){
                $homesHomeId = $homes->whereIn('id', $user->homes->pluck('home_id')->toArray())->pluck('home_id');
                foreach ($homesHomeId as $key => $homId) {
                    $searchable[] = (string) $homId;
                }
            }
            $transactionDecode = json_decode($user->property_type);
            $transactionType = [];
            foreach ($transactionDecode as $key => $value) {
                $transaction = $this->keyToValue[$value];
                $transactionType[] = $transaction;
                $searchable[] = $transaction;
            }

            $dealDecode = json_decode($user->deal);
            $deal = [];
            foreach ($dealDecode as $key => $value) { 
                $type = $this->keyToValue[$value];
                $deal[] = $type;
                $searchable[] = $type;
            }

            $status =  $this->keyToValue[$user->status];
            array_push($searchable, $user->name, $user->phone, $agent, $status, $user->room);

            $customResource[] = [
                'id' => $user->id,
                'name' => $user->name,
                'phone' => $checkUserAgent? $user->phone:"*************",
                'property_type' => $transactionType,
                'deal' => $deal,
                'room' => $user->room,
                'agent' => $agent, 
                'status' => $user->status,
                'searchable' => $searchable,
            ];
        }

        return $customResource;
    }


    public function getAgentName($employee, $agentId)
    {
        try {
            if($agentId){
                $name = $employee->where('id', $agentId)->first();
                if($name->full_name){
                    $agentName = json_decode($name->full_name, true);
        
                    return $agentName['am'];
                }
            }
        } catch (\Throwable $th) {
            dd($agentId,  $th->getMessage());
        }
        

    }

    public function getEditUser($id)
    {
        $user = CrmUser::with('homes', 'files')->find($id);

        $readyCustomResouce = $this->makeEditResouce($user);

        return $readyCustomResouce;
    }

    public function recoverEmployeeRights($crmId): bool
    {
        $auth = auth()->user();

        if($auth->role == Employe::STATUS_AGENT){
            $authId = $auth->id;
            $authCrmIds = CrmUser::where('employee_id', $authId)->get()->pluck('id')->toArray();

            return in_array($crmId, $authCrmIds);
        }

        return true;
    }

    public function makeEditResouce($user)
    {
        $authRights = $this->recoverEmployeeRights($user->id);

        return [
            'id' => $user->id,
            'name' => $user->name,
            'phone' => $authRights? $user->phone : "*************",
            'propertyType' => json_decode($user->property_type),
            'deal' => json_decode($user->deal),
            'room' => $user->room,
            'budget' => $user->budget,
            'email' =>  $authRights? $user->email : "*************",
            'source' => $user->source,
            'contractNumber' => $user->contract_number,
            'comment' => $user->comment,
            'specialist' => (int) $user->employee_id, 
            'status' => $user->status,
            'displayedHomes' => $this->getCrmHomes($user->homes),
            'files' => $user->files->pluck('path')->toArray(),
            'permission' => $authRights? true : false,
        ];
    }

    public function getCrmHomes($homes)
    {
        $readyHomes = [];
        $employee = Employe::all();
        $allHomes = Home::all();

        foreach ($homes as $key => $item) {
            $home = $allHomes->where('id', $item->home_id)->first();
            $am = json_decode($home['am']);
            $building = $am[1]->fields[1]->value ? $am[1]->fields[1]->value . " " : "";
            $street = $building . $am[1]->fields[0]->communityStreet->value;
            $tmpHome = [];
            $tmpHome['agent'] = $this->getAgentName($employee, $am[11]->fields[0]->id);
            $tmpHome['community'] = $am[1]->fields[0]->value;
            $tmpHome['home_id'] = $home->home_id;
            $tmpHome['id'] = $home->id;
            $tmpHome['owner'] = $am[9]->fields[0]->value;
            $tmpHome['ownerTel'] = $am[9]->fields[1]->value;
            $tmpHome['propertyName'] = $am[0]->fields[4]->value;
            $tmpHome['status'] = $home->status;
            $tmpHome['street'] = $street;
            $tmpHome['surface'] = $am[3]->fields[0]->value;
            $date = Carbon::createFromFormat('Y-m-d', $item->display_at);
            $tmpHome['date'] = $date->format('d/m/Y');

            $readyHomes[] = $tmpHome;
            $tmpHome = [];
        }
        return $readyHomes;
    }

 
}