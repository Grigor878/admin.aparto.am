<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AdminHomeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $otherFaciliti = [];

        foreach ($this->am[6]->fields as $key => $other) {

           if($other->value === true){
                $otherFaciliti[] = $other->title;
                if(count($otherFaciliti) == 5 ){
                    break;
                }
           }
        }

        // if(!$otherFaciliti){
        //     foreach ($this->am[6] as $key => $other) {
        //         if($other->value === true){
        //              $otherFaciliti[] = $other->value;
        //              if(count($otherFaciliti) == 5 ){
        //                  break;
        //              }
        //         }
        //      }
        // }

        return [
            'id' => $this->id,
            'home_id' => $this->home_id,
            'status' => $this->status,
            'photo' => $this->photo?$this->photo[0]->name:'',
            'announcementType' => $this->am[0]->fields[4]->value,
            'title' => $this->am[0]->fields[2]->value,
            'community' => $this->am[1]->fields[0]->value,
            'street' => $this->am[1]->fields[0]->communityStreet->value,
            'building' => $this->am[1]->fields[1]->value,
            'entrance' =>  $this->am[1]->fields[2]->value,  
            'floor' => $this->am[3]->fields[8]->value,
            'apartment' => $this->am[1]->fields[3]->value,
            'price' => $this->am[2]->fields[0]->value,
            'room' => $this->am[3]->fields[2]->value,
            'bathrooms' => $this->am[3]->fields[4]->value,
            'surface' => $this->am[3]->fields[0]->value,
            'height' => $this->am[3]->fields[1]->value,
            'otherFacility' => $otherFaciliti,
            'agent' => $this->am[11]->fields[0]->value,
            'statement' => $this->am[4]->fields[1]->value,
            'selectedTransactionType' => $this->selectedTransactionType,
            'searchAllProperty' => $this->searchAllProperty,
            'owner' => $this->am[9]->fields[0]->value,
            'ownerTel' => $this->am[9]->fields[1]->value,
            'created_at' => $this->createdAt,
            'updated_at' => $this->updatedAt,
        ];
    }
}
