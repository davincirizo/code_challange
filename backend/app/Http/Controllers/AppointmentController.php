<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\PersonalAccessTokenInherit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{

    public function index(Request $request){
        $token = $request->bearerToken();
        $user = PersonalAccessTokenInherit::findUser($token);
        $appoinments = Appointment::where('user', '=', $user->id)->get();

        return response()->json([
            'res' => true,
            'msg' => 'Ok',
            'appoinments' => $appoinments
        ],200);
    }

    public function store(Request $request){
        $fechaActual = Carbon::now();
        $token = $request->bearerToken();
        $user = PersonalAccessTokenInherit::findUser($token);
        $rules = [
            'appointment_day' => 'required',
            'notes' => 'required',
            'client' => 'required',
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }
        $fechaHoraCarbon = Carbon::parse( $request->appointment_day);
        $fechaHoraCarbon->modify('-6 hours');
        $week_day = $fechaHoraCarbon->dayOfWeek;

        foreach ($user->appointments as $appointment) {
            if($appointment->appointment_day == $fechaHoraCarbon){
                return response()->json([
                    'status' => false,
                    'msg' => 'You cannot have two dates with the same date',
                ],400);
            }
        }

        if ($fechaActual->greaterThan($fechaHoraCarbon)){
            return response()->json([
                'status' => false,
                'msg' => 'The date of the appointment cannot be less than the current one.',
            ],400);
        }
        if($week_day == 6 || $week_day == 0 ){
            return response()->json([
                'status' => false,
                'msg' => 'You cannot select either Saturday or Sunday',
            ],400);
        }
        if ($fechaHoraCarbon->lt($fechaHoraCarbon->copy()->startOfDay()->addHours(8)) || $fechaHoraCarbon->gt($fechaHoraCarbon->copy()->startOfDay()->addHours(17))) {
            return response()->json([
                'status' => false,
                'msg' => 'The permitted hours are from 8 a.m. to 5 p.m.',
            ], 400);
        }
        $appointment = new Appointment();
        $appointment->appointment_day = $fechaHoraCarbon;
        $appointment->notes = $request->notes;
        $appointment->client = $request->client;
        $appointment->user = $user->id;
        $appointment->save();
        return response()->json([
            'status' => false,
            'msg' => 'Appointment created successfully',
        ], 200);

    }

    public function update(Request $request,Appointment $appointment){
        $fechaActual = Carbon::now();
        $token = $request->bearerToken();
        $user = PersonalAccessTokenInherit::findUser($token);
        Auth::login($user);
        $this->authorize('update_appointment',$appointment);

        $rules = [
            'appointment_day' => 'required',
            'notes' => 'required',
            'client' => 'required',
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }

//        $fechaHoraCarbon = Carbon::createFromFormat('Y-m-d H:i:s', $request->appointment_day);
        $fechaHoraCarbon = Carbon::parse( $request->appointment_day);
        $fechaHoraCarbon->modify('-6 hours');
        $week_day = $fechaHoraCarbon->dayOfWeek;

        foreach ($user->appointments as $appointment) {
            if($appointment->appointment_day == $fechaHoraCarbon){
                return response()->json([
                    'status' => false,
                    'msg' => 'You cannot have two dates with the same date',
                ],400);
            }
        }

        if ($fechaActual->greaterThan($fechaHoraCarbon)){
            return response()->json([
                'status' => false,
                'msg' => 'The date of the appointment cannot be less than the current one.',
            ],400);
        }

        if($week_day == 6 || $week_day == 0 ){
            return response()->json([
                'status' => false,
                'msg' => 'You cannot select either Saturday or Sunday',
            ],400);
        }

        if ($fechaHoraCarbon->lt($fechaHoraCarbon->copy()->startOfDay()->addHours(8)) || $fechaHoraCarbon->gt($fechaHoraCarbon->copy()->startOfDay()->addHours(17))) {
            return response()->json([
                'status' => false,
                'msg' => 'The permitted hours are from 8 a.m. to 5 p.m.',
            ], 400);
        }
        $appointment->appointment_day = $fechaHoraCarbon;
        $appointment->notes = $request->notes;
        $appointment->client = $request->client;
        $appointment->save();
        return response()->json([
            'status' => false,
            'msg' => 'Appointment updated successfully',
        ], 200);
    }

    public function delete(Request $request,Appointment $appointment){
        $token = $request->bearerToken();
        $user = PersonalAccessTokenInherit::findUser($token);
        Auth::login($user);
        $this->authorize('update_appointment',$appointment);
        $appointment->delete();
        return response()->json([
            'res' => true,
            'msg' => 'Appointment deleted correctly',
        ],200);
    }

    public function read(Appointment $appointment,Request $request){
        $token = $request->bearerToken();
        $user = PersonalAccessTokenInherit::findUser($token);
        $fechaFormateada = Carbon::createFromFormat('Y-m-d H:i:s', $appointment->appointment_day)->format('Y-m-d\TH:i');
        $appointment->appointment_day = $fechaFormateada;
        Auth::login($user);
        $this->authorize('update_appointment',$appointment);
         return response()->json([
            'res' => true,
            'appoinment' => $appointment
        ],200);

    }

}
