import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Request Task',
        href: 'admin/task/create',
    },
];

type Container = {
    id: number;
    container_number: string;
    status: string;
    customer_id: number;
};
type Customer = {
    id: number;
    name: string;
};
type Task = {
    status: string;
    container_id: number;
};

export default function requestTask() {
    const { containers, customers, tasks } = usePage<{ containers: Container[]; customers: Customer[]; tasks: Task[] }>().props;
    const { errors } = usePage().props as { errors: Record<string, string> };
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { data, setData, post } = useForm({
        title: '',
        type: '',
        container_id: '',
        customer_id: '',
        description: '',
    });
    const selectedContainer = containers.find((c) => c.id === Number(data.container_id));
    const selectedCustomer = customers.find((c) => c.id === Number(data.customer_id));

    useEffect(() => {
        if (selectedContainer && selectedCustomer) {
            if (data.type === 'loading') {
                setData('title', `Loading Container ${selectedContainer.container_number} ke ${selectedCustomer.name}`);
            } else if (data.type === 'unloading') {
                setData('title', `Unloading Container ${selectedContainer.container_number} dari ${selectedCustomer.name}`);
            }
        }
    }, [selectedContainer, selectedCustomer, data.type, setData]);
    const [localErrors, setLocalErrors] = useState(errors);
    useEffect(() => {
        setLocalErrors(errors);
    }, [errors]);
    const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setShowModal(true);
        await wait(500);
        post(route('admin.task.store'), {
            onSuccess: async () => {
                setIsLoading(false);
                await wait(1000);
                setShowModal(false);
                await wait(300);
                router.visit('/admin/task', { replace: true, preserveScroll: true });
            },
            onError: () => {
                setIsLoading(false);
                setShowModal(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Request Task" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-xl font-semibold">Request New Task</h1>
                    </div>
                    <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-md dark:bg-neutral-800">
                        <form onSubmit={submit}>
                            {/* Select Type */}
                            <div className="mb-4">
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Select Type
                                </label>
                                <select
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    name="type"
                                    id="type"
                                    className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                >
                                    <option value="">Select type</option>
                                    {['loading', 'unloading'].map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Dynamic Fields */}
                            {data.type === 'loading' && (
                                <>
                                    {/* Container */}
                                    <div className="mb-4">
                                        <label htmlFor="container_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Container
                                        </label>
                                        <select
                                            value={data.container_id}
                                            onChange={(e) => setData('container_id', e.target.value)}
                                            name="container_id"
                                            id="container_id"
                                            className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                        >
                                            <option value="">Select Container</option>
                                            {containers
                                                .filter((container) => {
                                                    // Filter status harus in_yard
                                                    if (container.status !== 'in_yard') return false;

                                                    // Cek apakah ada task dengan status pending atau in_progress untuk container ini
                                                    const hasActiveTask = tasks.some(
                                                        (task) =>
                                                            task.container_id === container.id && ['pending', 'in_progress'].includes(task.status),
                                                    );

                                                    // Hanya tampilkan container yang tidak punya active task
                                                    return !hasActiveTask;
                                                })
                                                .map((container) => (
                                                    <option key={container.id} value={container.id}>
                                                        {container.container_number}
                                                    </option>
                                                ))}
                                        </select>
                                        {localErrors.container_id && <p className="mt-1 text-sm text-red-500">{localErrors.container_id}</p>}
                                    </div>

                                    {/* Customer */}
                                    <div className="mb-4">
                                        <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            To Customer
                                        </label>
                                        <select
                                            value={data.customer_id}
                                            onChange={(e) => setData('customer_id', e.target.value)}
                                            name="customer_id"
                                            id="customer_id"
                                            className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                        >
                                            <option value="">Select Customer</option>
                                            {customers
                                                .filter((customer) => {
                                                    const selectedContainer = containers.find(
                                                        (container) => container.id === Number(data.container_id),
                                                    );
                                                    return selectedContainer && customer.id === selectedContainer.customer_id;
                                                })
                                                .map((customer) => (
                                                    <option key={customer.id} value={customer.id}>
                                                        {customer.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </>
                            )}

                            {data.type === 'unloading' && (
                                <>
                                    {/* Customer */}
                                    <div className="mb-4">
                                        <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            From Customer
                                        </label>
                                        <select
                                            value={data.customer_id}
                                            onChange={(e) => setData('customer_id', e.target.value)}
                                            name="customer_id"
                                            id="customer_id"
                                            className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                        >
                                            <option value="">Select Customer</option>
                                            {customers.map((customer) => (
                                                <option key={customer.id} value={customer.id}>
                                                    {customer.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Container */}
                                    <div className="mb-4">
                                        <label htmlFor="container_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Container
                                        </label>
                                        <select
                                            value={data.container_id}
                                            onChange={(e) => setData('container_id', e.target.value)}
                                            name="container_id"
                                            id="container_id"
                                            className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                        >
                                            <option value="">Select Container</option>
                                            {containers
                                                .filter((container) => {
                                                    // Status harus on_truck
                                                    if (container.status !== 'on_truck') return false;

                                                    // Harus milik customer yang dipilih
                                                    if (container.customer_id !== Number(data.customer_id)) return false;

                                                    // Cek apakah ada task aktif untuk container ini
                                                    const hasActiveTask = tasks.some(
                                                        (task) =>
                                                            task.container_id === container.id && ['pending', 'in_progress'].includes(task.status),
                                                    );

                                                    // Hanya tampilkan container yang tidak punya active task
                                                    return !hasActiveTask;
                                                })
                                                .map((container) => (
                                                    <option key={container.id} value={container.id}>
                                                        {container.container_number}
                                                    </option>
                                                ))}
                                        </select>
                                        {localErrors.container_id && <p className="mt-1 text-sm text-red-500">{localErrors.container_id}</p>}
                                    </div>
                                </>
                            )}

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    name="description"
                                    id="description"
                                    placeholder="description"
                                    rows={3}
                                    className="mt-1 block h-30 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                ></textarea>
                            </div>
                            <Button
                                disabled={isLoading}
                                type="submit"
                                className="border border-blue-600 bg-primary px-2 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-blue-500 dark:bg-blue-500 dark:hover:bg-transparent dark:hover:text-blue-500"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Saving...
                                    </span>
                                ) : (
                                    'Submit Task'
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <Modal
                show={showModal}
                isLoading={isLoading}
                isSuccess={!isLoading}
                message={isLoading ? 'Proccessing' : 'Task Add Successfully!'}
                onClose={() => setShowModal(false)}
            />
        </AppLayout>
    );
}
