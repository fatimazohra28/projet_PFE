<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Notification::all();
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $notification = new Notification();
    $notification->recruteur_id = $request->input('recruteur_id');
    $notification->condidature_id = $request->input('condidature_id');
    $notification->offre_id = $request->input('offre_id');
    $notification->message = $request->input('message');
    $notification->decision = $request->input('decision');
    $notification->created_at = now();
    $notification->save();

    // Réponse JSON pour confirmer la création de la notification
    return response()->json($notification, 201);

    }
    public function getNotifsByCondidature($condidatureId)
    {
        $notifications = Notification::where('condidature_id', $condidatureId)->get();
        return response()->json($notifications);
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