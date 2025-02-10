<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class offrestorerequeste extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'intitule' => 'required|string',
            'salaire' => 'required|string',
            'type_contrat' => 'required|string',
            'niveau_etude' => 'required|string',
            'description' => 'required|string',
            'nombre_posts' => 'required|string',
            'ville' => 'required|string',
            'langues' => 'required|string',
            'categorie' => 'required|string',
            'competense' => 'required|string',
            'logo' => 'required|file',
        ];
    }
}