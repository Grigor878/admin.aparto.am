<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Laravel\Scout\Searchable;

class Home extends Model
{
    use Searchable;

    protected $collection = 'homes';
    protected $fillable = [
        'role_id',
        'home_id',
        'photo',
        'file',
        'status',
        'am',
        'ru',
        'en',
        'searchable',
        'price_history',
        'update_top_at',
        'inactive_at'
    ];

    protected static function boot()
{
    parent::boot();

    static::created(function ($model) {
        $model->home_id = $model->id + 10000;
        $model->update_top_at = $model->created_at;
        $model->save();
    });

    static::saving(function ($model) {
        $am = json_decode($model->am, true);
        $ru = json_decode($model->ru, true);
        $en = json_decode($model->en, true);

        $model->searchable = Arr::get($am, '0.fields.2.value', '') . ' ' .
            Arr::get($ru, '0.fields.2.value', '') . ' ' .
            Arr::get($en, '0.fields.2.value', '') . ' ' .
            Arr::get($am, '1.fields.0.communityStreet.value', '') . ' ' .
            Arr::get($ru, '1.fields.0.communityStreet.value', '') . ' ' .
            Arr::get($en, '1.fields.0.communityStreet.value', '') . ' ' .
            Arr::get($am, '9.fields.1.value', '') . ' ' .
            Arr::get($am, '9.fields.2.option.0.value', '') . ' ' .
            Arr::get($am, '9.fields.2.option.1.value', '') . ' ' .
            Arr::get($am, '9.fields.2.option.2.value', '') . ' ' .
            Arr::get($am, '9.fields.2.option.3.value', '') . ' ' .
            Arr::get($am, '9.fields.0.value', '') . ' ' .
            Arr::get($am, '11.fields.0.value', '') . ' ' .
            Arr::get($ru, '11.fields.0.value', '') . ' ' .
            Arr::get($en, '11.fields.0.value', '') . ' ' .
            Arr::get($am, '11.fields.1.value', '') . ' ' .
            Arr::get($ru, '11.fields.1.value', '') . ' ' .
            Arr::get($en, '11.fields.1.value', '') . ' ' .
            $model->id . ' ' . $model->home_id;
    });
}

    const
        STATUS_MODERATION = 'moderation',
        STATUS_APPROVED = 'approved',
        STATUS_ARCHIVED = 'archived',
        STATUS_INACTIVE = 'inactive';

}
