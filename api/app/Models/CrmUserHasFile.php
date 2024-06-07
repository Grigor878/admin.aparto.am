<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrmUserHasFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'real_name',
        'path',
    ];


}
