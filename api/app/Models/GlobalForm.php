<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GlobalForm extends Model
{
    use HasFactory;

    protected $collection = 'global_forms';
    protected $fillable = [
        'am',
        'ru',
        'gb'
    ];
}
