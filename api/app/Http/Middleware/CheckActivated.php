<?php

namespace App\Http\Middleware;

use App\Models\Employe;
use Closure;
use Illuminate\Http\Request;

class CheckActivated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user()->status != Employe::STATUS_DEACTIVATE) {
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }
}
