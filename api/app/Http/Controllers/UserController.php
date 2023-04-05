<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employe;

class UserController extends Controller
{
    

    public function getUsers () {
       $users = Employe::all();

        return response()->json($users);
    }
}
