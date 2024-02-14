<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = ['user','appointment_day','notes','client'];

    public function user(){
        return $this->belongsTo('App\Models\User');
    }
}
