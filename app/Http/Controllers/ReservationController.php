<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Reservation;
use Illuminate\Support\Facades\Redirect;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $reservations = [];
        $user = $request->user();

        if ($user->hasAnyRole(['ROLE_ADMIN'])) {
            $reservations = Reservation::with('event')->get();
        } else {
            $reservations = Reservation::with('event')->where('user_id', $user->id);
        }

        return Redirect::route('dashboard', ['reservations' => $reservations]);
    }

    public function show($id)
    {
        return Reservation::findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'event_id' => 'required|integer',
            'type' => 'required|string',
            'num_tickets' => 'required|integer|min:1|max:5',
        ]);

        $event = Event::findOrFail($request->event_id);
        $user = $request->user();
        $type = $request->type;
        $num_tickets = $request->num_tickets;

        $availableTickets = $event->max_attendees - Reservation::where('event_id', $request->event_id)->sum('num_tickets');

        if ($availableTickets < $request->num_tickets) {
            return Redirect::route('dashboard');
        }

        $amount_paid = $type == 'Regular'
            ? $event->regular_ticket_price * $num_tickets
            : $event->vip_ticket_price * $num_tickets;

        Reservation::create([
            'event_id' => $event->id,
            'user_id' => $user->id,
            'type' => $type,
            'num_tickets' => $num_tickets,
            'amount_paid' => $amount_paid,
        ]);

        return Redirect::route('dashboard');
    }

    public function destroy($id)
    {
        Reservation::findOrFail($id)->delete();
        Redirect::route('dashboard');
    }
}
