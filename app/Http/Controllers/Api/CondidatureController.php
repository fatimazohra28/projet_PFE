<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Condidature;
use App\Models\User;


class CondidatureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Condidature::all();
    }
    public function showByUserId($userId)
    {
        $user = User::find($userId);
        $candidature = $user->condidature; 
        return response()->json($candidature);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $candidature = new Condidature();
        $candidature->telephone = $request->input('telephone');
        $candidature->ville = $request->input('ville');
        $candidature->niveau_etude = $request->input('niveau_etude');
        $candidature->specialite = $request->input('specialite');
        $candidature->etablissement = $request->input('etablissement');
        $candidature->formations = $request->input('formations');
        $candidature->experiences = $request->input('experiences');
        $candidature->competences = $request->input('competences');
        $candidature->langue = $request->input('langue');
        $candidature->littre_motivation= $request->input('littre_motivation');
        $candidature->user_id = $request->input('user_id');
        $candidature->created_at = now();
    
        // Gérez le téléchargement du fichier CV
        if ($request->hasFile('cv')) {
            $cv = $request->file('cv');
            $cvName = time() . '.' . $cv->getClientOriginalExtension();
            $cv->move(public_path('cv'), $cvName);
            $candidature->cv =$cvName;
            $candidature->save(); // Sauvegarde la candidature si le fichier CV est téléchargé avec succès
            return response()->json(['message' => 'Candidature ajoutée avec succès'], 201);
        } else {
            return response()->json(['success' => false, 'message' => 'Aucun fichier CV sélectionné.'], 400);
        }
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}