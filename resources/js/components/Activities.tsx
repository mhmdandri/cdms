import { usePage } from '@inertiajs/react';
import { Calendar, CheckCircle2, ChevronDown, ChevronUp, Clock, Package, UserPlus } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import formatDate from '../types/formatDate';

export type ActivityItem = {
    id?: number | string;
    type?: 'recent' | 'container' | 'customer' | 'task';
    icon: React.ElementType;
    text: string;
    time: string;
    timestamp?: string;
    status?: 'completed' | 'cancelled' | 'in-progress' | 'new';
};

const ActivitiesRoot = ({
    children,
    data,
    title = 'Activities',
    showFilters = false,
    showAll,
    toggleShowAll,
    hasMore,
    limit,
}: {
    children?: React.ReactNode;
    data?: ActivityItem[];
    title?: string;
    showFilters?: boolean;
    showAll?: boolean;
    toggleShowAll?: () => void;
    hasMore?: number;
    limit?: number;
}) => {
    if (data) {
        return (
            <div className="flex w-full flex-col rounded-2xl border bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                {/* Header */}
                <div className="border-b-2 p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100">{title}</h2>
                        {showFilters && <span className="text-xs text-gray-500 dark:text-neutral-400">Filters enabled</span>}
                    </div>
                </div>

                {/* Activities List */}
                <ul className="max-h-80 flex-1 space-y-1 overflow-y-auto">
                    {data.map((item, idx) => (
                        <Item key={item.id ?? idx} {...item} />
                    ))}
                    {data.length === 0 && <li className="text-center text-gray-500 dark:text-neutral-400">No activities found</li>}
                </ul>

                {/* Show More / Show Less */}
                {hasMore && toggleShowAll && (
                    <button
                        onClick={toggleShowAll}
                        className="flex items-center justify-center py-4 text-sm text-gray-600 transition-colors hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                    >
                        {showAll ? (
                            <>
                                <ChevronUp className="mr-1 h-4 w-4" />
                                Show Less
                            </>
                        ) : (
                            <>
                                <ChevronDown className="mr-1 h-4 w-4" />
                                Show More
                            </>
                        )}
                    </button>
                )}
            </div>
        );
    }

    return <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">{children}</div>;
};

