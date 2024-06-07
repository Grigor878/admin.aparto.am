<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CrmUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'phone' => 'required|string',
            'source' => 'required|string',
            'deal' => 'required',
            'propertyType' => 'required',
            'budget' => 'required|string',
            'room' => 'required|string',
            'specialist' => 'required',
            'status' => 'required',
        ];
    }
}
