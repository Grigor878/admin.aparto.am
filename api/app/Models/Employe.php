<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Employe extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $collection = 'employes';
    protected $fillable = [
        'full_name',
        'email',
        'role',
        'phone',
        'password',
    ];

    protected $hidden = ['password']; 

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public static function getAgentMangerData($agentId, $managerId, $employee, $am, $ru, $en): array
    {
        $ids = [];

        if (count($employee) > 0) {
            foreach ($employee as $man) {
                if ($man["id"] == $agentId) {
                    $ids['agent'] = $man;
                }
                if ($man["id"] == $managerId) {
                    $ids['manager'] = $man;
                }
            }
        }
    
        $agentData = [
            'agentName' => '',
            'agentPhoto' => ''
        ];
    
        $managerData = [
            'managerName' => '',
            'managerPhoto' => ''
        ];
    
        if (isset($ids['agent'])) {
            $agent = $ids['agent'];
            $agentName = json_decode($agent->full_name, true);
            $agentData = [
                'agentName' => $agentName,
                'agentPhoto' => $agent->photo
            ];
        }
    
        if (isset($ids['manager'])) {
            $manager = $ids['manager'];
            $managerName = json_decode($manager->full_name, true);
            $managerData = [
                'managerName' => $managerName,
                'managerPhoto' => $manager->photo
            ];
        }

        if($am){
            $am[11]->fields[0]->value = $agentData['agentName']?$agentData['agentName']['am']:'';
            $am[11]->fields[0]->photo = $agentData['agentPhoto'];
            $am[11]->fields[1]->value = $managerData['managerName']?$managerData['managerName']['am']:'';
            $am[11]->fields[1]->photo = $managerData['managerPhoto'];
        }

        if($en){
            $en[11]->fields[1]->value = $managerData['managerName']?$managerData['managerName']['en']:'';
            $en[11]->fields[1]->photo = $managerData['managerPhoto'];
            $en[11]->fields[0]->value = $agentData['agentName']?$agentData['agentName']['en']:'';
            $en[11]->fields[0]->photo = $agentData['agentPhoto'];
        }
        
        if($ru){
            $ru[11]->fields[0]->value = $agentData['agentName']?$agentData['agentName']['ru']:'';
            $ru[11]->fields[0]->photo = $agentData['agentPhoto'];
            $ru[11]->fields[1]->value = $managerData['managerName']?$managerData['managerName']['ru']:'';
            $ru[11]->fields[1]->photo = $managerData['managerPhoto'];
        }
        

        return ['am' => $am, 'ru' => $ru, 'en' => $en];
    }

    const 
        STATUS_DEACTIVATE = 'deactivated',
        STATUS_AGENT = 'agent',
        STATUS_MODERATOR = 'moderator',
        STATUS_ADMIN = 'admin';

}
