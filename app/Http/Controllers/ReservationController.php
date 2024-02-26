<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Reservation;

class ReservationController extends Controller
{
    public function store(Request $request, $eventId)
    {
        $event = Event::findOrFail($eventId);

        $request->validate([
            'user_email' => 'required|email',
            'num_tickets' => 'required|integer|min:1|max:5',
        ]);

        $availableTickets = $event->max_attendees - Reservation::where('event_id', $eventId)->sum('num_tickets');

        if ($availableTickets < $request->num_tickets) {
            return response()->json(['error' => 'Not enough tickets available'], 422);
        }

        $reservation = Reservation::create([
            'event_id' => $eventId,
            'user_email' => $request->user_email,
            'num_tickets' => $request->num_tickets,
        ]);

        return $reservation;
    }
}
