import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Started Task',
        href: 'user/task/start',
    },
];

type Task = {
    id: number;
    title: string;
    description: string;
    type: string;
    status: string;
    admin: { name: string };
    assigned_at: string;
    started_at: string;
    container_id: number;
    customer_id: number;
};
type Container = {
    id: number;
    container_number: string;
    status: string;
    is_used?: boolean;
};
type Customer = {
    id: number;
    name: string;
};
type Location = {
    id: number;
    zone: string;
    rows: string;
    columns: string;
};

export default function requestTask() {
    const [taskType, setTaskType] = useState('');
    const { task } = usePage<{ task: Task }>().props;
    const { containers } = usePage<{ containers: Container[] }>().props;
    const { customers } = usePage<{ customers: Customer[] }>().props;
    const { locations } = usePage<{ locations: Location[] }>().props;
    const { errors } = usePage().props as { errors: Record<string, string> };
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { data, setData, post } = useForm({
        container_number: '',
        customer: '',
        location: '',
        condition: '',
        notes: '',
    });
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setShowModal(true);
        await wait(1000);
        post(route('user.task.doTask', { task: task.id }), {
            onSuccess: () => {
                setIsLoading(false);
                setShowModal(true);
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
                <div className="relative min-h-fit flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-xl font-semibold">Task Requested:</h1>
                    </div>
                    <div className="mb-6">
                        <h2 className="mb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
                            <span className="rounded-md bg-blue-100 px-2 py-1 dark:bg-blue-900/30">
                                {containers.find((c) => c.id === task.container_id)?.container_number ?? task.container_id}
                            </span>
                            <span className="rounded-md bg-gray-100 px-2 py-1 font-mono dark:bg-gray-800">
                                {customers.find((c) => c.id === task.customer_id)?.name ?? task.customer_id}
                            </span>
                        </h2>
                        <div className="mt-6 flex flex-row items-start gap-8">
                            <p className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                                <span className="rounded-md bg-blue-100 px-2 py-1 dark:bg-blue-900/30">Task Status: {task.status}</span>
                                <span className="rounded-md bg-gray-100 px-2 py-1 font-mono dark:bg-gray-800">Task Tipe: {task.type}</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-md dark:bg-neutral-800">
                        <form onSubmit={submit}>
                            {task.type === 'loading' && (
                                <>
                                    <div className="mb-4">
                                        <label htmlFor="container_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Container
                                        </label>
                                        <select
                                            value={data.container_number}
                                            onChange={(e) => setData('container_number', e.target.value)}
                                            name="container_number"
                                            id="container_number"
                                            className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                        >
                                            <option value="">Select Container</option>
                                            {containers
                                                .filter((container) => container.status !== 'on_truck')
                                                .map((container) => (
                                                    <option key={container.id} value={container.id}>
                                                        {container.container_number}
                                                    </option>
                                                ))}
                                        </select>
                                        {errors.container_number && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.container_number}</p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="customer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Customer
                                        </label>
                                        <select
                                            value={data.customer}
                                            onChange={(e) => setData('customer', e.target.value)}
                                            name="customer"
                                            id="customer"
                                            className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                        >
                                            <option value="">Select customer</option>
                                            {customers.map((customer) => (
                                                <option key={customer.id} value={customer.id}>
                                                    {customer.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.customer && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.customer}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Notes
                                        </label>
                                        <textarea
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            name="notes"
                                            id="notes"
                                            placeholder="Notes"
                                            rows={3}
                                            className="mt-1 block h-30 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                        ></textarea>
                                    </div>
                                </>
                            )}
                            {task.type === 'unloading' && (
                                <>
                                    <div className="mb-4">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Container
                                        </label>
                                        <select
                                            value={data.container_number}
                                            onChange={(e) => setData('container_number', e.target.value)}
                                            name="container_number"
                                            id="container_number"
                                            className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                        >
                                            <option value="">Select Container</option>
                                            {containers
                                                .filter((container) => container.status == 'on_truck')
                                                .map((container) => (
                                                    <option key={container.id} value={container.id}>
                                                        {container.container_number}
                                                    </option>
                                                ))}
                                        </select>
                                        {errors.container_number && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.container_number}</p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Location
                                        </label>
                                        <select
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            name="location"
                                            id="location"
                                            className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                        >
                                            <option value="">Available Location</option>
                                            {locations.map((location) => (
                                                <option key={location.id} value={location.id}>
                                                    {location.zone} - R{location.rows} C{location.columns}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.location && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.location}</p>}
                                    </div>
                                    <div className="mb-6">
                                        <fieldset>
                                            <legend id="condition_legend" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Condition <span className="text-red-500">*</span>
                                            </legend>
                                            <div className="flex flex-wrap items-center gap-4" role="radiogroup" aria-labelledby="condition_legend">
                                                {[
                                                    { value: 'good', label: 'Good' },
                                                    { value: 'damaged', label: 'Damaged' },
                                                    { value: 'needs_repair', label: 'Needs Repair' },
                                                ].map((option) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            id={`condition_${option.value}`}
                                                            type="radio"
                                                            name="condition"
                                                            value={option.value}
                                                            checked={data.condition === option.value}
                                                            onChange={(e) => setData('condition', e.target.value)}
                                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 transition focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                                        />
                                                        <label
                                                            htmlFor={`condition_${option.value}`}
                                                            className="ml-2 cursor-pointer text-sm font-medium text-gray-700 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Note
                                        </label>
                                        <textarea
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            name="notes"
                                            id="notes"
                                            placeholder="notes"
                                            rows={3}
                                            className="mt-1 block h-30 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                        ></textarea>
                                    </div>
                                </>
                            )}
                            <div className="justify-left flex items-center gap-4">
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Modal
                show={showModal}
                isLoading={isLoading}
                isSuccess={!isLoading}
                message={isLoading ? 'Processing...' : 'Task submit successfully!'}
                onClose={() => setShowModal(false)}
            />
        </AppLayout>
    );
}
