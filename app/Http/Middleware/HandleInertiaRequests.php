<?php

namespace App\Http\Middleware;

use App\Models\Event;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $roles = User::with('roles:name')->where('id', $user?->id)?->first()?->roles;
        $events = Event::all();
        $reservations = $user?->hasAnyRole(['ROLE_ADMIN'])
            ? Reservation::with('event')->get()
            : Reservation::with('event')->where('user_id', $user?->id)->get();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'roles' => $roles
            ],
            'events' => $events,
            'reservations' => $reservations
        ];
    }
}
