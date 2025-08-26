<?php

namespace App\Http\Controllers;

use App\Models\Container;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Location;

class ContainerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->get('perPage', 10);
        $containers = Container::with(['customer', 'location'])
            ->orderBy('location_id')
            ->orderBy('stack_level')
            ->where('status', '!=', 'on_truck')
            ->paginate($perPage);
        $curentPage = $containers->currentPage();
        $lastPage = $containers->lastPage();
        if ($curentPage > $lastPage) {
            return redirect()->route('containers.index', ['page' => $lastPage, 'perPage' => $perPage]);
        }
        return Inertia::render('admin/containers/index', [
            'containers' => $containers,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $locations = Location::get(['id', 'zone', 'rows', 'columns']);
        $customers = Customer::all();
        return Inertia::render('admin/containers/create', [
            'customers' => $customers,
            'locations' => $locations,
            'sizes' => ['20ft', '40ft', '45ft'],
            'types' => ['dry', 'refrigerated', 'open_top', 'flat_rack', 'tank'],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'container_number' => 'required|string|max:255|unique:containers,container_number',
            'size' => 'required|string',
            'type' => 'required|string',
            'location_id' => 'required|exists:locations,id',
            'customer_id' => 'required|exists:customers,id',
            'status' => 'required|string',
            'stack_level' => 'required|integer|min:1',
        ]);
        // $checkContainer = Container::where('container_number', $request->id);
        // if($checkContainer == $request->container_number){
        //     return redirect()->back()->withErrors(['container_number' => 'This number already registered'])->withInput();
        // }
        $stack_level = Container::where('location_id', $request->location_id)
            ->where('status', 'in_yard')
            ->max('stack_level') + 1;
        $maxStackLevel = 5;
        if ($stack_level > $maxStackLevel) {
            return redirect()->back()->withErrors(['stack_level' => 'Stack level exceeds maximum allowed.'])->withInput();
        }
        $request->merge(['stack_level' => $stack_level]);
        $validatedData['stack_level'] = $stack_level;
        $checkCustomer = Customer::where([
            ['id', '=', $request->customer_id],
            ['status', '=', 'active'],
        ])->first();
        if (!$checkCustomer) {
            return redirect()->back()->withErrors(['customer_id' => 'Customer is not active'])->withInput();
        }
        Container::create($validatedData);
        if ($request->filled('customer_id')) {
            $customer = Customer::find($request->customer_id);
            if ($customer) {
                $customer->increment('total_containers');
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Container $container)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Container $container)
    {
        $container->load(['customer', 'location']);
        $locations = Location::get(['id', 'zone', 'rows', 'columns']);
        $customers = Customer::get(['id', 'name', 'email', 'phone', 'address', 'status']);
        return Inertia::render('admin/containers/edit', [
            'container' => $container,
            'locations' => $locations,
            'customers' => $customers,
            'sizes' => ['20ft', '40ft', '45ft'],
            'types' => ['dry', 'refrigerated', 'open_top', 'flat_rack', 'tank'],
            'breadcrumbs' => [
                ['title' => 'Containers', 'href' => route('containers.index')],
                ['title' => 'Edit Container', 'href' => route('containers.edit', $container->id)],
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Container $container)
    {
        $validatedData = $request->validate([
            'container_number' => 'required|string|max:255|unique:containers,container_number,' . $container->id,
            'size' => 'required|string',
            'type' => 'required|string',
            'location_id' => 'required|exists:locations,id',
            'customer_id' => 'required|exists:customers,id',
            'status' => 'required|string',
            'stack_level' => 'required|integer|min:1',
        ]);
        $customer = Customer::find($validatedData['customer_id']);
        if (!$customer || $customer->status !== 'active') {
            return redirect()->back()->withErrors(['customer_id' => 'This customer is not active'])->withInput();
        }
        // check and update customer total containers
        if ($container->customer_id !== $validatedData['customer_id']) {
            $oldCustomer = Customer::find($container->customer_id);
            if ($oldCustomer->total_containers > 1) {
                $oldCustomer->decrement('total_containers');
            }
            $newCustomer = Customer::find($validatedData['customer_id']);
            if ($newCustomer) {
                $newCustomer->increment('total_containers');
            }
        }

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
            if ($newStackLevel > 5) {
                return redirect()->back()->withErrors(['stack_level' => 'Stack level exceeds maximum allowed.'])->withInput();
            }
            $validatedData['stack_level'] = $newStackLevel;
        } else {
            // if the location has not changed, keep the current stack level
            $newStackLevel = $container->stack_level;
        }
        $validatedData['status'] = $request->filled('status') ? $request->status : $container->status;
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
    public function destroy(Container $container)
    {
        Container::destroy($container->id);

        $containers = Container::where('location_id', $container->location_id)
            ->where('status', 'in_yard')
            ->orderBy('stack_level')
            ->get();

        $newStackLevel = 1;
        foreach ($containers as $c) {
            $c->update(['stack_level' => $newStackLevel]);
            $newStackLevel++;
        }

        if ($container->customer_id) {
            $customer = Customer::find($container->customer_id);
            if ($customer) {
                $customer->decrement('total_containers');
            }
        }
        return redirect()->route('containers.index')->with('success', 'Container deleted successfully.');
    }
}
