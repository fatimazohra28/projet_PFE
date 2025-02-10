<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Recruteur;
use App\Models\User;

class RecruteurController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Recruteur::all();
    }
    public function showByUserId($userId)
    {
        $user = User::find($userId);
        $recruteur = $user->recruteur; 
        return response()->json($recruteur);
    }
    public function getOffresByUserId($userId)
    {
        // Recherche du recruteur par l'ID de l'utilisateur
        $recruteur = Recruteur::where('user_id', $userId)->first();
        
        // Vérification si le recruteur existe
        if (!$recruteur) {
            return response()->json(['message' => 'Recruteur non trouvé'], 404);
        }

        // Récupérer toutes les offres pour ce recruteur
        $offres = $recruteur->offres()->with('condidatures')->get();

        return response()->json($offres);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $recruteur = new Recruteur();
        $recruteur->secteur_activite = $request->input('secteur_activite');
        $recruteur->ville = $request->input('ville');
        $recruteur->description_entreprise = $request->input('description_entreprise');
        $recruteur->site_web = $request->input('site_web');
        $recruteur->user_id = $request->input('user_id');
        $recruteur->created_at = now();
    
        // Gérez le téléchargement du fichier logo
        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $logoName = time() . '.' . $logo->getClientOriginalExtension();
            $logo->move(public_path('cv'), $logoName);
            $recruteur->logo =$logoName;
            $recruteur->save(); // Sauvegarde la recruteur si le fichier logo est téléchargé avec succès
            return response()->json(['message' => 'recruteur ajoutée avec succès'], 201);
        } else {
            return response()->json(['success' => false, 'message' => 'Aucun fichier logo sélectionné.'], 400);
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