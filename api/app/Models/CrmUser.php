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


        
}
