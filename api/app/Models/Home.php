<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Home extends Model
{
    use HasFactory;

    protected $collection = 'homes';
    protected $fillable = [
        'role_id',
        'photo',
        'file',
        'status',
        'am',
        'ru',
        'en',
        'price_history',

    ];

    const 
        STATUS_MODERATION = 'moderation',
        STATUS_APPROVED = 'approved',
        STATUS_ARCHIVED = 'archived',
        STATUS_INACTIVE = 'inactive';

}
