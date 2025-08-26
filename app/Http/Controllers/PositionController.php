<?php

namespace App\Http\Controllers;

use App\Models\Container;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Location;

use function Pest\Laravel\get;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $locations = Location::all();
        $containers = Container::with(['location', 'customer'])->get();
        return Inertia::render('user/positions/index', [
            'locations' => $locations,
            'containers' => $containers
        ]);
    }
    public function move(string $id)
    {
        $container = Container::with('location')->findOrFail($id);
        $locations = Location::all();

        return Inertia::render('user/positions/move', [
            'container' => $container,
            'locations' => $locations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'id' => $id,
            'location_id' => 'required|exists:locations,id',
        ]);
        $container = Container::findOrFail($id);
        if($container->location_id == $validatedData['location_id']){
            return redirect()->back()->withErrors(['location_id' => 'Cannot change to the same location'])->withInput();
        };
        $oldLocationId = $container->location_id;
        $newLocationId = $validatedData['location_id'];
        if ($oldLocationId !== $newLocationId) {
            // if the location has changed, reset stack levels for the new location
            $containers = Container::where('location_id', $newLocationId)
                ->where('status', 'in_yard')
                ->orderBy('stack_level')
                ->get();

            $newStackLevel = 1;
            foreach ($containers as $c) {
                $c->update(['stack_level' => $newStackLevel]);
                $newStackLevel++;
            }
            if($newStackLevel > 5) {
                return redirect()->back()->withErrors(['location_id' => 'Stack level exceeds maximum allowed.'])->withInput();
            }
            $validatedData['stack_level'] = $newStackLevel;
        }
        $container->update($validatedData);
                $oldLocationContainers = Container::where('location_id', $oldLocationId)
                ->where('status', 'in_yard')
                ->orderBy('stack_level')
                ->get();
        $stack_level = 1;
        foreach ($oldLocationContainers as $c) {
            // update stack level for old location containers
            $c->update(['stack_level' => $stack_level]);
            $stack_level++;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
