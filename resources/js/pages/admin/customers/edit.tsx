import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Customer',
        href: '/admin/customers',
    },
];

type Customer = {
    id: number;
    name: string;
    email: string;
    phone: number;
    address: string;
    status: string;
};

export default function EditCustomer() {
    const { customer } = usePage<{ customer: Customer }>().props;
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { data, setData, put } = useForm({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || '',
        status: customer.status || 'active',
    });

    const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setShowModal(true);
        await wait(1000);
        put(route('customers.update', customer.id), {
            onSuccess: async () => {
                setIsLoading(false);
                await wait(1000);
                setShowModal(false);
                await wait(300);
                router.visit('/admin/customers', { replace: true, preserveScroll: true });
            },
            onError: () => {
                setShowModal(false);
                setIsLoading(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Customer" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-xl font-semibold">Edit Customer</h1>
                    </div>
                    <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-md dark:bg-neutral-800">
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Name
                                </label>
                                <input
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    required
                                    className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="email@example.com"
                                    required
                                    className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Phone
                                </label>
                                <input
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    placeholder="Phone"
                                    className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    name="status"
                                    id="status"
                                    className="mt-1 block h-10 w-full rounded-md border-gray-400 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-100"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Address
                                </label>
                                <textarea
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    name="address"
                                    id="address"
                                    placeholder="Address"
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
                                    'Save Changes'
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
                message={isLoading ? 'Processing...' : 'Customer updated successfully!'}
                onClose={() => setShowModal(false)}
            />
        </AppLayout>
    );
}
