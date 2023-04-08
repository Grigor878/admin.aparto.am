<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employe;

class UserController extends Controller
{

    public function getUsers () {
       $users = Employe::all();
       foreach ($users as $idx=>$user){ 
            $users[$idx]->full_name = json_decode($user['full_name'], true);
            $users[$idx]->phone = json_decode($user['phone'], true);
       }
        return response()->json($users);
    }

    public function editUser (Request $request) {
        $data = $request->all();
        dd($data);
         return response()->json($data);
     }

     public function changePassword (Request $request) {
        $data = $request->all();
        dd($data);
        $userId = auth()->user()->id;

        dd($data);
         return response()->json($data);
     }

     

     public function addUser (Request $request) {
        $data = $request->all();
        dd($data);
         return response()->json($data);
     }
}
