<?php

namespace App\Http\Resources;

use App\Models\Employe;
use Illuminate\Http\Resources\Json\JsonResource;

class CrmHomesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $employee = Employe::all();
        $am = json_decode($this->am);

        $building = $am[1]->fields[1]->value ? $am[1]->fields[1]->value . " " : "";
        $street = $building . $am[1]->fields[0]->communityStreet->value;

        return [
            'id' => $this->id,
            'home_id' => $this->home_id,
            'street' => $street,
            'community' => $am[1]->fields[0]->value,
            'surface' => $am[3]->fields[0]->value,
            'status' => $this->status,
            'propertyName' => $am[0]->fields[1]->value,
            'agent' => $this->getAgentName($employee, $am[11]->fields[0]->id),
            'owner' => $am[9]->fields[0]->value,
            'ownerTel' => $am[9]->fields[1]->value,
        ];
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
