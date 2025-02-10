<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class recruteurstorerequeste extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        if(request()->isMethod('post')){
            return [
                'ville' => 'required|string|max:25',
                'secteur_activite' => 'required|string|max:255',
                'logo' => 'required|file',
                'description_entreprise' => 'required|string|max:255',
                'site_web' => 'required|string|max:255',
                
            ];
       }else{
        return [
                'ville' => 'required|string|max:25',
                'secteur_activite' => 'required|string|max:255',
                'logo' => 'required|file',
                'description_entreprise' => 'required|string|max:255',
                'site_web' => 'required|string|max:255',
               
        ];
       }
    }
}