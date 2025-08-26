<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\Container;
use App\Models\Location;
use App\Models\Task;
use App\Models\History;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $curentMonth = Carbon::now()->month;
        $lastMonth = Carbon::now()->subMonth()->month;
        $curentMonthCountCustomer = Customer::whereMonth('created_at', $curentMonth)->count();
        $lastMonthCountCustomer = Customer::whereMonth('created_at', $lastMonth)->count();
        $diffCustomer = $curentMonthCountCustomer - $lastMonthCountCustomer;
        $curentMonthCountContainer = Container::whereMonth('created_at', $curentMonth)->count();
        $lastMonthCountContainer = Container::whereMonth('created_at', $lastMonth)->count();
        $diffContainer = $curentMonthCountContainer - $lastMonthCountContainer;
        $inYard = Container::where('status', 'in_yard')->count();
        $otherContainers = Container::where('status', '!=', 'in_yard')->count();
        $maxStackLevel = 5; // Assuming a maximum stack level of 5
        $locations = Location::withCount([
            'containers as used_stack' => function ($q) {
                $q->where('status', 'in_yard');
            }
        ])->get();
        $totalLocations = $locations->count();
        $totalStackSlots = $totalLocations * $maxStackLevel;
        $availableStackSlots = $locations->sum(function ($location) use ($maxStackLevel) {
            return $location->used_stack < $maxStackLevel ? $maxStackLevel - $location->used_stack : 0;
        });
        $totalCustomers = Customer::count();
        $totalContainers = Container::count();
        $activities = $this->getActivities();
        $toYard = $activities['toYard'];
        $recentTaskCompleted = $activities['recentTaskCompleted'];
        $conditionContainer = $activities['conditionContainer'];
        $recentTaskCancelled = $activities['recentTaskCancelled'];
        $chartData = $activities['chartData'];
        $newCustomer = $activities['newCustomer'];
        $goAway = $activities['goAway'];
        return Inertia::render('admin/dashboard', [
            'totalCustomers' => $totalCustomers,
            'diffCustomer' => $diffCustomer,
            'totalContainers' => $totalContainers,
            'diffContainer' => $diffContainer,
            'inYard' => $inYard,
            'otherContainers' => $otherContainers,
            'totalStackSlots' => $totalStackSlots,
            'availableStackSlots' => $availableStackSlots,
            'toYard' => $toYard,
            'recentTaskCompleted' => $recentTaskCompleted,
            'conditionContainer' => $conditionContainer,
            'recentTaskCancelled' => $recentTaskCancelled,
            'chartData' => $chartData,
            'newCustomer' => $newCustomer,
            'goAway' => $goAway,
        ]);
    }
    private function getActivities()
    {
        $now = Carbon::now();
        $toYard = History::with('container:id,container_number')
            ->where('type', 'unloading')
            ->where('status', 'completed')
            ->latest('updated_at')
            ->take(value: 5)
            ->get(['id', 'container_id', 'updated_at']);

        $recentTaskCompleted = Task::where('status', 'completed')
            ->latest('updated_at')
            ->take(5)
            ->get(['id', 'title', 'updated_at']);

        $recentTaskCancelled = Task::where('status', 'cancelled')
            ->latest('updated_at')
            ->take(5)
            ->get(['id', 'title', 'updated_at']);

        $conditionContainer = History::with('container:id,container_number')
            ->where('condition', '!=', 'good')
            ->latest('updated_at')
            ->take(5)
            ->get(['id', 'container_id', 'condition', 'updated_at']);

        $goAway = History::with('container:id,container_number')
            ->where('type', 'loading')
            ->where('status', 'completed')
            ->latest('updated_at')
            ->take(5)
            ->get(['id', 'container_id', 'updated_at']);
        $newCustomer = Customer::where('status', '!=', 'inactive')
            ->latest('created_at')
            ->take(5)
            ->get(['id', 'name', 'created_at']);

        // Container In (unloading) per week
        $containerIn = Task::selectRaw('WEEK(updated_at, 1) as week, COUNT(*) as total')
            ->where('type', 'unloading')
            ->where('status', 'completed')
            ->whereMonth('updated_at', $now->month)
            ->whereYear('updated_at', $now->year)
            ->groupBy('week')
            ->orderBy('week')
            ->get()
            ->map(function ($row) {
                return [
                    'week' => "Week {$row->week}",
                    'in' => $row->total,
                ];
            });

        // Container Out (loading) per week
        $containerOut = Task::selectRaw('WEEK(updated_at, 1) as week, COUNT(*) as total')
            ->where('type', 'loading')
            ->where('status', 'completed')
            ->whereMonth('updated_at', $now->month)
            ->whereYear('updated_at', $now->year)
            ->groupBy('week')
            ->orderBy('week')
            ->get()
            ->map(function ($row) {
                return [
                    'week' => "Week {$row->week}",
                    'out' => $row->total,
                ];
            });
        $chartData = [];

        foreach ($containerIn as $in) {
            $chartData[$in['week']]['week'] = $in['week'];
            $chartData[$in['week']]['in']   = $in['in'];
            $chartData[$in['week']]['out']  = 0;
        }

        foreach ($containerOut as $out) {
            $chartData[$out['week']]['week'] = $out['week'];
            $chartData[$out['week']]['out']  = $out['out'];
            if (!isset($chartData[$out['week']]['in'])) {
                $chartData[$out['week']]['in'] = 0;
            }
        }
        $chartData = array_values($chartData);
        return [
            'toYard' => $toYard,
            'recentTaskCompleted' => $recentTaskCompleted,
            'conditionContainer' => $conditionContainer,
            'recentTaskCancelled' => $recentTaskCancelled,
            'chartData' => $chartData,
            'newCustomer' => $newCustomer,
            'goAway' => $goAway,
        ];
    }
    public function indexUser()
    {
        $user = Auth::user();
        if ($user->role == 'admin') {
            return redirect()->action([self::class, 'index']);
        }
        $now = Carbon::now();
        $last = $now->copy()->subMonth();
        $activities = $this->getActivities();
        $toYard = $activities['toYard'];
        $recentTaskCompleted = $activities['recentTaskCompleted'];
        $conditionContainer = $activities['conditionContainer'];
        $recentTaskCancelled = $activities['recentTaskCancelled'];
        $chartData = $activities['chartData'];
        $newCustomer = $activities['newCustomer'];
        $goAway = $activities['goAway'];
        $curentMonthCancelled = Task::where('status', 'cancelled')
            ->whereMonth('updated_at', $now->month)
            ->whereYear('updated_at', $now->year)
            ->count();
        $lastMonthCancelled = Task::where('status', 'cancelled')
            ->whereYear('updated_at', $last->year)
            ->whereMonth('updated_at', $last->month)
            ->count();
        $increacedCancelled = $curentMonthCancelled - $lastMonthCancelled;
        $completedTask = Task::where('status', 'completed')
            ->whereHas('workers', function ($q) use ($user) {
                $q->where('user_id', $user->id)
                    ->whereMonth('task_assignments.completed_at', Carbon::now()->month)
                    ->whereYear('task_assignments.completed_at', Carbon::now()->year);
            })
            ->count();
        $totalCompletedTasks = Task::where('status', 'completed')
            ->whereHas('workers', function ($q) {
                $q->whereMonth('task_assignments.completed_at', Carbon::now()->month)
                    ->whereYear('task_assignments.completed_at', Carbon::now()->year);
            })->count();
        $newTasks = Task::where('status', 'pending')->count();
        $totalTasks = Task::count();
        return Inertia::render('dashboard', [
            'completedTask' => $completedTask,
            'newTasks' => $newTasks,
            'totalCompletedTasks' => $totalCompletedTasks,
            'cancelledTasks' => $increacedCancelled,
            'totalTasks' => $totalTasks,
            'toYard' => $toYard,
            'recentTaskCompleted' => $recentTaskCompleted,
            'conditionContainer' => $conditionContainer,
            'recentTaskCancelled' => $recentTaskCancelled,
            'chartData' => $chartData,
            'newCustomer' => $newCustomer,
            'goAway' => $goAway,
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
