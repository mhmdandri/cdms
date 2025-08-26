<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Pest\ArchPresets\Custom;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = request()->get('perPage', 10);
        $totalCustomers = Customer::count();
        $customers = Customer::orderBy('created_at', 'desc')->paginate($perPage);
        $curentPage = $customers->currentPage();
        $lastPage = $customers->lastPage();
        if ($curentPage > $lastPage) {
            return redirect()->route('customers.index', ['page' => $lastPage, 'perPage' => $perPage]);
        }
        return Inertia::render('admin/customers/index', [
            'customers' => $customers,
            'totalCustomers' => $totalCustomers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('admin/customers/create', [
            'breadcrumbs' => [
                ['title' => 'Customers', 'href' => 'admin/customers/create'],
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
        ]);
        Customer::create($validatedData);
        //return redirect()->route('customers.index')->with('success', 'Customer created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        $customer = Customer::findOrFail($customer->id);
        return inertia('admin/customers/edit', [
            'customer' => $customer,
            'breadcrumbs' => [
                ['title' => 'Customers', 'href' => 'admin/customers'],
                ['title' => 'Edit Customer', 'href' => 'admin/customers/edit'],
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customer $customer)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email,' . $customer->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);
        $customer->update($validatedData);
        //return redirect()->route('customers.index')->with('success', 'Customer updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        Customer::destroy($customer->id);
        return redirect()->route('customers.index')->with('success', 'Customer deleted successfully.');
    }
}
