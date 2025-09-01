<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Models\Task;
use App\Models\User;
use App\Models\Container;
use App\Models\Customer;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $perPage = $request->get('per_page', 10);
        $tasks = $this->getPaginatedTasks($user, $perPage);
        $curentPage = $tasks->currentPage();
        $lastPage = $tasks->lastPage();
        $view = $user->role === 'admin' ? 'admin/task/index' : 'user/task/index';
        $route = $user->role === 'admin' ? 'admin.task.index' : 'user.task.index';
        if ($curentPage > $lastPage) {
            return redirect()->route($route, ['page' => $lastPage, 'per_page' => $perPage]);
        }
        return Inertia::render($view, [
            'tasks' => $tasks,
            'perPage' => $perPage,
        ]);
    }
    private function getPaginatedTasks($user, $perPage)
    {
        return Task::with([
            'admin:id,name',
            'workers' => fn($q) => $q->select('users.id', 'users.name')
                ->withPivot('assigned_at', 'started_at', 'completed_at'),
        ])
            ->orderBy('status')
            ->orderBy('updated_at', 'desc')
            ->paginate($perPage)
            ->through(fn($task) => $this->transformTask($task, $user));
    }
    private function transformTask($task, $user)
    {
        if ($user->role === 'admin') {
            $task->assigned_at = $task->workers->pluck('pivot.assigned_at')->first();
            $task->started_at = optional(optional(
                $task->workers->firstWhere('pivot.started_at', '!=', null)
            )->pivot)->started_at;

            $task->completed_at = optional(optional(
                $task->workers->firstWhere('pivot.completed_at', '!=', null)
            )->pivot)->completed_at;

            $task->workersStarted = optional(
                $task->workers->firstWhere('pivot.started_at', '!=', null)
            )->name;

            $task->workersCompleted = optional(
                $task->workers->firstWhere('pivot.completed_at', '!=', null)
            )->name;
        } else {
            $task->assigned_at  = $task->workers->pluck('pivot.assigned_at')->first();
            $task->started_at   = $task->workers->firstWhere('pivot.started_at', '!=', null);
            $task->completed_at = $task->workers->firstWhere('pivot.completed_at', '!=', null);
        }
        return $task;
    }
    public function create()
    {
        $containers = Container::all();
        $customers = Customer::all();
        return Inertia::render('admin/task/create', [
            'containers' => $containers->map(function ($container) {
                return [
                    'id' => $container->id,
                    'container_number' => $container->container_number,
                    'status' => $container->status,
                    'customer_id' => $container->customer_id
                ];
            }),
            'customers' => $customers->map(function ($customer) {
                return [
                    'id' => $customer->id,
                    'name' => $customer->name
                ];
            }),
            'tasks' => Task::select('id', 'container_id', 'status')->get()->map(function ($task) {
                return [
                    'id' => $task->id,
                    'container_id' => $task->container_id,
                    'status' => $task->status
                ];
            })
        ]);
    }
    public function store(Request $request)
    {
        $user = Auth::user();
        if ($user->role === 'admin') {
            $validatedData = $request->validate([
                'title' => 'required',
                'description' => 'nullable|string',
                'container_id' => 'required|exists:containers,id',
                'customer_id' => 'required|exists:customers,id',
                'type' => 'required|in:loading,unloading',
            ]);
            if ($validatedData['type'] === 'loading') {
                // cek apakah container punya customer
                $container = Container::find($validatedData['container_id']);
                $customer = Customer::find($validatedData['customer_id']);
                if ($container->customer_id !== $customer->id) {
                    return redirect()->back()->withErrors(['container_id' => 'Container does not belong to the selected customer'])->withInput();
                }
                if ($container->status !== 'in_yard') {
                    return redirect()->back()->withErrors(['container_id' => 'Container is not in yard'])->withInput();
                }
                // Cek apakah ada task dengan container yang sama dan status pending atau in_progress
                $existingTask = Task::where('container_id', $validatedData['container_id'])
                    ->whereIn('status', ['pending', 'in_progress'])
                    ->first();
                if ($existingTask) {
                    return redirect()->back()->withErrors([
                        'container_id' => 'The container is already assigned to a task (Status: ' . $existingTask->status . ')'
                    ])->withInput();
                }
                $validatedData['requested_by'] = $user->id;
                $task = Task::create($validatedData);
                $workers = User::where('role', 'user')->pluck('id')->toArray();
                $task->workers()->attach($workers);
            }
            if ($validatedData['type'] === 'unloading') {
                // cek apakah container punya customer
                $container = Container::find($validatedData['container_id']);
                $customer = Customer::find($validatedData['customer_id']);
                if ($container->customer_id !== $customer->id) {
                    return redirect()->back()->withErrors(['container_id' => 'Container does not belong to the selected customer'])->withInput();
                }
                if ($container->status !== 'on_truck') {
                    return redirect()->back()->withErrors(['container_id' => 'Container is not on truck'])->withInput();
                }
                // Cek apakah ada task dengan container yang sama dan status pending atau in_progress
                $existingTask = Task::where('container_id', $validatedData['container_id'])
                    ->whereIn('status', ['pending', 'in_progress'])
                    ->first();
                if ($existingTask) {
                    return redirect()->back()->withErrors(['container_id' => 'The container is already assigned to a task'])->withInput();
                }
                $validatedData['requested_by'] = $user->id;
                $task = Task::create($validatedData);
                $workers = User::where('role', 'user')->pluck('id')->toArray();
                $task->workers()->attach($workers);
            }
        }
    }
    public function update(Request $request, Task $task, User $user)
    {
        $request->validate([
            'status' => 'required|in:pending,in_progress,completed,cancelled',
        ]);
        if ($task->status !== 'pending') {
            return redirect()->back()->withErrors(['status' => "Task status cannot be cancelled or changed because it is currently {$task->status}."])->withInput();
        }
        $task->update([
            'status' => 'cancelled',
        ]);
        return redirect()->back()->with('success', 'Task has been cancelled successfully.');
    }
    public function start(Request $request, Task $task)
    {
        if ($task->status === 'completed') {
            return redirect()->route('user.task.index')->with('info', 'Task has comleted');
        }
        if ($task->status === 'cancelled') {
            return redirect()->route('user.task.index')->with('info', 'Task has been cancelled');
        }
        $user = Auth::user();
        // Pastikan user di-assign ke task ini
        if (!$task->workers->contains($user->id)) {
            abort(403, 'Kamu tidak di-assign ke task ini.');
        }
        if (is_null($task->workers()->where('user_id', $user->id)->first()->pivot->started_at)) {
            // cek kalau user lain sedang jalanin task
            $inProgressByOther = $task->workers()
                ->wherePivotNotNull('started_at')
                ->where('task_assignments.user_id', '!=', $user->id)
                ->exists();

            if ($inProgressByOther) {
                return back()->with('error', 'Task sedang dikerjakan orang lain.');
            }

            // isi started_at untuk user login
            $task->workers()->updateExistingPivot($user->id, [
                'started_at' => now(),
            ]);
        }

        // kalau status masih pending → ubah jadi in_progress
        if ($task->status === 'pending') {
            $task->status = 'in_progress';
            $task->save();
        }
        $containers = Container::all();
        $customers = Customer::all();
        $availableLocations = Location::withCount([
            'containers' => function ($query) {
                $query->where('status', '!=', 'on_truck');
            }
        ])->get()->filter(function ($loc) {
            return $loc->containers_count < 5;
        });
        return Inertia::render('user/task/start', [
            'task' => $task,
            'message' => 'Task dimulai.',
            'containers' => $containers->map(function ($container) {
                return [
                    'id' => $container->id,
                    'container_number' => $container->container_number,
                    'status' => $container->status,
                ];
            }),
            'customers' => $customers->map(function ($customer) {
                return [
                    'id' => $customer->id,
                    'name' => $customer->name
                ];
            }),
            'locations' => $availableLocations->map(function ($location) {
                return [
                    'id' => $location->id,
                    'zone' => $location->zone ?? 'unknown',
                    'rows' => $location->rows ?? 0,
                    'columns' => $location->columns ?? 0
                ];
            })->values()
        ]);
    }
    public function doTask(Request $request, Task $task, History $history)
    {
        $user = Auth::user();
        if (!$task->workers->contains($user->id)) {
            abort(403, 'Kamu tidak di-assign ke task ini.');
        }
        if ($task->type === 'loading') {
            return $this->doLoading($request, $task, $user, $history);
        } elseif ($task->type === 'unloading') {
            return $this->doUnloading($request, $task, $user, $history);
        }
    }
    private function doLoading(Request $request, Task $task, User $user, History $history)
    {
        $validatedData = $request->validate([
            'container_number' => 'required|exists:containers,id',
            'customer' => 'required',
            'notes' => 'string|nullable'
        ]);
        $containers = Container::find($validatedData['container_number']);
        $customers = Customer::find($validatedData['customer']);
        $locations = Location::find($containers->location_id);
        $oldLocation = $containers->location_id;
        if ($task->type !== 'loading') {
            return redirect()->back()->withErrors(['container_number' => 'Invalid task type for loading'])->withInput();
        }
        // Cek kondisi container terakhir jika pertama kali loading akan good, jika sudah pernah loading akan sesuai kondisi terakhir
        $lastHistory = History::where('container_id', $containers->id)
            ->latest()->first();
        $curentCondition = $lastHistory ? $lastHistory->condition : 'good';
        // cek apakah container di in_yard 
        if ($containers->status !== 'in_yard') {
            return redirect()->back()->withErrors(['container_number' => 'Container is not in yard'])->withInput();
        }
        if ($customers->status !== 'active') {
            return redirect()->back()->withErrors(['customer' => 'Customer is not active'])->withInput();
        }
        if ($containers->customer_id !== $customers->id) {
            return redirect()->back()->withErrors(['container_number' => 'Container does not belong to the selected customer'])->withInput();
        }
        $taskList = $task->container_id;
        if ($containers->id !== $taskList) {
            return redirect()->back()->withErrors(['container_number' => 'Container does not match the task assignment'])->withInput();
        }
        if ($customers->id !== $task->customer_id) {
            return redirect()->back()->withErrors(['customer' => 'Customer does not match the task assignment'])->withInput();
        }
        $task->workers()->updateExistingPivot($user->id, [
            'completed_at' => now(),
        ]);
        $containers->status = 'on_truck';
        $containers->location_id = null;
        $containers->stack_level = 0;
        $containers->save();
        $containerStack = Container::where('location_id', $oldLocation)
            ->where('status', 'in_yard')
            ->orderBy('stack_level')
            ->get();
        $newStackLevel = 1;
        foreach ($containerStack as $container) {
            $container->stack_level = $newStackLevel;
            $container->save();
            $newStackLevel++;
        }
        $task->status = 'completed';
        $task->save();
        $history->create([
            'container_id' => $containers->id,
            'location_id' => $locations->id,
            'customer_id' => $validatedData['customer'],
            'user_id' => $user->id,
            'task_id' => $task->id,
            'type' => $task->type,
            'condition' => $curentCondition ?? 'good',
            'status' => 'completed',
            'event_time' => now(),
            'notes' => $validatedData['notes'] ?? null
        ])->save();
        return redirect()->route('user.task.index')->with('success', 'Loading task completed successfully!');
    }
    private function doUnloading(Request $request, Task $task, User $user, History $history)
    {
        $validatedData = $request->validate([
            'container_number' => 'required',
            'location' => 'required|exists:locations,id',
            'condition' => 'required|in:good,damaged,needs_repair',
            'notes' => 'nullable|string',
        ]);
        $containers = Container::find($validatedData['container_number']);
        $locations = Location::find($validatedData['location']);
        if ($containers->id !== $task->container_id || $containers->customer_id !== $task->customer_id) {
            return redirect()->back()->withErrors([
                'container_number' => 'Container does not match the task assignment'
            ])->withInput();
        }
        // memastika task type unloading
        if ($task->type !== 'unloading') {
            return redirect()->back()->withErrors(['container_number' => 'Invalid task type for unloading'])->withInput();
        }
        // hanya kontainer posisi di truck yg bisa di-unloading
        if ($containers->status !== 'on_truck') {
            return redirect()->back()->withErrors(['container_number' => 'Container is not on truck'])->withInput();
        }
        $taskList = $task->container_id;
        if ($containers->id !== $taskList) {
            return redirect()->back()->withErrors(['container_number' => 'Container does not match the task assignment'])->withInput();
        }
        //update task workers
        $task->workers()->updateExistingPivot($user->id, [
            'completed_at' => now(),
        ]);
        //cek lokasi stack container
        $existingContainersCount = Container::where('location_id', $locations->id)
            ->where('status', 'in_yard')
            ->count();
        if ($existingContainersCount >= 5) {
            return redirect()->back()->withErrors(['location' => 'Location is full, maximum 5 containers allowed'])->withInput();
        }
        $containers->status = 'in_yard';
        $containers->location_id = $locations->id;
        $containers->stack_level = $existingContainersCount + 1; // Stack paling atas
        $containers->save();
        // Update task status
        $task->status = 'completed';
        $task->save();
        $history->create([
            'container_id' => $containers->id,
            'location_id' => $locations->id,
            'customer_id' => $containers->customer_id,
            'user_id' => $user->id,
            'task_id' => $task->id,
            'type' => $task->type,
            'condition' => $validatedData['condition'],
            'status' => 'completed',
            'event_time' => now(),
            'notes' => $validatedData['notes'] ?? null
        ])->save();
        return redirect()->route('user.task.index')->with('success', 'Unloading task completed successfully!');
    }
}
