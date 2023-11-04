<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrmUser extends Model
{
    use HasFactory;

    protected $fillable = [
        "employee_id",
        "name",
        "contract_number",
        "email",
        "source",
        "phone",
        "deal",
        "property_type",
        "room",
        "budget",
        "status",
        "comment",
    ];

    protected $table = "crm_users";

    public function homes()
    {
        return $this->hasMany(CrmUserHasHome::class, "user_id","id");
    }

    public function files()
    {
        return $this->hasMany(CrmUserHasFile::class, "user_id","id");
    }


        
}
