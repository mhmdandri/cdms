import FlashModal from '@/components/FlashModal';
import Modal from '@/components/Modal';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import formatDate from '@/types/formatDate';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Ban, Calendar, CheckCircle, Clock, Loader, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Task List History', href: 'admin/task' }];

type Task = {
    id: number;
    title: string;
    description: string;
    type: string;
    status: string;
    admin: { name: string };
    workersCompleted: string;
    workersStarted: string;
    assigned_at: string | null;
    completed_at?: string | null;
    started_at?: string | null;
    updated_at: string | null;
};

type Pagination<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    meta: { current_page: number; last_page: number; per_page: number; total: number };
};
export default function Task() {
    const { tasks } = usePage<{ tasks: Pagination<Task> }>().props;
    const [showModal, setShowModal] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
    const { data, setData, put } = useForm<{ status: string }>({
        status: 'cancelled',
    });
    const { flash } = usePage().props as {
        flash?: { success?: string; error?: string; info?: string };
    };
    const [showErrorModal, setShowErrorModal] = useState(false);
    useEffect(() => {
        if (flash?.error || flash?.success) {
            setShowErrorModal(true);
            setTimeout(() => {
                setShowErrorModal(false);
            }, 1000);
        }
    }, [flash]);
    const handleDetils = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        setSelectedTaskId(id);
        setShowModal(true);
    };
    const handleCancelTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedTaskId) return;
        setData('status', 'cancelled');
        put(route('admin.task.update', { task: selectedTaskId }), {
            onSuccess: () => {
                setShowModal(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task List History" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-fit flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <div className="mb-4 flex items-center justify-between">
                        <Button asChild>
                            <Link
                                href="/admin/task/create"
                                className="border border-blue-600 bg-blue-600 px-2 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-blue-500 dark:bg-blue-500 dark:hover:bg-transparent dark:hover:text-blue-500"
                            >
                                Request Task
                            </Link>
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 dark:border-neutral-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead className="bg-gray-50 dark:bg-neutral-800">
                                <tr>
                                    {['Title', 'Type', 'Description', 'Status', 'Assigned At', 'Action'].map((head) => (
                                        <th
                                            key={head}
                                            className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                                        >
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                {tasks.data.map(({ id, title, type, description, status, assigned_at }) => (
                                    <tr key={id}>
                                        <td className="max-w-xs px-5 py-4 text-sm font-medium break-words text-gray-900 dark:text-gray-100">
                                            {title}
                                        </td>
                                        <td className="max-w-xs px-5 py-4 text-sm break-words text-gray-500 dark:text-gray-300">{type}</td>
                                        <td className="max-w-xs px-5 py-4 text-sm break-words text-gray-500 dark:text-gray-300">{description}</td>
                                        <td className="max-w-xs px-5 py-4 text-sm break-words text-gray-500 dark:text-gray-300">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                        : status === 'in_progress'
                                                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                          : status === 'cancelled'
                                                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                }`}
                                            >
                                                {status}
                                            </span>
                                        </td>
                                        <td className="max-w-xs px-5 py-4 text-sm break-words text-gray-500 dark:text-gray-300">
                                            {formatDate(assigned_at, 'absolute', false)}
                                        </td>
                                        <td className="px-5 py-4 text-sm font-medium">
                                            <button
                                                onClick={(e) => handleDetils(e, id)}
                                                className="flex cursor-pointer items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Pagination */}
                <Pagination links={tasks.links} />
            </div>
            <FlashModal show={showErrorModal} flash={flash} onClose={() => setShowErrorModal(false)} />
            {/* Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <Modal.Title className="text-lg font-bold text-gray-800 dark:text-white">Task Details</Modal.Title>
                <Modal.Body>
                    {selectedTaskId !== null ? (
                        (() => {
                            const selectedTask = tasks.data.find((t) => t.id === selectedTaskId);

                            return selectedTask ? (
                                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800">
                                    <div className="space-y-3">
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <User className="mr-2 h-4 w-4 text-blue-500" />
                                            <span className="font-medium">
                                                {selectedTask.status === 'completed'
                                                    ? `Done by: ${selectedTask.workersCompleted || '-'}`
                                                    : selectedTask.status === 'in_progress'
                                                      ? `Working by: ${selectedTask.workersStarted || '-'}`
                                                      : selectedTask.status === 'cancelled'
                                                        ? `Cancelled By: ${selectedTask.admin.name || '-'}`
                                                        : `Assigned by: ${selectedTask.admin.name || '-'}`}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <Calendar className="mr-2 h-4 w-4 text-green-500" />
                                            <span className="font-medium">Assigned At:</span>&nbsp;{formatDate(selectedTask.assigned_at)}
                                        </div>
                                        {selectedTask.started_at && (
                                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                                <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                                                <span className="font-medium">Started At:</span>&nbsp;{formatDate(selectedTask.started_at)}
                                            </div>
                                        )}
                                        {selectedTask.completed_at && (
                                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                                <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                                                <span className="font-medium">Completed At:</span>&nbsp;{formatDate(selectedTask.completed_at)}
                                            </div>
                                        )}
                                        {selectedTask.status === 'cancelled' && selectedTask.updated_at && (
                                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                                                <span className="font-medium">Cancelled At:</span>&nbsp;
                                                {formatDate(selectedTask.updated_at)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-5">
                                        <p className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Progress</p>
                                        <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                            <div
                                                className={`h-3 rounded-full transition-all duration-500 ${
                                                    selectedTask.status === 'completed'
                                                        ? 'w-full bg-green-500'
                                                        : selectedTask.status === 'in_progress'
                                                          ? 'w-2/3 bg-yellow-500'
                                                          : selectedTask.status === 'cancelled'
                                                            ? 'w-full bg-red-500'
                                                            : 'w-1/3 bg-blue-500'
                                                }`}
                                            ></div>
                                        </div>
                                        <div className="mt-1 flex items-center justify-between">
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {selectedTask.status === 'completed'
                                                    ? 'Completed'
                                                    : selectedTask.status === 'in_progress'
                                                      ? 'In Progress'
                                                      : selectedTask.status === 'cancelled'
                                                        ? 'Cancelled'
                                                        : 'Assigned'}
                                            </span>
                                            {selectedTask.status === 'in_progress' && <Loader className="h-3 w-3 animate-spin text-yellow-500" />}
                                        </div>
                                    </div>
                                    {selectedTask.status === 'pending' && (
                                        <div className="mt-5 flex items-center justify-end">
                                            <form onSubmit={handleCancelTask}>
                                                <button className="flex cursor-pointer items-center gap-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600">
                                                    <Ban className="h-4 w-4" />
                                                    <span className="text-sm">Cancel Task</span>
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-red-500">Task not found.</p>
                            );
                        })()
                    ) : (
                        <p className="text-gray-500 italic">No task selected.</p>
                    )}
                </Modal.Body>
            </Modal>
        </AppLayout>
    );
}
