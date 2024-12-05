<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpFoundation\Response;

class JsonApiMiddleware
{
    const PARSED_METHODS = [
        'POST', 'PUT', 'PATCH',
    ];

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     *
     * @return mixed
     */
    public function handle($request, Closure $next): Response
    {
        if (in_array($request->getMethod(), self::PARSED_METHODS)) {
            $request->merge((array) json_decode($request->getContent()));
        }
        $request->headers->set('Accept', 'application/json');

        return $next($request);
    }
}
