import FlashModal from '@/components/FlashModal';
import Modal from '@/components/Modal';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task',
        href: 'user/task',
    },
];

export default function UserTask() {
    const { tasks } = usePage<{
        tasks: {
            data: {
                id: number;
                title: string;
                description: string;
                type: string;
                status: string;
                admin: { name: string };
                assigned_at: string | null;
                started_at: string | null;
            }[];
            links: { url: string | null; label: string; active: boolean }[];
        };
    }>().props;
    const { flash } = usePage().props as {
        flash?: { success?: string; error?: string; info?: string };
    };
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { post } = useForm();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const filteredTasks = tasks.data.filter((task) => task.status !== 'completed' && task.status !== 'cancelled');
    useEffect(() => {
        if (flash?.error || flash?.success) {
            setShowErrorModal(true);
            setTimeout(() => {
                setShowErrorModal(false);
            }, 1000);
        }
    }, [flash]);
    const handleStartTask = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setSelectedId(id);
        setShowModal(true);
    };

    const handleContinueTask = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        router.visit(route('user.task.start', { task: id }), { replace: true });
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        post(route('user.task.start', { task: selectedId }), {
            onSuccess: () => {
                setIsLoading(false);
                setShowModal(false);
                router.visit(route('user.task.start', { task: selectedId }), { replace: true });
            },
            onError: () => {
                setShowModal(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task List" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-fit flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 dark:border-neutral-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead className="bg-gray-50 dark:bg-neutral-800">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                        Title
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                        Type
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                        Description
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                        Requested By
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                        Assigned At
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                {filteredTasks.length > 0 ? (
                                    filteredTasks.map(({ id, title, type, description, status, admin, assigned_at, started_at }) => (
                                        <tr key={id}>
                                            <td className="max-w-xs px-5 py-4 text-sm font-medium break-words whitespace-normal text-gray-900 dark:text-gray-100">
                                                {title}
                                            </td>
                                            <td className="max-w-xs px-5 py-4 text-sm break-words whitespace-normal text-gray-500 dark:text-gray-300">
                                                {type}
                                            </td>
                                            <td className="max-w-xs px-5 py-4 text-sm break-words whitespace-normal text-gray-500 dark:text-gray-300">
                                                {description}
                                            </td>
                                            <td className="max-w-xs px-5 py-4 text-sm break-words whitespace-normal">
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
                                            <td className="max-w-xs px-5 py-4 text-sm text-gray-500 dark:text-gray-300">{admin?.name}</td>
                                            <td className="max-w-xs px-5 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                {assigned_at
                                                    ? new Date(assigned_at).toLocaleDateString('en-GB', {
                                                          day: '2-digit',
                                                          month: 'short',
                                                          year: 'numeric',
                                                      })
                                                    : '-'}
                                            </td>
                                            <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                {status === 'pending' && !started_at && (
                                                    <button
                                                        onClick={(e) => handleStartTask(e, id)}
                                                        className="flex cursor-pointer items-center gap-1 text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-600"
                                                    >
                                                        Start
                                                    </button>
                                                )}
                                                {status === 'in_progress' && started_at && (
                                                    <button
                                                        onClick={(e) => handleContinueTask(e, id)}
                                                        className="flex cursor-pointer items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
                                                    >
                                                        Continue
                                                    </button>
                                                )}
                                                {status === 'completed' && started_at && (
                                                    <span className="flex cursor-default items-center gap-1 text-green-600 dark:text-green-400">
                                                        Completed
                                                    </span>
                                                )}
                                                {status === 'cancelled' && (
                                                    <span className="flex cursor-default items-center gap-1 text-red-600 dark:text-red-400">
                                                        Cancelled
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7}>
                                            <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-500 dark:border-gray-600 dark:text-gray-400">
                                                No tasks available.
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Pagination */}
                <Pagination links={tasks.links} />
            </div>
            <FlashModal show={showErrorModal} flash={flash} onClose={() => setShowErrorModal(false)} />
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <Modal.Title>Konfirmasi</Modal.Title>
                <Modal.Body>Apakah kamu sudah mengerjakan?</Modal.Body>
                <Modal.Footer>
                    <form onSubmit={submit}>
                        <Button variant="destructive" disabled={isLoading}>
                            Sudah
                        </Button>
                    </form>
                    <Button onClick={() => setShowModal(false)}>Belum</Button>
                </Modal.Footer>
            </Modal>
        </AppLayout>
    );
}