const Chart = () => {
    const { chartData } = usePage<{
        chartData: { week: string; in: number; out: number }[];
    }>().props;

    return (
        <div className="w-full rounded-2xl border bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="border-b-2 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100">Containers Activity</h2>
                    <Calendar className="h-4 w-4 text-gray-500" />
                </div>
            </div>

            <div className="h-full w-full p-4 md:h-80 lg:h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
                        <XAxis dataKey="week" stroke="#6b7280" className="dark:text-neutral-300" />
                        <YAxis stroke="#6b7280" className="dark:text-neutral-300" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                color: '#374151',
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="in"
                            name="Containers In"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ r: 4, fill: '#3b82f6' }}
                            activeDot={{
                                r: 6,
                                stroke: '#3b82f6',
                                strokeWidth: 2,
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="out"
                            name="Containers Out"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ r: 4, fill: '#10b981' }}
                            activeDot={{
                                r: 6,
                                stroke: '#10b981',
                                strokeWidth: 2,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const Item = ({ icon: Icon, text, time, status }: ActivityItem) => {
    const getStatusColor = () => {
        switch (status) {
            case 'completed':
                return 'text-green-500';
            case 'cancelled':
                return 'text-red-500';
            case 'in-progress':
                return 'text-blue-500';
            case 'new':
                return 'text-purple-500';
            default:
                return 'text-gray-600 dark:text-neutral-300';
        }
    };

    return (
        <li className="flex items-start gap-3 rounded-lg p-3 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-neutral-800">
            <span
                className={`flex h-9 w-9 items-center justify-center rounded-full border bg-white dark:bg-neutral-800 ${
                    status ? 'border-transparent' : 'border-gray-200 dark:border-neutral-700'
                }`}
            >
                <Icon className={`h-5 w-5 ${getStatusColor()}`} />
            </span>
            <div className="min-w-0 flex-1">
                <p className="text-sm leading-tight font-medium text-gray-800 dark:text-neutral-200">{text}</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500 dark:text-neutral-400">
                    <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">{time}</span>
                </p>
            </div>
            {status && <span className={`rounded-full px-2 py-1 text-xs capitalize ${getStatusColor()} bg-opacity-10`}>{status}</span>}
        </li>
    );
};

const ListActivities = ({ limit = 4, showFilters = false }: { limit?: number; showFilters?: boolean }) => {
    const { toYard, recentTaskCompleted, conditionContainer, recentTaskCancelled, newCustomer, goAway } = usePage<{
        toYard: any[];
        recentTaskCompleted: any[];
        conditionContainer: any[];
        recentTaskCancelled: any[];
        newCustomer: any[];
        goAway: any[];
    }>().props;

    const [showAll, setShowAll] = useState(false);

    const activityData = useMemo(() => {
        const containerActivities: ActivityItem[] = (toYard || []).map((item: any) => ({
            id: item.id,
            type: 'container',
            icon: Package,
            text: `Container ${item.container?.container_number} moved to yard`,
            time: formatDate(item.updated_at, 'auto'),
            timestamp: item.updated_at,
            status: 'completed',
        }));

        const recentConditionContainer: ActivityItem[] = (conditionContainer || []).map((item: any) => ({
            id: item.id,
            type: 'container',
            icon: Package,
            text: `Container ${item.container?.container_number} marked as ${item.condition}`,
            time: formatDate(item.updated_at, 'auto'),
            timestamp: item.updated_at,
            status: 'completed',
        }));

        const recentActivities: ActivityItem[] = (recentTaskCompleted || []).map((item: any) => ({
            id: item.id,
            type: 'task',
            icon: CheckCircle2,
            text: `Task "${item.title}" completed`,
            time: formatDate(item.updated_at, 'auto'),
            timestamp: item.updated_at,
            status: 'completed',
        }));

        const recentCancelledActivities: ActivityItem[] = (recentTaskCancelled || []).map((item: any) => ({
            id: item.id,
            type: 'task',
            icon: CheckCircle2,
            text: `Task "${item.title}" cancelled`,
            time: formatDate(item.updated_at, 'auto'),
            timestamp: item.updated_at,
            status: 'cancelled',
        }));

        const newCustomerList: ActivityItem[] = (newCustomer || []).map((item: any) => ({
            id: item.id,
            type: 'customer',
            icon: UserPlus,
            text: `Customer ${item.name} registered`,
            time: formatDate(item.created_at, 'auto'),
            timestamp: item.created_at,
            status: 'new',
        }));

        const containerLeave: ActivityItem[] = (goAway || []).map((item: any) => ({
            id: item.id,
            type: 'container',
            icon: Package,
            text: `Container ${item.container?.container_number} just left the yard`,
            time: formatDate(item.updated_at, 'auto'),
            timestamp: item.updated_at,
            status: 'completed',
        }));

        return [
            ...containerActivities,
            ...recentConditionContainer,
            ...recentActivities,
            ...recentCancelledActivities,
            ...newCustomerList,
            ...containerLeave,
        ].sort((a, b) => new Date(b.timestamp ?? '').getTime() - new Date(a.timestamp ?? '').getTime());
    }, [toYard, recentTaskCompleted, conditionContainer, recentTaskCancelled, newCustomer, goAway]);

    const visibleActivities = showAll ? activityData : activityData.slice(0, limit);

    return (
        <ActivitiesRoot
            title="Recent Activities"
            data={visibleActivities}
            showFilters={showFilters}
            showAll={showAll}
            toggleShowAll={() => setShowAll(!showAll)}
            hasMore={activityData.length > limit ? activityData.length : undefined}
            limit={limit}
        />
    );
};

export const Activities = Object.assign(ActivitiesRoot, {
    Chart,
    Item,
    List: ListActivities,
});
