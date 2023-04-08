<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
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

     public function getGlobalUser() {
        $globalUser = auth()->user();
        $globalUser->full_name = json_decode($globalUser['full_name'], true);
        $globalUser->phone = json_decode($globalUser['phone'], true);
        return response()->json($globalUser);
     }

     public function addUser (Request $request) {
        $data = $request->all();
        $fileName = null;
        $password =  Str::random(10);
        $userInfo = json_decode($data['userInfo']);
        if($request->file) {
            $fileName = time().'.'.$request->file->extension();
            $request->file->move(public_path('images'), $fileName);
        }
        $user = new Employe();
        $user->full_name = json_encode($userInfo->full_name);
        $user->phone = json_encode($userInfo->phone);
        $user->email = $userInfo->email;
        $user->role = $userInfo->role;
        $user->photo = $fileName;
        $user->password = Hash::make($password);
        $user->save();
        return response()->json(['status' => 'success', 'password' => $password], 200);

      
     }
}
