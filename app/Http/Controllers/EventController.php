<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Redirect;

class EventController extends Controller
{
    public function index()
    {
        return Event::all();
    }

    public function show($id)
    {
        return Event::findOrFail($id)->orderByAsc('id');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'vip_ticket_price' => 'required|numeric|min:0',
            'regular_ticket_price' => 'required|numeric|min:0',
            'max_attendees' => 'required|integer|min:1',
        ]);

        $createdEvent = Event::create($request->all());
        return Redirect::route('dashboard');
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'vip_ticket_price' => 'required|numeric|min:0',
            'regular_ticket_price' => 'required|numeric|min:0',
            'max_attendees' => 'required|integer|min:1',
        ]);

        $updatedEvent = $event->update($request->all());
        return Redirect::route('dashboard');
    }

    public function destroy($id)
    {
        Event::findOrFail($id)->delete();
        Redirect::route('dashboard');
    }
}
