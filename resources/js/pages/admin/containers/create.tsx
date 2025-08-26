import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Container',
        href: 'admin/containers/create',
    },
];
type Location = {
    id: number;
    zone: string;
    rows: string;
    columns: string;
};
type Customer = {
    id: number;
    name: string;
    email: string;
    phone: number;
    address: string;
    status: string;
};

export default function CreateContainer() {
    const { locations } = usePage<{ locations: Location[] }>().props;
    const { customers } = usePage<{ customers: Customer[] }>().props;
    const { errors } = usePage().props as { errors: Record<string, string> };
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { data, setData, post } = useForm({
        container_number: '',
        size: '',
        type: '',
        location_id: '',
        customer_id: '',
        status: 'in_yard',
        stack_level: 1,
    });
    const [localErrors, setLocalErrors] = useState(errors);
    useEffect(() => {
        setLocalErrors(errors);
    }, [errors]);

    const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setShowModal(true);
        await wait(1000); // Delay sebelum kirim request
        post(route('containers.store'), {
            onSuccess: async () => {
                setIsLoading(false);
                await wait(1000); // Delay biar animasi success kelihatan
                setShowModal(false);
                await wait(300); // Delay animasi close
                router.visit('/admin/containers', { replace: true, preserveScroll: true });
            },
            onError: () => {
                setIsLoading(false);
                setShowModal(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Container" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-xl font-semibold">Add New Container</h1>
                    </div>
                    <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-md dark:bg-neutral-800">
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label htmlFor="container_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Container Number
                                </label>
                                <input
                                    value={data.container_number}
                                    onChange={(e) => setData('container_number', e.target.value)}
                                    type="text"
                                    name="container_number"
                                    id="container_number"
                                    placeholder="ex: CT019291"
                                    required
                                    className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                />
                                {localErrors.container_number && <p className="mt-1 text-sm text-red-500">{localErrors.container_number}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="size" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Size
                                </label>
                                <select
                                    value={data.size}
                                    onChange={(e) => setData('size', e.target.value)}
                                    name="size"
                                    id="size"
                                    className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                >
                                    <option value="">Select Size</option>
                                    {['20ft', '40ft', '45ft'].map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Type
                                </label>
                                <select
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    name="type"
                                    id="type"
                                    className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                >
                                    <option value="">Select Type</option>
                                    {['dry', 'refrigerated', 'open_top', 'flat_rack', 'tank'].map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="location_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Location
                                </label>
                                <select
                                    value={data.location_id}
                                    onChange={(e) => setData('location_id', e.target.value)}
                                    name="location_id"
                                    id="location_id"
                                    className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                >
                                    <option value="">Select Location</option>
                                    {locations.map(({ id, zone, rows, columns }) => (
                                        <option key={id} value={id}>
                                            Zone {zone} R{rows}-C{columns}
                                        </option>
                                    ))}
                                </select>
                                {localErrors.stack_level && <p className="mt-1 text-sm text-red-500">{localErrors.stack_level}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Owned Customer
                                </label>
                                <select
                                    value={data.customer_id}
                                    onChange={(e) => setData('customer_id', e.target.value)}
                                    name="customer_id"
                                    id="customer_id"
                                    className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                >
                                    <option value="">Select Customer</option>
                                    {customers.map(({ id, name }) => (
                                        <option key={id} value={id}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                                {localErrors.customer_id && <p className="mt-1 text-sm text-red-500">{localErrors.customer_id}</p>}
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
                                    'Add Container'
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
                message={isLoading ? 'Processing...' : 'Container added successfully!'}
                onClose={() => setShowModal(false)}
            />
        </AppLayout>
    );
}
