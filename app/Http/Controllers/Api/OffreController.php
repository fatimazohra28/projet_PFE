<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Offre;
use App\Models\Admin;


class OffreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Offre::all();
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        //$logoPath = $request->file('logo')->store('logos', 'public');

        // Create and save the new Offre instance
        $offre = new Offre();
        $offre->intitule = $request->input('intitule');
        $offre->salaire = $request->input('salaire');
        $offre->type_contrat = $request->input('type_contrat');
        $offre->niveau_etude = $request->input('niveau_etude');
        $offre->description = $request->input('description');
        $offre->nombre_posts = $request->input('nombre_posts');
        $offre->ville = $request->input('ville');
        $offre->langues = $request->input('langues');
        $offre->categorie = $request->input('categorie');
        $offre->competense = $request->input('competense');
        $offre->recruteur_id = $request->input('recruteur_id');
        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $logoName = time() . '.' . $logo->getClientOriginalExtension();
            $logo->move(public_path('cv'), $logoName);
            $offre->logo =$logoName;
            $offre->save(); // Sauvegarde la recruteur si le fichier logo est téléchargé avec succès
            return response()->json(['message' => 'recruteur ajoutée avec succès'], 201);
        } else {
            return response()->json(['success' => false, 'message' => 'Aucun fichier logo sélectionné.'], 400);
        }

        // Return a success response
        return response()->json(['message' => 'Offre created successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $offre = Offre::findOrFail($id);
        return response()->json($offre, 200);
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
        try {
        // Find the offer by ID
        $offre = Offre::findOrFail($id);

        // Update the fields
        $offre->intitule = $request->input('intitule');
        $offre->salaire = $request->input('salaire');
        $offre->type_contrat = $request->input('type_contrat');
        $offre->niveau_etude = $request->input('niveau_etude');
        $offre->description = $request->input('description');
        $offre->nombre_posts = $request->input('nombre_posts');
        $offre->ville = $request->input('ville');
        $offre->langues = $request->input('langues');
        $offre->categorie = $request->input('categorie');
        $offre->competense = $request->input('competense');
        $offre->recruteur_id = $request->input('recruteur_id');

        // Handle logo upload if a new file is provided
        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $logoName = time() . '.' . $logo->getClientOriginalExtension();
            $logo->move(public_path('cv'), $logoName);
            $offre->logo = $logoName;
        }

        // Save the updated offer
        $offre->save();

        // Return a success response
        return response()->json(['message' => 'Offre mise à jour avec succès'], 200);
    } catch (\Exception $e) {
        // Return an error response
        return response()->json([
            'message' => 'Erreur lors de la mise à jour de l\'offre : ' . $e->getMessage(),
        ], 500);
    }
    }
    public function updateApproval(Request $request, $id,$approuve)
    {
        $offre = Offre::findOrFail($id);
        if($approuve){
            $offre->statut = 'approuvée';$offre->save();
        }
        if($approuve=false) {
        
            $offre->statut = 'Non approuvée';$offre->save();
        }
        
        
        
        return response()->json(['message' => 'Statut d\'approbation de l\'offre mis à jour avec succès'], 200);
    }

    public function getNonApprouvees()
    {
        $offres = Offre::where('approuve', false)->get();
        return response()->json($offres, 200);
    }
        
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            // Find the offer by ID
            $offre = Offre::findOrFail($id);

            // Delete the offer
            $offre->delete();

            // Return a success response
            return response()->json([
                'message' => 'Offre supprimée avec succès.',
            ], 200);
        } catch (\Exception $e) {
            // Return an error response
            return response()->json([
                'message' => 'Erreur lors de la suppression de l\'offre : ' . $e->getMessage(),
            ], 500);
        }
    }
    public function getadmin()
    {
        return Admin::all();
        
    }
}