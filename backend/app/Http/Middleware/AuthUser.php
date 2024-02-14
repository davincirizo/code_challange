<?php

namespace App\Http\Middleware;

use App\Models\PersonalAccessTokenInherit;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        $record = PersonalAccessTokenInherit::findUser($token);

        if($record) {
            return $next($request);
        }

        return response()->json([
            'msg' => 'Unauthorized'
        ], 401);
    }
}
