<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
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
    }

    const 
        STATUS_MODERATION = 'moderation',
        STATUS_APPROVED = 'approved',
        STATUS_ARCHIVED = 'archived',
        STATUS_INACTIVE = 'inactive';

    public function toSearchableArray()
    {
        $am = json_decode($this->am, true);
        $ru = json_decode($this->ru, true);
        $en = json_decode($this->en, true);

        return [
            // $[0].fields[2].value
            'field_0_2_value_am' => $am[0]['fields'][2]['value'] ?? '',
            'field_0_2_value_ru' => $ru[0]['fields'][2]['value'] ?? '',
            'field_0_2_value_en' => $en[0]['fields'][2]['value'] ?? '',

            // $[1].fields[0].communityStreet.value
            'field_1_0_street_am' => $am[1]['fields'][0]['communityStreet']['value'] ?? '',
            'field_1_0_street_ru' => $ru[1]['fields'][0]['communityStreet']['value'] ?? '',
            'field_1_0_street_en' => $en[1]['fields'][0]['communityStreet']['value'] ?? '',

            // $[9].fields[1].value
            'field_9_1_value_am' => $am[9]['fields'][1]['value'] ?? '',

            // $[9].fields[2].option[x].value
            'field_9_2_option_0_value_am' => $am[9]['fields'][2]['option'][0]['value'] ?? '',
            'field_9_2_option_1_value_am' => $am[9]['fields'][2]['option'][1]['value'] ?? '',
            'field_9_2_option_2_value_am' => $am[9]['fields'][2]['option'][2]['value'] ?? '',
            'field_9_2_option_3_value_am' => $am[9]['fields'][2]['option'][3]['value'] ?? '',

            // $[9].fields[0].value
            'field_9_0_value_am' => $am[9]['fields'][0]['value'] ?? '',

            // $[11].fields[0].value
            'field_11_0_value_am' => $am[11]['fields'][0]['value'] ?? '',
            'field_11_0_value_ru' => $ru[11]['fields'][0]['value'] ?? '',
            'field_11_0_value_en' => $en[11]['fields'][0]['value'] ?? '',

            // $[11].fields[1].value
            'field_11_1_value_am' => $am[11]['fields'][1]['value'] ?? '',
            'field_11_1_value_ru' => $ru[11]['fields'][1]['value'] ?? '',
            'field_11_1_value_en' => $en[11]['fields'][1]['value'] ?? '',

            'id' => $this->id,
            'home_id' => $this->home_id,
        ];
    }

}
