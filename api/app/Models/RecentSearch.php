<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecentSearch extends Model
{
    use HasFactory;

    protected $collection = 'recent_searches';
    protected $fillable = [
        'searchText',
        'resultCount',
        'date'
    ];

    protected $casts = [
        'date' => 'date:d-m-Y',
    ];
}