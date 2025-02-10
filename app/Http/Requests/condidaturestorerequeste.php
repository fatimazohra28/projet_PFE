<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class condidaturestorerequeste extends FormRequest
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

    public function rules()
    {
        if(request()->isMethod('post')){
            return [
                'telephone' => 'required|string|max:14',
                'ville' => 'required|string|max:25',
                'niveau_etude' => 'required|string|max:255',
                'specialite' => 'required|string|max:255',
                'etablissement' => 'required|string|max:255',
                'formations' => 'required|string|max:255',
                'experiences' => 'required|string|max:255',
                'competences' => 'required|string|max:255',
                'langue' => 'required|string|max:255',
                'littre_motivation' => 'required|string',
                'cv' => 'required|file',
            ];
       }else{
        return [
            'niveau_etude' => 'required|string|max:10',
            'telephone' => 'required|string|max:14',
            'ville' => 'required|string|max:25',
            'specialite' => 'required|string|max:255',
            'etablissement' => 'required|string|max:255',
            'formations' => 'required|string|max:255',
            'experiences' => 'required|string|max:255',
            'competences' => 'required|string|max:255',
            'langue' => 'required|string|max:255',
            'littre_motivation' => 'required|string',
           'cv' => 'required|file',
        ];
       }
      
    }
}