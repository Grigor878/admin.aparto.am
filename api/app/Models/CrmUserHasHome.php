<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrmUserHasHome extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'home_id',
        'display_at',
    ];
}
