<?php

namespace App\Http\Resources;

use App\Models\Employe;
use App\Models\Home;
use App\Services\CrmService;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class CrmUserStructureResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $crmService = app(CrmService::class);
        $authRights = $this->checkCrmWithAgent($this->id, $crmService);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $authRights? $this->phone : "*************",
            'propertyType' => json_decode($this->property_type),
            'deal' => json_decode($this->deal),
            'room' => $this->room,
            'budget' => $this->budget,
            'email' =>  $authRights? $this->email : "*************",
            'source' => $this->source,
            'contractNumber' => $this->contract_number,
            'comment' => $this->comment,
            'specialist' => $this->employee_id, 
            'status' => $this->status,
            'displayedHomes' => $this->getCrmHomes($this->homes),
            'files' => $this->files->pluck('path')->toArray(),
            'permission' => $authRights? true : false,
        ];
    }

    public function checkCrmWithAgent($crmId, $crmService)
    {
        return $crmService->recoverEmployeeRights($crmId);
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
}
