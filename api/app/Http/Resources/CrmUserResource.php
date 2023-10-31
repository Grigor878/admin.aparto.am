<?php

namespace App\Http\Resources;

use App\Models\Employe;
use Illuminate\Http\Resources\Json\JsonResource;
use Request;

class CrmUserResource extends JsonResource
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
        
        $customResource = [];
        $searchable = [];

        $agent = $this->getAgentName($employee, $this->employee_id);

        $transactionType = [];
        foreach (json_decode($this->property_type) as $key => $value) {
            $transaction = $this->keyToValue[$value];
            $transactionType[] = $transaction;
            $searchable[] = $transaction;
        }

        $deal = [];
        foreach (json_decode($this->deal) as $key => $value) { 
            $type = $this->keyToValue[$value];
            $deal[] = $type;
            $searchable[] = $type;
        }

        $status =  $this->keyToValue[$this->status];
        array_push($searchable, $this->name, $this->phone, $agent, $status);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'property_type' => $transactionType,
            'deal' => $deal,
            'room' => $this->room,
            'budget' => $this->budget,
            'agent' => $agent, 
            'status' => $status,
            'searchable' => $searchable,
        ];

       
            // $employee = Employe::all();
    
            // $customResource = [];
    
            // foreach ($users as $user) {
            //     $searchable = [];
    
            //     $agent = $this->getAgentName($employee, $user->employee_id);
    
            //     $transactionType = [];
            //     foreach (json_decode($user->property_type) as $key => $value) {
            //         $transaction = $this->keyToValue[$value];
            //         $transactionType[] = $transaction;
            //         $searchable[] = $transaction;
            //     }
    
            //     $deal = [];
            //     foreach (json_decode($user->deal) as $key => $value) { 
            //         $type = $this->keyToValue[$value];
            //         $deal[] = $type;
            //         $searchable[] = $type;
            //     }
    
            //     $status =  $this->keyToValue[$user->status];
            //     array_push($searchable, $user->name, $user->phone, $agent, $status);
    
            //     $customResource = [
            //         'id' => $user->id,
            //         'name' => $user->name,
            //         'phone' => $user->phone,
            //         'property_type' => $transactionType,
            //         'deal' => $deal,
            //         'room' => $user->room,
            //         'budget' => $user->budget,
            //         'agent' => $agent, 
            //         'status' => $status,
            //         'searchable' => $searchable,
            //     ];
            // }
        // }
    }

}
