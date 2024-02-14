<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    public function login(Request $request ){
        $rules = [
            'email' => 'required|email',
            'password' => 'required',
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }
        $user = User::where('email', $request->email)->first();
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => false,
                'msg' => 'User or Password Incorrect',
            ],401);
        }
        $token = $user->createToken($request->email)->plainTextToken;
        return response()->json([
            'res' => true,
            'token' => $token,
            'data' => $user,
            'msg' => 'User Logged Correctly'
        ],200);
    }

    public function register(Request $request){
        $rules = [
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required',
            'confirm_password' => 'required|same:password'
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
//        $user->sendEmailVerification();


        return response()->json([
            'res' => true,
            'msg' => 'User created successfully'
        ],200);


    }

    public function logout(Request $request){
        $token = $request->bearerToken();
        $record = PersonalAccessToken::findToken($token);
        $record->delete();
        return response()->json([
            'res' => true,
            'msg' => 'Closed session',
        ],200);

    }
}
